const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true }
});

const examSchema = new Schema({
    examName: { type: String, required: true, unique: true},
    description: { type: String, required: true },
    date: { type: Date, required: true },
    duration: { type: Number, required: true }, 
    questions: [questionSchema], 
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' }
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
