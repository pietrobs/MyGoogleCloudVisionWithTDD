const fs = require("fs");

const Writer = {
  save(path, content) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, JSON.stringify(content), err => {
        if (err) {
          reject(err);
        }
        resolve(true);
      });
    });
  }
};

module.exports = Writer;
