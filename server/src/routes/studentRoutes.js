const express = require("express");
const router = express.Router();



const studentController = require("../controllers/StudentContoller");
const resultValidator = require("../midelware/resultValidator");
const {
    insertValidator,
    updateValidator,
    deleteValidator,
    getValidator,
}= require("../midelware/student/studentValidator");


router.route("/students")
    .get(studentController.getAllStudents)
    .post(insertValidator, resultValidator,studentController.createStudent)
    .put(updateValidator, resultValidator,studentController.updateStudent);

router.route("/students/:id")
    .get(getValidator, resultValidator,studentController.getStudent)
    .delete(deleteValidator, resultValidator,studentController.deleteStudent);


module.exports = router;