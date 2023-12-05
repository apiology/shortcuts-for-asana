export class ChromeExtensionLogger {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  log(message?: any, ...optionalParams: any[]): void {
    console.log('Shortcuts for Asana', message, ...optionalParams);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debug(message?: any, ...optionalParams: any[]): void {
    console.debug('Shortcuts for Asana', message, ...optionalParams);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  warn(message?: any, ...optionalParams: any[]): void {
    console.warn('Shortcuts for Asana', message, ...optionalParams);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(message?: any, ...optionalParams: any[]): void {
    console.error('Shortcuts for Asana', message, ...optionalParams);
  }
}
