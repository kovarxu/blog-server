const { Schema, model } = global.moon;

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String
})

const UserModel = model('User', UserSchema);

module.exports = {
    UserSchema,
    UserModel
}
