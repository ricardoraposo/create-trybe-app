import chalk from 'chalk'

export const logger = {
  error (...args: any[]) {
    console.log(chalk.red(...args))
  },
  warning (...args: any[]) {
    console.log(chalk.yellow(...args))
  },
  info (...args: any[]) {
    console.log(chalk.cyan(...args))
  },
  success (...args: any[]) {
    console.log(chalk.green(...args))
  }
}
