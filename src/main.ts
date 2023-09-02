#!/usr/bin/env node

import fs from 'fs';
import { input } from '@inquirer/prompts';
import { Command } from 'commander';
import { logger } from './utils/logger.js';
import { baseTemplatePath, reactRouterTemplatePath } from './consts.js';
import { addTemplate } from './helpers/fsFunctions.js';

const program = new Command().name('create-trybe-app');

program
  .argument('[dir]', 'name of the project')
  .option('--router', 'starts the project using react-router-dom', false)
  .parse(process.argv);

try {
  const userInput = program.args[0] ??
    await input({
      message: 'Enter your project name >',
      default: 'trybe-project'
    });

  const opts = program.opts();
  const projectName = userInput.toLowerCase().replace(/[,/\\ ]/g, '');
  fs.mkdirSync(projectName);

  addTemplate(baseTemplatePath, projectName);
  if (opts.router) addTemplate(reactRouterTemplatePath, projectName);
} catch (e) {
  logger.error(e.message);
}
