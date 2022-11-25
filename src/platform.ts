import Logger from './logger.js';
import Formatter from './formatter.js';

interface IPlatform {
  logger(): Logger;

  formatter(): Formatter;
}

let thePlatform: IPlatform | null = null;

export const platform = (): IPlatform => {
  if (thePlatform == null) {
    throw Error('Please call setPlatform() before use');
  }
  return thePlatform;
};

export const setPlatform = (newPlatform: IPlatform) => {
  thePlatform = newPlatform;
};
