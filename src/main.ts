#!/usr/bin/env node

import { Command } from 'commander';
import { logger, successMessageNoNpmI } from './utils/logger.js';
import { addTemplate, createDir } from './helpers/fsFunctions.js';
import { promptLanguage, promptProjectName, promptRouter } from './utils/prompts.js';
import { BASE_TEMPLATE_PATH, REACT_ROUTER_TEMPLATE_PATH } from './consts.js';

const program = new Command().name('create-trybe-app');

program
  .argument('[dir]', 'name of the project')
  .option('--router', 'starts the project using react-router-dom', false)
  .option('-ts,--typescript', 'starts the project using typescript', false)
  .parse(process.argv);

try {
  const userInput = program.args[0] ?? await promptProjectName();
  const projectName = userInput.toLowerCase().replace(/[,/\\ ]/g, '');
  createDir(projectName);

  const opts = program.opts();

  if (!opts.typescript) await promptLanguage();
  const router = opts.router || await promptRouter();

  addTemplate(BASE_TEMPLATE_PATH, projectName);
  if (router) addTemplate(REACT_ROUTER_TEMPLATE_PATH, projectName);

  successMessageNoNpmI(projectName);
} catch (e) {
  logger.error(e.message);
}
