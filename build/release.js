const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const ora = require('ora');
const { exec } = require('child_process');

(async function () {
  const list_packages = fs.readdirSync(path.resolve(__dirname, '../packages/'));

  const { packages, version } = await inquirer.prompt([{
    name: 'packages',
    type: 'checkbox',
    choices: [ ...list_packages, '全部发布' ],
    message: '请选择本次要发布的模板'
  }, {
    name: 'version',
    type: 'input',
    when: function (answer) {
      if(answer.packages.length > 0 && !~answer.packages.indexOf('全部发布')) return true;
      return false;
    },
    default: '自动迭代',
    message: '请输入版本号，忽略则自动迭代版本号'
  }]);

  if (!packages || packages.length < 1) {
    console.warn('未选择任何模板项目！');
    process.exit(0);
  }

  if (!!~packages.indexOf('全部发布')) {
    // 全部发布
    const spinner = ora(`全部模板项目发布中，请稍后……\n`).start();
    spinner.spinner = 'earth';
    spinner.color = 'magenta';
    exec('lerna run release', function (err, stdout, stderr) {
      if (err) {
        console.error(err);
        spinner.fail(`发布过程遇到错误，终止发布！`);
        process.exit(1);
      }
      console.info(stdout || stderr);
      spinner.succeed(`所有模板发布成功！`);
    });
  } else {
    for (let i = 0; i < packages.length; i++) {
      const package = packages[i];
      const spinner = ora(`模板 ${package} 发布中，请稍后……\n`).start();
      spinner.spinner = 'weather';
      spinner.color = 'magenta';
      try {
        await new Promise((resolve, reject) => {
          const workPath = `${path.resolve(process.cwd(), 'packages', package)}`;
          exec(`cd ${workPath} && yarn release ${version === '自动迭代' ? '' : `-m ${version}`}`, function (err, stdout, stderr) {
            if (err) {
              reject(err);
              return;
            }
            console.info(stdout || stderr);
            spinner.color = 'green';
            spinner.succeed(`模板 ${package} 发布成功！`);
            resolve();
          });
        });
      } catch (err) {
        console.error(err);
        spinner.color = 'red';
        spinner.fail(`${package} 的发布过程遇到错误，终止该包的发布！`);
      }
    }
  }
})();