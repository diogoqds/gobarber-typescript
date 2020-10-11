import IStorageProvider from '../models/IStorageProvider';

export default class FakeStorageProvider implements IStorageProvider {
  private files: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.files.push(file);
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const index = this.files.findIndex(fileName => fileName === file);

    if (index >= 0) {
      this.files.splice(index, 1);
    }
  }
}
