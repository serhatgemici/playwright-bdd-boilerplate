export async function readAriaSnapshot(fileName: string,): Promise<string> {
  const { readFile } = await import('node:fs/promises');
  const path = (await import('node:path')).default;
  const filePath = path.resolve(process.cwd(), 'e2e/Data/aria', fileName);
  return await readFile(filePath, 'utf8');
}