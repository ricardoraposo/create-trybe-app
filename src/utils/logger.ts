import chalk from 'chalk';

export const logger = {
  error (...args: any[]) {
    console.log(chalk.red(...args));
  },
  warning (...args: any[]) {
    console.log(chalk.yellow(...args));
  },
  info (...args: any[]) {
    console.log(chalk.cyan(...args));
  },
  success (...args: any[]) {
    console.log(chalk.green(...args));
  }
};

export function successMessageNoNpmI (projectName: string): void {
  console.log('');
  logger.success('Projeto criado com sucesso\n');
  logger.info('Próximos passos:');
  logger.info(`  cd ${projectName} `);
  logger.info('  npm install');
  logger.info('  npm run dev');
}
