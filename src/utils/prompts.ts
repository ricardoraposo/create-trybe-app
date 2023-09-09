import { input, confirm, select, checkbox } from '@inquirer/prompts';
import { logger } from './logger.js';
import { addGit } from '../helpers/fsFunctions.js';
import { checkboxValues } from '../consts.js';

export async function promptProjectName(): Promise<string> {
  const projectName = await input({
    message: 'Enter your project name >',
    default: 'trybe-app'
  });

  if (projectName.trim().length === 0) return 'trybe-app';
  return projectName;
}

export async function promptRouter(): Promise<boolean> {
  const userInput = await confirm({ message: 'Gostaria de adicionar o react-router ?' });
  if (userInput) {
    logger.info('Muito bem, adicionando react-router!');
  } else {
    logger.info('Ok, quem sabe na próxima...');
  }
  return userInput;
}

export async function promptLanguage(): Promise<void> {
  const userInput = await select({
    message: 'Qual linguagem gostaria de usar ?',
    choices: [
      { name: 'Typescript', value: 'ts' },
      { name: 'Javascript', value: 'js' }
    ]
  });
  if (userInput === 'ts') {
    logger.info('Bela escolha, usaremos Typescript!!!');
  } else {
    logger.info('Escolha errada, vamos utilizar Typescript...');
  }
}

export async function promptGit(projectName: string): Promise<void> {
  const userInput = await confirm({ message: 'Gostaria de iniciar um repositório git ?' });
  if (userInput) {
    addGit(projectName);
    logger.success('Git iniciado!');
  } else {
    logger.info('Tudo bem, você pode iniciar mais tarde.');
  }
};

export async function promptNpmInstall(): Promise<boolean> {
  const userInput = await confirm({ message: 'Gostaria de instalar as dependências (npm install) ?' });
  if (userInput) {
    return userInput;
  } else {
    logger.info('Tudo bem, você pode instalar mais tarde.');
    return userInput;
  }
};

export async function promptSelection(): Promise<string[]> {
  const userSelection = await checkbox({
    message: 'Quais pacotes adicionar ?',
    choices: [
      { name: 'React Router', value: checkboxValues.router },
      { name: 'React Testing Library', value: checkboxValues.rtl },
      { name: 'Styled Components', value: checkboxValues.styled }
    ]
  });
  return userSelection;
}
