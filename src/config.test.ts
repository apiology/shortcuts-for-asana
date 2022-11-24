import Config from './config.js';

class ConfigSpy extends Config {
}

test('Config#validate', async () => {
  const config = new ConfigSpy();
  await config.validate();
});
