const express = require('express');
const router = express.Router();

const resultValidator = require('../midelware/resultValidator');
const {
    createSubjectValidator,
    updateSubjectValidator,
    deleteSubjectValidator,
} = require('../midelware/subject/subjectValidator');


const subjectController = require('../controllers/SubjectCintroller');


router.route("/subjects")
    .get(subjectController.getAllSubjects)
    .post(createSubjectValidator,resultValidator,subjectController.createSubject)

router.route("/subjects/:id")
    .get(subjectController.getSubject)
    .put(updateSubjectValidator,resultValidator,subjectController.updateSubject)
    .delete(deleteSubjectValidator,resultValidator,subjectController.deleteSubject);

module.exports = router;
