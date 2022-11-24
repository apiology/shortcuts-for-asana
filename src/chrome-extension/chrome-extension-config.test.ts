import ChromeExtensionConfig from './chrome-extension-config.js';

test('create class', () => {
  expect(new ChromeExtensionConfig()).not.toBeNull();
});
