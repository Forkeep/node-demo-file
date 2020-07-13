const {program} = require('commander');
const pkg = require('./package.json');
program.version(pkg.version);

program
  .option('-a, --add', 'add a new task')
  .option('-c, --clear', 'clear all tasks');

program.parse(process.argv);

if (program.add) {
  console.log(...program.args);
  console.log(process.argv.length)
}

if (program.clear) {
  console.log(process.argv.length)
}

if (process.argv.length === 2){
  console.log('显示所有任务列表')
}