import { readdir } from "fs/promises";
import { IFileService } from ".";

export class FileService implements IFileService {
  async readDir(path: string): Promise<string[]> {
    return readdir(path);
  }
  async readJson(path: string): Promise<any> {
    const raw = await Bun.file(path).text()
    return JSON.parse(raw).expression
  }
}