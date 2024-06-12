const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const degreeSchema = new Schema({
    // ref to exam
    exam: { type: Schema.Types.ObjectId, ref: 'Exam',required: true},
    // ref to student
    student: { type: Schema.Types.ObjectId, ref: 'Student' , required: true},
    // degree
    degree: { type: Number, required: true },
})


module.exports = mongoose.model('Degree', degreeSchema);

