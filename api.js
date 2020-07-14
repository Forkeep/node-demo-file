const db = require('./database.js');
const inquirer = require('inquirer');


module.exports.clear = async () => {
  await db.write([])
};

module.exports.add = async (task) => {
  const list = await db.read();
  list.push({task: task, done: false});
  await db.write(list)
};

function markAsDone(list, index) {
  list[index].done = true;
  db.write(list)
}

function markAsUnDone(list, index) {
  list[index].done = false;
  db.write(list)
}

function deleteTask(list, index) {
  list.splice(index, 1);
  db.write(list)
}

function updateTask(list, index) {
  inquirer.prompt({
    type: 'input', name: 'task',
    message: '修改名称为',
    default: list[index].task
  }).then(answer => {
    list[index].task = answer.task;
    db.write(list)
  })
}

function askForAction(list, index) {
  const actions = {markAsDone, markAsUnDone, updateTask, deleteTask};
  inquirer.prompt({
    type: 'list', name: 'action',
    message: '请选择操作',
    choices: [
      {name: '退出', value: 'quit'},
      {name: '已完成', value: 'markAsDone'},
      {name: '未完成', value: 'markAsUnDone'},
      {name: '改标题', value: 'updateTask'},
      {name: '删除', value: 'deleteTask'},
    ]
  }).then(answer2 => {
    const action = actions[answer2.action];
    action && action(list, index)
  })
}


function askForCreateTask(list) {
  inquirer.prompt({
    type: 'input', name: 'newTask',
    message: '请输入任务'
  }).then(answer => {
    list.push({task: answer.newTask, done: false});
    db.write(list)
  })
}


module.exports.showAll = async () => {
  const list = await db.read();
  inquirer
    .prompt([
      {
        type: 'list', name: 'index',
        message: '请选择操作',
        choices: [
          {name: '退出', value: '-1'},
          ...list.map((task, index) => {
            return {name: `${task.done ? '[O]' : '[ ]'} ${index + 1}-${task.task}`, value: index.toString()}
          }),
          {name: '添加', value: '-2'},
        ]
      }
    ])
    .then(answers => {
      const actionNum = parseInt(answers.index);
      if (actionNum >= 0) {
        askForAction(list, actionNum)
      } else if (actionNum === -2) {
        askForCreateTask(list)
      }
    })
    .catch(error => {
      if (error.isTtyError) {
        console.log(error.isTtyError)
      } else {
        console.log(error)
      }
    });
};

