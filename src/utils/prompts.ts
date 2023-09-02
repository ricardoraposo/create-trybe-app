import { input, confirm, select } from '@inquirer/prompts';
import { logger } from './logger.js';

export async function promptProjectName (): Promise<string> {
  const projectName = await input({
    message: 'Enter your project name >',
    default: 'trybe-project'
  });
  return projectName;
}

export async function promptRouter (): Promise<boolean> {
  const userInput = await confirm({ message: 'Gostaria de adicionar o react-router ?' });
  if (userInput) {
    logger.info('Muito bem, adicionando react-router');
  } else {
    logger.info('Ok, quem sabe na próxima...');
  }
  return userInput;
}

export async function promptLanguage (): Promise<void> {
  const userInput = await select({
    message: 'Qual linguagem gostaria de usar ?',
    choices: [
      {
        name: 'Typescript',
        value: 'ts'
      },
      {
        name: 'Javascript',
        value: 'js'
      }
    ]
  });

  if (userInput === 'ts') {
    logger.info('Bela escolha, usaremos Typescript');
  } else {
    logger.info('Escolheu errado, vamos utilizar Typescript');
  }
}
