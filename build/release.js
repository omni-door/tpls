const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const ora = require('ora');
const { exec } = require('child_process');

(async function () {
  const list_packages = fs.readdirSync(path.resolve(__dirname, '../packages/'));

  const { packages } = await inquirer.prompt([{
    name: 'packages',
    type: 'checkbox',
    choices: [ ...list_packages, '全部发布' ],
    message: '请选择本次要发布的模板'
  }]);

  if (!packages || packages.length < 1) {
    console.warn('未选择任何模板项目！');
    process.exit(0);
  }

  if (!!~packages.indexOf('全部发布')) {
    // 全部发布
    exec('lerna run release', function (err) {
      if (err) {
        console.error(err);
        console.error(`发布过程遇到错误，终止发布！`);
        process.exit(1);
      }
      console.info(stdout || stderr);
    });
  } else {
    for (let i = 0; i < packages.length; i++) {
      const package = packages[i];
      await new Promise((resolve, reject) => {
        const workPath = `${path.resolve(process.cwd(), 'packages', package)}`;
        const spinner = ora(`模板 ${package} 发布中，请稍后……\n`).start();
        spinner.spinner = 'weather';
        spinner.color = 'magenta';
        exec(`cd ${workPath} && yarn release`, function (err, stdout, stderr) {
          if (err) {
            spinner.color = 'red';
            spinner.fail(`模板 ${package} 发布失败！`);
            reject(err);
          }
          console.info(stdout || stderr);
          spinner.color = 'green';
          spinner.succeed(`模板 ${package} 发布成功！`);
          resolve();
        });
      }).catch(err => {
        console.error(err);
        console.error(`${package} 的发布过程遇到错误，终止该包的发布！`);
      });
    }
  }
})();