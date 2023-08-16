#!/usr/bin/env node

// import fs from "fs/promises";
import { spawnSync } from "child_process";
import input from '@inquirer/input';

async function getUserInput(): Promise<string> {
  const answer = await input({
    message: 'Enter your name >',
    default: 'trybe-project',
  });

  return answer.toLowerCase().replace(/\s/g, "");
};

async function createViteProject() {
  const folderName = await getUserInput();
  const args = [
    "create", "vite@latest", folderName,
    "--", "--template", "react-ts"
  ];

  spawnSync("npm", args, { stdio: 'inherit' })
};

createViteProject()
