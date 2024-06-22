import React, {useEffect, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createExamThunk, fetchExamById, updateExamThunk} from "../../redux/examSlice";
import {fetchSubjects} from "../../redux/subjectSlice";
import { Trash } from 'react-bootstrap-icons';

export function ExamForm() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const navigate = useNavigate();
    const exam = useSelector((state) => state.exams.exam);
    const subjects = useSelector((state) => state.subjects.subjects || []);

    const initialQuestion = {
        questionText: '',
        options: ['', '', '', ''],
        correctAnswer: '',
    };

    const [formData, setFormData] = useState({
        examName: '',
        description: '',
        duration: '',
        date: '',
        subject: '',
        questions: [initialQuestion]
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(fetchSubjects());
        if (id !== '0') {
            dispatch(fetchExamById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (id !== '0' && exam) {
            setFormData({
                examName: exam.examName || "",
                description: exam.description || "",
                duration: exam.duration || "",
                date: exam.date || "",
                subject: exam.subject?._id || '',
                questions: exam.questions || [initialQuestion]
            });
        }
    }, [id, exam]);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("options")) {
            const [index, optionIndex] = name.match(/\d+/g).map(Number);
            const updatedQuestions = [...formData.questions];
            updatedQuestions[index].options[optionIndex] = value;
            setFormData({
                ...formData,
                questions: updatedQuestions
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });

            setErrors({
                ...errors,
                [name]: "",
            });
        }
    };

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (formData.examName.length < 2) {
            errors.examName = "Exam Name must be at least 2 characters long";
            isValid = false;
        }

        if (formData.description.length < 10) {
            errors.description = "Description must be at least 10 characters long";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                if (id === '0') {
                    await dispatch(createExamThunk(formData));
                } else {
                    await dispatch(updateExamThunk({ id, exam: formData }));
                }
                navigate("/exams");
            } catch (error) {
                console.error("Failed to save exam:", error);
            }
        }
    };

    const questionChangeHandler = (index, e) => {
        const { name, value } = e.target;
        const updatedQuestions = [...formData.questions];
        updatedQuestions[index] = { ...updatedQuestions[index], [name]: value };
        setFormData({ ...formData, questions: updatedQuestions });
    };

    const addQuestion = () => {
        setFormData({
            ...formData,
            questions: [...formData.questions, { ...initialQuestion }]
        });
    };

    const deleteQuestion = (index) => {
        const updatedQuestions = [...formData.questions];
        updatedQuestions.splice(index, 1);
        setFormData({ ...formData, questions: updatedQuestions });
    };

    return (
        <>
            <div className="row justify-content-center align-items-center">
                <div className="col">
                    <div className="mt-5 card shadow mb-4">
                        <div className="card-header py-3">
                            <div className="row justify-content-between align-items-center">
                                <h4 className="col text-primary">{id === '0' ? "Add New Exam" : "Edit Exam"}</h4>
                                <div className="col-auto text-center">
                                    <Link to="/exams" className="btn btn-outline-primary">
                                        Back
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <Form onSubmit={submitHandler}>
                                <Form.Group className="mb-3" controlId="examName">
                                    <Form.Label>Exam Name</Form.Label>
                                    <Form.Control
                                        placeholder="Enter exam name"
                                        type="text"
                                        name="examName"
                                        value={formData.examName}
                                        onChange={changeHandler}
                                    />
                                    {errors.examName &&
                                        <Form.Text className="text-danger">{errors.examName}</Form.Text>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Enter Description"
                                        name="description"
                                        value={formData.description}
                                        onChange={changeHandler}
                                    />
                                    {errors.description && <Form.Text className="text-danger">{errors.description}</Form.Text>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="durationDate">
                                    <Form.Label>Duration</Form.Label>
                                    <Form.Control
                                        placeholder="Select exam duration"
                                        type="number"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={changeHandler}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formDate">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control
                                        placeholder="Select exam date"
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={changeHandler}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formSubject">
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={changeHandler}
                                    >
                                        {subjects.length > 0 ? (
                                            subjects.map((subject) => (
                                                <option key={subject._id} value={subject._id}>
                                                    {subject.subjectName} - {subject.description}
                                                </option>
                                            ))
                                        ) : (
                                            <option>No subjects available</option>
                                        )}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Questions</Form.Label>
                                    {formData.questions.map((question, index) => (
                                        <div key={index} className="mb-4 p-3 border rounded">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <h5>Question {index + 1}</h5>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => deleteQuestion(index)}
                                                    className="align-self-start pb-0 pt-3"
                                                >
                                                    <Trash/>
                                                </Button>
                                            </div>
                                            <Form.Control className='mb-3'
                                                          placeholder="Enter question text"
                                                          type="text"
                                                          name={`questionText`}
                                                          value={question.questionText}
                                                          onChange={(e) => questionChangeHandler(index, e)}
                                            />
                                            <Form.Label>Options</Form.Label>
                                            {question.options.map((option, optionIndex) => (
                                                <Form.Control className="mb-3"
                                                              key={optionIndex}
                                                              placeholder={`Option ${optionIndex + 1}`}
                                                              type="text"
                                                              name={`options[${index}][${optionIndex}]`}
                                                              value={option}
                                                              onChange={(e) => changeHandler(e)}
                                                />
                                            ))}
                                            <Form.Label>Correct Answer</Form.Label>
                                            <Form.Control className="mb-3"
                                                          as="select"
                                                          name={`correctAnswer`}
                                                          value={question.correctAnswer}
                                                          onChange={(e) => questionChangeHandler(index, e)}
                                            >
                                                {question.options.map((option, optionIndex) => (
                                                    <option key={optionIndex} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </div>
                                    ))}
                                    <Button variant="info" onClick={addQuestion} className="mt-3">
                                        Add Question
                                    </Button>
                                </Form.Group>

                                <Button variant="dark" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}