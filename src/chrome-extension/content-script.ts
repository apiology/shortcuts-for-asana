import { platform, setPlatform } from '../platform.js';
import { ChromeExtensionPlatform } from './chrome-extension-platform.js';
import { shortcutsKeyDownBeforeOthers } from '../shortcuts-for-asana.js';

export function registerEventListeners() {
  const logger = platform().logger();

  // capture: true gives us priority in handling events - Asana's JS
  // will eat the event and disable any further handling otherwise.
  document.addEventListener('keydown', shortcutsKeyDownBeforeOthers, { capture: true });
  logger.debug('Registered keydown listener', shortcutsKeyDownBeforeOthers);
}

/* istanbul ignore next */
if (typeof jest === 'undefined') {
  const p = new ChromeExtensionPlatform();
  setPlatform(p);
  registerEventListeners();
}
