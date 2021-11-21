import { logError } from './error';

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
        logError('Element is not an HTMLElement!');
      }
    }
  }
  return links;
};

// if no dependency dialog, let's pick out links in task descriptions...
//
// .PrimaryNavigationLink is a link to another entity in Asana
// .ProsemirrorEditor-link is a link to an outside site
const bodyLinks = () => Array.from(document.querySelectorAll('.PrimaryNavigationLink,.ProsemirrorEditor-link'));

console.log('Defining shortcutsKeyDownBeforeOthers');
const shortcutsKeyDownBeforeOthers = (e: KeyboardEvent) => {
  // this would test for whichever key is 40 (down arrow) and the ctrl key at the same time
  const nonZeroDigits = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  if (e.metaKey && e.ctrlKey && nonZeroDigits.includes(e.key)) {
    const num = parseInt(e.key, 10);
    const dependencies = dependencyLinks();
    if (dependencies.length > 0) {
      const linkFound = dependencies[num - 1];
      console.log('linkFound', linkFound);
      if (linkFound != null) {
        linkFound.click();
      }
    } else {
      const links = bodyLinks();
      const linkFound = links[num - 1];
      console.log('linkFound', linkFound);
      if (linkFound != null) {
        const url = linkFound.getAttribute('href');
        if (url != null) {
          window.open(url, '_blank');
        }
      }
    }
  } else if (e.metaKey && e.ctrlKey && e.key === 'r') {
    const element = document.querySelector('div.RemoveButton');
    if (element != null && element instanceof HTMLElement) {
      element.click();
    }
  } else if (e.metaKey && e.key === 'Enter') {
    console.log('got meta enter (before others)');
    const markCompleteSelector = 'div.CompleteTaskWithIncompletePrecedentTasksConfirmationModal div.PrimaryButton';
    const element = document.querySelector(markCompleteSelector);
    if (element != null && element instanceof HTMLElement) {
      element.click();
    }
  }
};

console.log('Defining shortcutsKeyDownAfterOthers');
const shortcutsKeyDownAfterOthers = (e: KeyboardEvent) => {
  if (e.metaKey && e.key === 'Enter') {
    console.log('got meta enter (after others)');
    const firstTextArea = document.querySelector('textarea.SpreadsheetTaskName-input');
    if (firstTextArea == null || !(firstTextArea instanceof HTMLElement)) {
      logError('Invalid text area');
    }
    console.log('first text area', firstTextArea);
    const element = document.querySelector('div.CompleteTaskWithIncompletePrecedentTasksConfirmationModal');
    if (element == null) {
      // don't switch task if the cmd-enter key created a modal
      const classes = document.activeElement?.parentElement?.classList;
      if (classes == null) {
        logError('Could not find element');
      }
      const isOnSubtask = classes.contains('SubtaskTaskRow-taskName');
      console.log({ isOnSubtask });
      if (!isOnSubtask) {
        // don't switch task if a subtask was marked done
        firstTextArea.click();
      }
    }
  }
};

// capture: true ensures that we can differentiate between the
// cmd-enter key event when the dependent dialog is initially brought
// up, and when it was already up and the user wants to confirm to
// close the task.
document.addEventListener('keydown', shortcutsKeyDownBeforeOthers, { capture: true });
console.log('Registered keydown listener', shortcutsKeyDownBeforeOthers);

document.addEventListener('keydown', shortcutsKeyDownAfterOthers, { capture: false });
console.log('Registered keydown listener', shortcutsKeyDownAfterOthers);
