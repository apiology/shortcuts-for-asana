const dependencyLinks = () => {
  const links = [];
  const bodyNodesClassName = 'CompleteTaskWithIncompletePrecedentTasksConfirmationModal-bodyNode';

  const bodyNodes = Array.from(document.getElementsByClassName(bodyNodesClassName));
  for (const bodyNode of bodyNodes) {
    const linkClassName = 'CompleteTaskWithIncompletePrecedentTasksConfirmationModal-primaryNavigationLink';
    links.push(...Array.from(bodyNode.getElementsByClassName(linkClassName)));
  }
  return links;
};

// if no dependency dialog, let's pick out links in task descriptions...
//
// .PrimaryNavigationLink is a link to another entity in Asana
// .ProsemirrorEditor-link is a link to an outside site
const bodyLinks = () => Array.from(document.querySelectorAll('.PrimaryNavigationLink,.ProsemirrorEditor-link'));

console.log('Defining shortcutsKeyDownBeforeOthers');
function shortcutsKeyDownBeforeOthers(e) {
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
        window.open(url, '_blank');
      }
    }
  } else if (e.metaKey && e.key === 'Enter') {
    console.log('got meta enter (before others)');
    const markCompleteSelector = 'div.CompleteTaskWithIncompletePrecedentTasksConfirmationModal div.PrimaryButton';
    const element = document.querySelector(markCompleteSelector);
    if (element != null) {
      element.click();
    }
  }
}

console.log('Defining shortcutsKeyDownAfterOthers');
function shortcutsKeyDownAfterOthers(e) {
  if (e.metaKey && e.key === 'Enter') {
    console.log('got meta enter (after others)');
    const firstTextArea = document.querySelector('textarea.SpreadsheetTaskName-input');
    console.log('first text area', firstTextArea);
    const element = document.querySelector('div.CompleteTaskWithIncompletePrecedentTasksConfirmationModal');
    if (element == null) {
      // don't switch task if the cmd-enter key created a modal
      firstTextArea.click();
    }
  }
}

// capture: true ensures that we can differentiate between the
// cmd-enter key event when the dependent dialog is initially brought
// up, and when it was already up and the user wants to confirm to
// close the task.
document.addEventListener('keydown', shortcutsKeyDownBeforeOthers, { capture: true });
console.log('Registered keydown listener', shortcutsKeyDownBeforeOthers);

document.addEventListener('keydown', shortcutsKeyDownAfterOthers, { capture: false });
console.log('Registered keydown listener', shortcutsKeyDownAfterOthers);
