#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { Command } from 'commander';

import { promptGit, promptLanguage, promptNpmInstall, promptProjectName, promptSelection } from './utils/prompts.js';
import { logger, successMessage, welcomeMessage } from './utils/logger.js';
import { BASE_TEMPLATE_PATH, checkboxValues } from './consts.js';
import { addGit, addTemplate, createDir } from './helpers/fsFunctions.js';
import { reactRouterInstaller } from './installers/reactRouter.js';
import { rtlInstaller } from './installers/rtl.js';
import { addProjectName } from './helpers/writeToPackage.js';
import { styledComponentsInstaller } from './installers/styled.js';
import { dependencyInstaller } from './helpers/depInstaller.js';

const program = new Command().name('create-trybe-app');

program
  .description(
    'Uma CLI para criar aplicação frontend com a stack da trybe'
  );

program
  .argument('[dir]', 'O nome da aplicação e a pasta a ser criada')
  .option('-ts, --typescript', 'Instrui explicitamente a CLI a usar TypeScript para o desenvolvimento', false)
  .option('--router', 'Instrui explicitamente a CLI a adicionar o React Router ao projeto', false)
  .option('--rtl', 'Instrui explicitamente a CLI a adicionar o React Testing Library ao projeto', false)
  .option('--styled', 'Instrui explicitamente a CLI a adicionar Styled Components ao projeto', false)
  .option('--git', 'Instrui a CLI a inicializar a aplicação como um repositório Git', false)
  .option('--nogit', 'Instrui a CLI a não inicializar um repositório Git', false)
  .option('-i, --install <gerenciador de pacotes>', 'Após o processo, instala as dependências do projeto usando o gerenciador de pacotes desejado', false)
  .option('--debug', 'Ativar modo de depuração', false)
  .parse(process.argv);

async function main(): Promise<void> {
  try {
    welcomeMessage();

    const userInput = program.args[0] ?? await promptProjectName();
    const projectName = userInput.toLowerCase().replace(/[,/\\ ]/g, '');

    const opts = program.opts();

    if (!opts.typescript) await promptLanguage();

    let { router, rtl, styled, install, git, nogit } = opts;

    if (!(router || rtl || styled)) {
      const selection = await promptSelection();
      router = selection.includes(checkboxValues.router);
      rtl = selection.includes(checkboxValues.rtl);
      styled = selection.includes(checkboxValues.styled);
    }

    createDir(projectName);
    addTemplate(BASE_TEMPLATE_PATH, projectName);
    addProjectName(projectName);

    // npm is stupid
    fs.renameSync(path.join(projectName, '_vscode'), path.join(projectName, '.vscode'));
    fs.renameSync(path.join(projectName, '_gitignore'), path.join(projectName, '.gitignore'));

    if (router) reactRouterInstaller(projectName);
    if (rtl) rtlInstaller(projectName, router);
    if (styled) styledComponentsInstaller(projectName, router);

    if (git) addGit(projectName);
    if (!nogit && !git) await promptGit(projectName);

    if (install) {
      await dependencyInstaller(projectName, install, opts.debug);
      successMessage(projectName, true);
    } else {
      const npmInstall = await promptNpmInstall();
      if (npmInstall) await dependencyInstaller(projectName, 'npm', opts.debug);
      successMessage(projectName, npmInstall);
    }
  } catch (e) {
    logger.error(e.message);
  }
};

main();
