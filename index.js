const {program} = require('commander');
const pkg = require('./package.json');
const api = require('./api.js');
program.version(pkg.version);

program
  .option('-a, --add', 'add a new task')
  .option('-c, --clear', 'clear all tasks');

program.parse(process.argv);

if (program.add) {
  api.add(...program.args)
}

if (program.clear) {
  api.clear();
}

if (process.argv.length === 2){
  api.showAll()
}
