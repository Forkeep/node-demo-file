const db = require('./database.js');
const inquirer = require('inquirer');


module.exports.clear = async () => {
  await db.write([])
};

module.exports.add = async (task) => {
  const list = await db.read();
  list.push({task: task, done: false});
  console.log(list)
  await db.write(list)
};


module.exports.showAll = async ()=>{
  console.log('show all')
};

