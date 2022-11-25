import ChromeExtensionLogger from './chrome-extension-logger.js';
import ChromeExtensionFormatter from './chrome-extension-formatter.js';

export default class ChromeExtensionPlatform {
  logger = () => new ChromeExtensionLogger();

  formatter = () => new ChromeExtensionFormatter();
}
