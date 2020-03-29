const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EventSchema = new Schema({
    rooms: {type: Array, required: true},
});


// Export the model
module.exports = mongoose.model('Event', EventSchema);