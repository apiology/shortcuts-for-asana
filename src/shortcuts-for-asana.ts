/**
 * content-script.ts module.
 *
 * Chrome extension which adds missing keyboard shortcuts/behavior to Asana
 */
import { ChromeExtensionPlatform } from './chrome-extension/chrome-extension-platform.js';
import { htmlElementByClass } from './chrome-extension/dom-utils.js';
import { platform } from './platform.js';

const p = new ChromeExtensionPlatform();
const logger = p.logger();

const findElement = (selector: string): HTMLElement | null => {
  const element = document.querySelector(selector);
  if (element != null) {
    if (!(element instanceof HTMLElement)) {
      throw Error(`Unexpected element type: ${element}`);
    }
    return element;
  }
  return null;
};

const clickOnElement = (selector: string): boolean => {
  const l = platform().logger();

  const element = findElement(selector);
  if (element != null) {
    l.debug('Clicking on', element);
    element.click();
    return true;
  }
  return false;
};

const dependencyLinks = (): HTMLElement[] => {
  const links: HTMLElement[] = [];
  const bodyNodesClassName = 'CompleteTaskWithIncompletePrecedentTasksConfirmationModal-bodyNode';

  const bodyNodes = Array.from(document.getElementsByClassName(bodyNodesClassName));
  for (const bodyNode of bodyNodes) {
    const linkClassName = 'CompleteTaskWithIncompletePrecedentTasksConfirmationModal-primaryNavigationLink';
    for (const element of Array.from(bodyNode.getElementsByClassName(linkClassName))) {
      if (element instanceof HTMLElement) {
        links.push(element);
      } else {
        throw new Error('Element is not an HTMLElement!');
      }
    }
  }
  return links;
};

// if no dependency dialog, let's pick out links in task descriptions...
//
// .ProsemirrorEditor .BaseLink is either a link to another entity in
// Asana or a link associated with an Asana-integrated application
// (e.g., GitHub) inside the text editor window
// .ProsemirrorEditor-link is a link to an outside site and does not
// include the BaseLink class as of 2023-02
// Examples:
// <a href="https://www.cnn.com/" class="ProsemirrorEditor-link">https://www.cnn.com/</a>
// <a class="PrimaryNavigationLink BaseLink" href="https://app.asana.com/0/123/456/f">Remove assignee no longer works in shortcuts</a>
// <a target="_blank" rel="noreferrer noopener" class="PrimaryLink AppLinkToken-link BaseLink" href="https://github.com/apiology/shortcuts-for-asana/pull/71">https://github.com/apiology/shortcuts-for-asana/pull/71</a>
const bodyLinks = () => Array.from(document.querySelectorAll('.ProsemirrorEditor .BaseLink, .ProsemirrorEditor-link'));

const customFieldLinks = () => Array.from(document.querySelectorAll('.CustomPropertyExternalLink-linkIcon'));

const focusOnFirstTask = () => {
  logger.debug('trying to focus on first task');
  const firstTextArea = findElement('textarea.SpreadsheetTaskName-input');
  if (firstTextArea == null) {
    logger.debug('must not be on task list page');
    return;
  }
  logger.debug('first text area', firstTextArea);

  logger.log('Switching to first task');
  // don't switch task if a subtask was marked done
  firstTextArea.click();
};

const removeAssigneeOrCurrentProject = () => {
  const element = findElement('.TaskPaneAssigneeToken-removeButton');
  if (element != null) {
    logger.log('Removing assignee');
    element.click();
    focusOnFirstTask();
  }
  const currentProjectGid = window.location.href.split('/')[4];
  const selector = `#task_pane_projects_input${currentProjectGid} + div + div :first-child`;

  const removeButton = document.querySelector(selector);
  if (removeButton != null && removeButton instanceof HTMLElement) {
    removeButton.click();
    focusOnFirstTask();
  }
};

const focusOnFirstTaskIfNotSubtask = () => {
  const classes = document.activeElement?.parentElement?.classList;
  if (classes == null) {
    throw new Error('Could not find element');
  }
  const isOnSubtask = classes.contains('SubtaskTaskRow-taskName');
  logger.debug({ isOnSubtask });
  if (!isOnSubtask) {
    focusOnFirstTask();
  }
};

export const markDependentTaskCompleteSelector = 'div.CompleteTaskWithIncompletePrecedentTasksConfirmationModal div.PrimaryButton';

export const markTaskWithIncompleteDependentsDialogComplete = (e: KeyboardEvent): boolean => {
  logger.debug('trying to click on confirmation modal');
  if (clickOnElement(markDependentTaskCompleteSelector)) {
    focusOnFirstTask();
    // if the element was there and we clicked on it, don't let
    // cmd-enter propagate.  We don't want the underlying task UI
    // 'complete' button to receive it and then reopen the task...
    logger.debug('stopping propagation');
    e.stopPropagation();
    return true;
  }

  // must not be an incomplete dependents dialog
  return false;
};

const moveToFirstTaskAfterTaskMarkedComplete = (e: KeyboardEvent) => {
  logger.debug('got meta enter (before others)');
  if (findElement(markDependentTaskCompleteSelector) != null) {
    // this situation is handled by a different event listener
    logger.debug('stopping propagation');
    e.stopPropagation();
    return;
  }

  // this must be a task without dependents.  Asana will handle the
  // cmd-enter event properly, but we want to be sure to flip back
  // to the first task once it's done.
  focusOnFirstTaskIfNotSubtask();
};

const openLink = (num: number) => {
  const dependencies = dependencyLinks();
  if (dependencies.length > 0) {
    const linkFound = dependencies[num - 1];
    logger.debug('linkFound', linkFound);
    if (linkFound != null) {
      linkFound.click();
    }
  } else {
    const cfLinks = customFieldLinks();
    const bLinks = bodyLinks();
    const links = cfLinks.concat(bLinks);
    const linkFound = links[num - 1];
    logger.debug('linkFound', linkFound);
    if (linkFound != null) {
      const url = linkFound.getAttribute('href');
      if (url != null) {
        window.open(url, '_blank');
      }
    }
  }
};

const dismissSearchTaskPane = () => {
  const targetElement = document.querySelector('.FullWidthPageStructureWithDetailsOverlay-detailsOverlay');

  const escapeEvent = new KeyboardEvent('keydown', {
    key: 'Escape',
    code: 'Escape',
    keyCode: 27,
    which: 27,
    bubbles: true,
    cancelable: true,
  });

  targetElement?.dispatchEvent(escapeEvent);
};

const clickRefineSearchButton = () => {
  dismissSearchTaskPane();

  clickOnElement('.SearchGridPageToolbar-advancedSearchFiltersAppliedButton');
};

const dismissTaskTime = () => {
  const dueDate = htmlElementByClass('DueDateTokenButton-label', HTMLSpanElement);
  if (dueDate.textContent === 'No due date') {
    return;
  }
  const dismissTaskTimeButton = document.querySelector('.TaskPaneFields-dueDateContainer .TaskDueDateToken-removeButton');
  if ((dismissTaskTimeButton == null) || !(dismissTaskTimeButton instanceof HTMLElement)) {
    return;
  }
  dismissTaskTimeButton.click();
};

const selectTaskTime = () => {
  clickOnElement('.TaskDueDateToken > div');
  const clockIcon = document.querySelector('.ClockIcon');
  clockIcon?.parentElement?.click();

  logger.log('Attempting to set focus on due time');
  findElement('#due_time_view_select')?.focus();
};

export const shortcutsKeyDownBeforeOthers = (e: KeyboardEvent) => {
  // this would test for whichever key is 40 (down arrow) and the ctrl key at the same time
  const nonZeroDigits = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  if (e.metaKey && e.ctrlKey && nonZeroDigits.includes(e.key)) {
    const num = parseInt(e.key, 10);
    openLink(num);
  } else if (e.metaKey && e.ctrlKey && e.key === 'r') {
    removeAssigneeOrCurrentProject();
  } else if (e.metaKey && e.key === 'Enter') {
    markTaskWithIncompleteDependentsDialogComplete(e);
    requestIdleCallback(() => {
      // wait for Asana to render the dependent task dialog if it's going to

      // also, if we don't wait until it's marked the task done by processing
      // the event, we'll flip over to the wrong task.  So enqueue this
      // to be done after all current event processing.

      // https://stackoverflow.com/questions/7760428/how-to-run-code-after-all-other-events-have-been-handled

      moveToFirstTaskAfterTaskMarkedComplete(e);
    });
  } else if (e.ctrlKey && e.key === 'r') {
    clickRefineSearchButton();
  } else if (e.ctrlKey && e.key === 't') {
    dismissTaskTime();
    selectTaskTime();
    e.preventDefault(); // don't transpose text
  }
};

export const keyDownOnConfirmationModal = (e: KeyboardEvent) => {
  console.debug('specialized handler just got this event', e);
  if (e.metaKey && e.key === 'Enter') {
    markTaskWithIncompleteDependentsDialogComplete(e);
  }
};
