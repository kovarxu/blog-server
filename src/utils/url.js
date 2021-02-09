
function matchMethods(reqMethod, allowMethods) {
    // default methods
    if (!allowMethods) {
        allowMethods = ['get', 'post'];
    }
    reqMethod = reqMethod.toLowerCase();
    if (Array.isArray(allowMethods)) {
        const lowerCaseMethods = allowMethods.map(item => item.toLowerCase());
        return lowerCaseMethods.indexOf(reqMethod) >= 0;
    } else {
        return reqMethod === allowMethods.toLowerCase();
    }
}

function escape(str = '') {
    return str.replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/&/g, '&amp;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#39;');
}

module.exports = {
    matchMethods,
    escape
}
