const inquirer = require('inquirer');
const ora = require('ora');
const { exec } = require('child_process');

(async function () {
  const { name, confirm } = await inquirer.prompt([{
    name: 'name',
    type: 'input',
    validate: function (val) {
      if (!val) return false;
      return true;
    },
    message: '请输入脚手架模板名：'
  }, {
    name: 'confirm',
    type: 'confirm',
    message: function (answer) {
      if(!answer.name) {
        process.exit(0);
      };
      return `脚手架模板将会创建在 packages/tpl-${answer.name} 下，确认吗？`;
    },
    default: true
  }]);

  if (!confirm) {
    process.exit(0);
  }

  const spinner = ora(`脚手架模板 ${name} 初始化进行中...\n`).start();
  spinner.spinner = 'triangle';
  spinner.color = 'magenta';
  exec(`./scripts/initial.sh ${name}`, function (err, stdout, stderr) {
    if (err) {
      console.error(err);
      spinner.fail(`模板初始化失败！`);
      process.exit(1);
    }
    console.info(stdout || stderr);
    spinner.succeed(`脚手架模板 ${name} 初始化成功，位于 packages/tpl-${name} 下！`);
  });
})();