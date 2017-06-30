const mongoose = require('mongoose');
const random = require('mongoose-simple-random');
var questionsSchema = new mongoose.Schema({
	text: String,
    a: String,
    b: String,
    c:String,
    d:String,
    ans: String
});
questionsSchema.plugin(random);

const QuizModel = mongoose.model('questions',questionsSchema);

module.exports = QuizModel;