const mongoose = require('mongoose');

var adminSchema = new mongoose.Schema({
	username: String,
    password: String,

});

const AModel = mongoose.model('admin',adminSchema);

module.exports = AModel;


