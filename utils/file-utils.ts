import fs from 'fs';
import path from 'path';

export const readdirSyncRecursive = (directory: string): string[] => {
  const directoryFiles = fs.readdirSync(directory, { withFileTypes: true });
  return directoryFiles
    .map(file => {
      const filePath = path.resolve(directory, file.name);
      return file.isDirectory() ? readdirSyncRecursive(filePath) : filePath;
    })
    .flat();
};
