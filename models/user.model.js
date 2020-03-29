const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {type: String, required: true, max: 100},
    email: {type: String, required: true},
    height: {type: String, required: true},
    age: { type: Number, min: 18, required: true},
    sexuality: {type: String, required: true},
    gender: {type: String, required: true},
    bio: {type: String, required: true},
    matches: {type: Array},
    likes: {type: Array}
});


// Export the model
module.exports = mongoose.model('User', UserSchema);