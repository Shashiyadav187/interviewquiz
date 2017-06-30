const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	id: String,
    token: String,
    email: String,
    name: String,
});

const GModel = mongoose.model('user',userSchema);

module.exports = GModel;


