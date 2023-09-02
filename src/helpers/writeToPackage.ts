import fs from 'fs/promises';

export async function addPackages (pathToPkg: string, addRouter: boolean): Promise<void> {
  if (addRouter) {
    const data = await fs.readFile(pathToPkg, 'utf-8');
    let formatted = data.replace(/^.*devDependencies.*$/m, '\t"devDependencies": {\n\t\t"@types/react-router-dom": "*",');
    formatted = data.replace(/^.*dependencies.*$/m, '\t"dependencies": {\n\t\t"react-router-dom": "*",');
    await fs.writeFile(pathToPkg, formatted);
  }
  const data = await fs.readFile(pathToPkg, 'utf-8');
  const formatted = data.replace(/^.*devDependencies.*$/m, '\t"devDependencies": {\n\t\t"@trybe/eslint-config-frontend": "*",');
  await fs.writeFile(pathToPkg, formatted);
};
