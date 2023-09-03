#!/usr/bin/env node

import { Command } from 'commander';
import { logger, successMessageNoNpmI, welcomeMessage } from './utils/logger.js';
import { addGit, addTemplate, createDir } from './helpers/fsFunctions.js';
import { promptGit, promptLanguage, promptNpmInstall, promptProjectName, promptSelection } from './utils/prompts.js';
import { BASE_TEMPLATE_PATH, REACT_ROUTER_TEMPLATE_PATH, RTL_TEMPLATE_PATH } from './consts.js';
import { addRTLDependencies } from './utils/dependencies.js';

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
    createDir(projectName);

    const opts = program.opts();

    if (!opts.typescript) await promptLanguage();
    const selection = await promptSelection();

    const router = selection.includes('router');
    const rtl = selection.includes('vitest');

    addTemplate(BASE_TEMPLATE_PATH, projectName);

    if (router) addTemplate(REACT_ROUTER_TEMPLATE_PATH, projectName);
    if (rtl) {
      addRTLDependencies(projectName);
      addTemplate(RTL_TEMPLATE_PATH, projectName);
    }

    if (opts.git) addGit(projectName);
    if (!opts.nogit && !opts.git) await promptGit(projectName);
    await promptNpmInstall(projectName);

    successMessageNoNpmI(projectName);
  } catch (e) {
    logger.error(e.message);
  }
};

main();
