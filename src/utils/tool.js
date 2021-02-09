const crypto = require('crypto');

function selectFrom(obj, attrList) {
  return attrList.reduce((o, attr) => {
    if (attr.key) {
      o[attr.key] = obj[attr.origKey];
    } else {
      o[attr] = obj[attr];
    }
    return o;
  }, {});
}

const formatDigit = (digit) => {
  const digitInStr = String(digit);
  return digitInStr.length === 1 ? ('0' + digitInStr) : digitInStr;
}

const formatTime = (time, format = '') => {
  let date = null;
  if (time instanceof Date) {
    date = time;
  } else {
    date = new Date(time);
  }
  const fo = {
    year: formatDigit(date.getFullYear()),
    month: formatDigit(date.getMonth() + 1),
    date: formatDigit(date.getDate()),
    hour: formatDigit(date.getHours()),
    minute: formatDigit(date.getMinutes()),
    second: formatDigit(date.getSeconds()),
    millisecond: formatDigit(date.getMilliseconds())
  }

  switch(format) {
    case 'ymd':
      return `${fo.year}${fo.month}${fo.date}`;
    case 'hms':
      return `${fo.hour}:${fo.minute}:${fo.second}`;
    case 'full':
      return `${fo.year}.${fo.month}.${fo.date} ${fo.hour}:${fo.minute}:${fo.second}`;
    default:
      return fo
  }
}

const getHash = (extraData = '') => {
  const hash = crypto.createHash('md5');
  hash.update(Date.now() + '');
  extraData && hash.update(extraData);
  return hash.digest('hex').slice(2, 10);
}

module.exports = {
  selectFrom,
  formatTime,
  getHash
}
