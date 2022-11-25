import { platform, setPlatform } from '../platform.js';
import { ChromeExtensionPlatform } from './chrome-extension-platform.js';
import { shortcutsKeyDownBeforeOthers } from '../shortcuts-for-asana.js';

export function registerEventListeners() {
  const logger = platform().logger();
  // capture: true ensures that we can differentiate between the
  // cmd-enter key event when the dependent dialog is initially brought
  // up, and when it was already up and the user wants to confirm to
  // close the task.
  document.addEventListener('keydown', shortcutsKeyDownBeforeOthers, { capture: true });
  logger.debug('Registered keydown listener', shortcutsKeyDownBeforeOthers);
}

/* istanbul ignore next */
if (typeof jest === 'undefined') {
  const p = new ChromeExtensionPlatform();
  setPlatform(p);
  registerEventListeners();
}
