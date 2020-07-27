const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const ora = require('ora');
const { exec } = require('child_process');

(async function () {
  const list_packages = fs.readdirSync(path.resolve(__dirname, '../packages/'));

  const { dir, name, type, confirm } = await inquirer.prompt([{
    name: 'dir',
    type: 'list',
    choices: [ ...list_packages ],
    message: '请选择新建模板的目录：'
  }, {
    name: 'name',
    type: 'input',
    validate: function (val) {
      if (!val) return false;
      return true;
    },
    message: '请输入新建模板名：'
  }, {
    name: 'type',
    type: 'list',
    choices: [ '初始化', '新建' ],
    message: '请选择模板使用场景：'
  }, {
    name: 'confirm',
    type: 'confirm',
    message: function (answer) {
      if(!answer.name || !answer.dir) {
        process.exit(0);
      };
      const dirPath = answer.type === '新建' ? `packages/${answer.dir}/new/${answer.name}` : `packages/${answer.dir}/${answer.name}`;
      return `模板将会创建在 ${dirPath} 下，确认吗？`;
    },
    default: true
  }]);

  if (!confirm) {
    process.exit(0);
  }

  const realType = type === '新建' ? 'new' : 'init';
  const spinner = ora(`新建 ${name} 模板中...\n`).start();
  spinner.spinner = 'toggle3';
  spinner.color = 'magenta';
  exec(`./scripts/new.sh ${dir} ${name} ${realType}`, function (err, stdout, stderr) {
    if (err) {
      console.error(err);
      spinner.fail(`新建模板失败！`);
      process.exit(1);
    }
    console.info(stdout || stderr);
    spinner.succeed(`新建模板 ${name} 成功，位于 packages/${dir}/${name} 下！`);
  });
})();