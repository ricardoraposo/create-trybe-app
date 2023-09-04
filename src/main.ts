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

const program = new Command().name('create-trybe-app');

program
  .description(
    'Uma CLI para criar aplicação frontend com a stack da trybe'
  );

program
  .argument('[dir]', 'O nome da aplicação e da pasta que será criada')
  .option('-ts,--typescript', 'Explicitamente diz à CLI que typescript será utilizado para o desenvolvimento', false)
  .option('--git', 'Diz à CLI para iniciar a aplicação como repositório git', false)
  .option('--nogit', 'Diz à CLI para não iniciar um repositório git', false)
  .parse(process.argv);

async function main(): Promise<void> {
  try {
    welcomeMessage();

    const userInput = program.args[0] ?? await promptProjectName();
    const projectName = userInput.toLowerCase().replace(/[,/\\ ]/g, '');

    const opts = program.opts();

    if (!opts.typescript) await promptLanguage();
    const selection = await promptSelection();

    const router = selection.includes(checkboxValues.router);
    const rtl = selection.includes(checkboxValues.rtl);

    createDir(projectName);
    addTemplate(BASE_TEMPLATE_PATH, projectName);
    addProjectName(projectName);

    // npm is stupid
    fs.renameSync(path.join(projectName, '_vscode'), path.join(projectName, '.vscode'));
    fs.renameSync(path.join(projectName, '_gitignore'), path.join(projectName, '.gitignore'));

    if (router) reactRouterInstaller(projectName);
    if (rtl) rtlInstaller(projectName, router);

    if (opts.git) addGit(projectName);
    if (!opts.nogit && !opts.git) await promptGit(projectName);
    const npmInstall = await promptNpmInstall(projectName);

    successMessage(projectName, npmInstall);
  } catch (e) {
    logger.error(e.message);
  }
};

main();
