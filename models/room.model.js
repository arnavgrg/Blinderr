const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RoomSchema = new Schema({
	p1: {type: String, required: true},
	p2: {type: String, required: true}
});

// Export the model
module.exports = mongoose.model('Room', RoomSchema);