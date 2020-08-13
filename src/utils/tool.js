const article = require("../model/article");

function selectFrom(obj, attrList) {
  return attrList.reduce((o, attrKey) => {
    o[attrKey] = obj[attrKey];
    return o;
  }, {});
}

module.exports = {
  selectFrom,
}
