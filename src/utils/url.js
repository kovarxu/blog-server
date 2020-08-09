
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

module.exports = {
    matchMethods
}
