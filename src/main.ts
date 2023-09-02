#!/usr/bin/env node

import { Command } from 'commander';
import { logger, successMessageNoNpmI } from './utils/logger.js';
import { baseTemplatePath, reactRouterTemplatePath } from './consts.js';
import { addTemplate, createDir } from './helpers/fsFunctions.js';
import { promptProjectName, promptRouter } from './utils/prompts.js';

const program = new Command().name('create-trybe-app');

program
  .argument('[dir]', 'name of the project')
  .option('--router', 'starts the project using react-router-dom', false)
  .parse(process.argv);

try {
  const userInput = program.args[0] ?? await promptProjectName();

  const opts = program.opts();
  const router = opts.router || await promptRouter();

  const projectName = userInput.toLowerCase().replace(/[,/\\ ]/g, '');
  createDir(projectName);

  addTemplate(baseTemplatePath, projectName);
  if (router) addTemplate(reactRouterTemplatePath, projectName);

  successMessageNoNpmI(projectName);
} catch (e) {
  logger.error(e.message);
}
