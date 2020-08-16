const log4js = require('log4js');
const logger = log4js.getLogger();
const fpath = require('path');
const fse = require('fs-extra');
const {formatTime} = require('../../utils/tool');

async function preserveStatic(fileDescriptor) {
  const {path, name, size} = fileDescriptor;
  const staticFileDir = fpath.resolve('./static/' + formatTime(Date.now(), 'ymd'));
  let saveTargetPath = staticFileDir + '/' + name;

  await fse.ensureDir(staticFileDir);
  const exists = await fse.pathExists(saveTargetPath);
  if (exists) {
    const ext = fpath.extname(name);
    saveTargetPath = staticFileDir + '/' + name.replace(ext, '') + '_' + Date.now() + ext;
  };
  await fse.move(path, saveTargetPath);
  return saveTargetPath;
}

const action = async (ctx) => {
  logger.debug('upload files: ' + Object.keys(ctx.request.files));

  const keys = Object.keys(ctx.request.files);
  const savedFilePaths = [];

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const files = ctx.request.files[key];
    if (Array.isArray(files)) {
      for (let j = 0; j < files.length; j++) {
        const file = files[j];
        const saveTargetPath = await preserveStatic(file);
        savedFilePaths.push(saveTargetPath);
      }
    } else {
      const saveTargetPath = await preserveStatic(files);
      savedFilePaths.push(saveTargetPath);
    }
  }

  ctx.body = {
    ret: 0,
    data: {
      paths: savedFilePaths.map(path => fpath.relative(fpath.resolve(''), path)),
    },
    errmsg: ''
  }
}

module.exports = {
  method: 'POST',
  action,
}
