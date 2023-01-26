const fs = require("node:fs/promises");

async function symlink(source, dest) {
  await fs.symlink(dest, source);
}

module.exports = {
  symlink,
};
