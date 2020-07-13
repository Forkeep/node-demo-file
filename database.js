const homedir = require('os').homedir();
const home = process.env['HOME'] || homedir;
const p = require('path');
const fs = require('fs');

const dbPath = p.join(home,'.todo');

const db = {
  read(path = dbPath){

  },
  write(list,path = dbPath){

  }
};

module.exports = db;
