function selectFrom(obj, attrList) {
  return attrList.reduce((o, attrKey) => {
    o[attrKey] = obj[attrKey];
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

module.exports = {
  selectFrom,
  formatTime
}
