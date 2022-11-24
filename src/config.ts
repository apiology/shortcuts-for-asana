export default abstract class Config {
  // abstract fetchSomeConfigItem(): Promise<string>;

  validate = async (): Promise<void> => {
    // await this.fetchSomeConfigItem();
  }
}
