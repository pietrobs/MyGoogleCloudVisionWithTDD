const fs = require("fs");

const Reader = {
  read(content) {
    return JSON.parse(fs.readFileSync(content));
  }
};

module.exports = Reader;
