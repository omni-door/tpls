const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const ora = require('ora');
const { exec } = require('child_process');

(async function () {
  const list_packages = fs.readdirSync(path.resolve(__dirname, '../packages/'));

  const { packages, tactic, version } = await inquirer.prompt([{
    name: 'packages',
    type: 'checkbox',
    choices: [ ...list_packages, '全部发布' ],
    message: '请选择本次要发布的模板(可多选)：'
  }, {
    name: 'tactic',
    type: 'list',
    when: function (answer) {
      if(answer.packages.length > 0) return true;
      return false;
    },
    choices: [ '自动迭代', '手动迭代', '忽略迭代' ],
    default: '自动迭代',
    message: '请选择迭代策略：'
  }, {
    name: 'version',
    type: 'input',
    when: function (answer) {
      if(answer.tactic === '手动迭代') return true;
      return false;
    },
    message: '请输入版本号'
  }]);

  if (!packages || packages.length < 1) {
    console.warn('取消发布，因为未选择任何模板项目！');
    process.exit(0);
  }

  if (!!~packages.indexOf('全部发布')) {
    // 全部发布
    packages.splice(0, packages.length, ...list_packages)
  }

  const CWD = process.cwd();
  let msg = '';
  await new Promise(async (res, rej) => {
    for (let i = 0; i < packages.length; i++) {
      const package = packages[i];
      const spinner = ora(`模板 ${package} 发布中，请稍后……\n`).start();
      spinner.spinner = 'weather';
      spinner.color = 'magenta';
      try {
        await new Promise((resolve, reject) => {
          const workPath = `${path.resolve(CWD, 'packages', package)}`;
          const versionTactic =
            tactic === '忽略迭代'
              ? 'i'
              : version
                ? version
                : ''
          exec(`cd ${workPath} && yarn release ${versionTactic}`, function (err, stdout, stderr) {
            if (err) {
              reject(err);
              return;
            }
            console.info(stdout || stderr);
            spinner.color = 'green';
            spinner.succeed(`模板 ${package} 发布成功！`);
            const v = require(path.resolve(workPath, 'package.json')).version || versionTactic;
            if (!msg) {
              msg = `${i + 1}. publish ${package} to ${v};`
            } else {
              msg += `\n${i + 1}. publish ${package} to ${v};`
            }
            resolve();
          });
        });
      } catch (err) {
        console.error(err);
        spinner.color = 'red';
        spinner.fail(`${package} 的发布过程遇到错误，终止该包的发布！`);
      }

      if (i + 1 === packages.length) {
        // last one
        res();
      }
    }
  })
  
  exec(`cd ${CWD} && yarn release:push '${msg}'`, function (err, stdout, stderr) {
    if (err) {
      console.error(err);
      return;
    }
    console.info(stdout || stderr);
  });
})();