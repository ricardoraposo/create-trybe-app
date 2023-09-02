import { input, confirm } from '@inquirer/prompts';

export async function promptProjectName (): Promise<string> {
  const projectName = await input({
    message: 'Enter your project name >',
    default: 'trybe-project'
  });
  return projectName;
}

export async function promptRouter (): Promise<boolean> {
  const userInput = await confirm({ message: 'Gostaria de adicionar o react-router ?' });
  return userInput;
}
