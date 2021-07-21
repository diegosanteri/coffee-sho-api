import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

export class ConfigService {
  private readonly envConfig: { [key: string]: any };

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(path.join(__dirname + "/../..", filePath)));
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  getNumber(key: string): number {
    return this.envConfig[key];
  }
}
