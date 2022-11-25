import { setPlatform } from '../platform.js';
import ChromeExtensionPlatform from './chrome-extension-platform.js';
import { initializeContentScript } from '../shortcuts-for-asana.js';

setPlatform(new ChromeExtensionPlatform());

initializeContentScript();
