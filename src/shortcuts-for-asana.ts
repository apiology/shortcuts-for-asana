/**
 * content-script.ts module.
 *
 * Chrome extension which adds missing keyboard shortcuts/behavior to Asana
 */

import ChromeExtensionPlatform from './chrome-extension/chrome-extension-platform.js';

const platform = new ChromeExtensionPlatform();
const logger = platform.logger();

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
  const element = findElement(selector);
  if (element != null) {
    logger.log('Clicking on', element);
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
// .ProsemirrorEditor .PrimaryNavigationLink is a link to another
// entity in Asana inside the text editor window
// .ProsemirrorEditor-link is a link to an outside site
const bodyLinks = () => Array.from(document.querySelectorAll('.ProsemirrorEditor .PrimaryNavigationLink, .ProsemirrorEditor-link'));

const focusOnFirstTask = () => {
  logger.debug('trying to focus on first task');
  const firstTextArea = findElement('textarea.SpreadsheetTaskName-input');
  if (firstTextArea == null) {
    throw new Error('Invalid text area');
  }
  logger.debug('first text area', firstTextArea);

  logger.log('Switching to first task');
  // don't switch task if a subtask was marked done
  firstTextArea.click();
};

const removeAssignee = () => {
  const element = findElement('div.TaskPaneAssigneeToken-removeButton');
  if (element != null) {
    logger.log('Removing assignee');
    element.click();
    focusOnFirstTask();
  }
};

const afterTaskMarkedComplete = () => {
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

const markTaskWithIncompleteDependentsDialogComplete = (e: KeyboardEvent): boolean => {
  const markCompleteSelector = 'div.CompleteTaskWithIncompletePrecedentTasksConfirmationModal div.PrimaryButton';
  logger.debug('trying to click on confirmation modal');
  if (clickOnElement(markCompleteSelector)) {
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

const markTaskComplete = (e: KeyboardEvent) => {
  logger.debug('got meta enter (before others)');
  if (!markTaskWithIncompleteDependentsDialogComplete(e)) {
    // this must be a task without dependents.  Asana will handle the
    // cmd-enter event properly, but we want to be sure to flip back
    // to the first task once it's done.
    logger.debug('enqueuing request to move to first task');

    // if we don't wait until it's marked the task done by processing
    // the event, we'll flip over to the wrong task.  So enqueue this
    // to be done after all current event processing.

    // https://stackoverflow.com/questions/7760428/how-to-run-code-after-all-other-events-have-been-handled
    window.setTimeout(afterTaskMarkedComplete, 0);
  }
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
    const links = bodyLinks();
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

const clickRefineSearchButton = () => {
  clickOnElement('.SearchGridPageToolbar-advancedSearchButton');
};

const selectTaskTime = () => {
  clickOnElement('.TaskDueDateToken > div');
  const clockIcon = document.querySelector('.ClockIcon');
  clockIcon?.parentElement?.click();
  logger.log('Attempting to set focus on due time');
  findElement('#due_time_view_select')?.focus();
};

const shortcutsKeyDownBeforeOthers = (e: KeyboardEvent) => {
  // this would test for whichever key is 40 (down arrow) and the ctrl key at the same time
  const nonZeroDigits = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  if (e.metaKey && e.ctrlKey && nonZeroDigits.includes(e.key)) {
    const num = parseInt(e.key, 10);
    openLink(num);
  } else if (e.metaKey && e.ctrlKey && e.key === 'r') {
    removeAssignee();
  } else if (e.metaKey && e.key === 'Enter') {
    markTaskComplete(e);
  } else if (e.ctrlKey && e.key === 'r') {
    clickRefineSearchButton();
  } else if (e.ctrlKey && e.key === 't') {
    selectTaskTime();
  }
};

export const initializeContentScript = () => {
  // capture: true ensures that we can differentiate between the
  // cmd-enter key event when the dependent dialog is initially brought
  // up, and when it was already up and the user wants to confirm to
  // close the task.
  document.addEventListener('keydown', shortcutsKeyDownBeforeOthers, { capture: true });
  logger.log('Registered keydown listener', shortcutsKeyDownBeforeOthers);
};
