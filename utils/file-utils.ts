import fs from 'fs';
import path from 'path';

export const readdirSyncRecursive = (directory: string): string[] =>
  fs
    .readdirSync(directory, { withFileTypes: true })
    .map(file => {
      const filePath = path.resolve(directory, file.name);
      return file.isDirectory() ? readdirSyncRecursive(filePath) : filePath;
    })
    .flat();
