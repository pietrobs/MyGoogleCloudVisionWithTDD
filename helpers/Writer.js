const fs = require("fs");

const Writer = {
  save(path, content) {
    fs.writeFile(path, JSON.stringify(content), err => {
      if (err) {
        console.error(err);
        return;
      }
      //file written successfully
    });
  }
};

module.exports = Writer;
