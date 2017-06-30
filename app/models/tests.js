const mongoose = require('mongoose');

var testsSchema = new mongoose.Schema({
	url: String,
    email: String,
    status: {
        type: Number,
        default: 0
    },
    score:{
        type: Number,
        default: null
    }
});

const TestModel = mongoose.model('tests',testsSchema);

module.exports = TestModel;