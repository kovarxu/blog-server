const {
    MONGO_USR,
    MONGO_PWD,
    MONGO_HOST,
    MONGO_DB,
} = process.env;

console.log(MONGO_USR, MONGO_PWD, MONGO_HOST, MONGO_DB)

module.exports = {
    // mongoUrl: 'mongodb+srv://kovarxu:db123456789@lord.vxkdg.mongodb.net/myblog?retryWrites=true&w=majority'
    mongoUrl: `mongodb://${MONGO_USR}:${MONGO_PWD}@${MONGO_HOST}:27017/${MONGO_DB}?retryWrites=true&w=majority&authSource=admin`
}
