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
  .argument('[dir]', 'O nome da aplicação e da pasta que será criada')
  .option('-ts,--typescript', 'Explicitamente diz à CLI que typescript será utilizado para o desenvolvimento', false)
  .option('--router', 'Explicitamente diz à CLI para adicionar react-router no projeto', false)
  .option('--rtl', 'Explicitamente diz à CLI para adicionar a react testing library no projeto', false)
  .option('--styled', 'Explicitamente diz à CLI para adicionar styled components no projeto', false)
  .option('--git', 'Diz à CLI para iniciar a aplicação como repositório git', false)
  .option('--nogit', 'Diz à CLI para não iniciar um repositório git', false)
  .option('-i, --install <package manager>', 'Ao final do processo, instala as dependências do projeto com o gerenciador de dependências desejado', false)
  .option('--debug', 'Debug mode', false)
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
