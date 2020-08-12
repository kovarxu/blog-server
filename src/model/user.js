const { Schema, model } = global.moon;

const UserSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    email: String,
    password: {
        type: String,
        minlength: 8,
        maxlength: 30
    }
})

const UserModel = model('User', UserSchema);

module.exports = {
    UserSchema,
    UserModel
}
