'use strict';

const path = require('path');
const chalk = require('chalk');
const { execSync } = require('child_process');

const rootDir = path.join('.');
const ERROR_CODE = 255;

/**
 * 提交代码到分支
 *
 * @param {String} branch 分支名
 */
function push(branch) {
  const execOptions = {
    cwd: rootDir,
  };
  console.log('Start to push code to gitlab.');
  try {
    execSync(`git pull origin ${branch}`, execOptions);
    execSync('git add .', execOptions);
    execSync(`git commit -m "yuque auto update"`, execOptions);
    execSync(`git push origin ${branch}`, execOptions);
  } catch(error) {
    console.log(chalk.yellow(error.message));
    console.log(chalk.yellow('There are some exceptions during push code to gitlab, please manually check it.'));
    if (error.message.startsWith('Command failed: git commit -m')) {
      console.log(chalk.yellow('Almost it is caused by that there isn\'t any changes of repository'));
      return process.exit(0);
    }
    process.exit(ERROR_CODE);
  }
  console.log('Push code to gitlab done!');
}

push('master');
