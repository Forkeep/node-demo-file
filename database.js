const homedir = require('os').homedir();
const home = process.env['HOME'] || homedir;
const p = require('path');
const fs = require('fs');

const dbPath = p.join(home,'.todo');

const db = {
  read(path = dbPath){
    return new Promise((resolve, reject) => {
      fs.readFile(path, {flag: 'a+'}, (error, data) => {
        if (error) return reject(error);
        try {
          list = JSON.parse(data.toString())
        } catch (e) {
          list = []
        }
        resolve(list)
      })
    })

  },
  write(list, path = dbPath) {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify(list);
      fs.writeFile(path, data + '\n', error => {
        if (error) return reject(error);
        resolve()
      })
    })
  }
};


module.exports = db;