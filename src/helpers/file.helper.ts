import { unlinkSync, existsSync } from 'fs';
import { Stream } from 'stream';

export interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

export function getFileNameFromUrl(url: string): string {
  return url.split('/').reverse()[0];
}

export async function getFileName(file: Upload | string) {
  if (typeof file === 'string') return file;

  const { filename } = await file;
  return filename;
}

export function deleteFile(file: string, saveTo?: string): void {
  let filePath = file;
  if (saveTo) filePath = `${process.cwd()}/public/${saveTo}/${this.getFileNameFromUrl(file)}`;
  if (existsSync(filePath)) unlinkSync(filePath);
}
