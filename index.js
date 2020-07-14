const {program} = require('commander');
const pkg = require('./package.json');
const api = require('./api.js');
program.version(pkg.version);

program
  .option('-a, --add', 'add a new task')
  .option('-c, --clear', 'clear all tasks');

program.parse(process.argv);

if (program.add) {
  console.log(...program.args);
  console.log(process.argv.length);
  api.add(...program.args)
}

if (program.clear) {
  api.clear();
  console.log(process.argv.length)
}

if (process.argv.length === 2){
  api.showAll()
}
