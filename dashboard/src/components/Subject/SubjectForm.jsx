import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {createSubjectThunk, fetchSubjectById, fetchSubjects, updateSubjectThunk} from "../../redux/subjectSlice";

export function SubjectForm() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const navigate = useNavigate();
    const subject = useSelector((state) => state.subjects.subject);

    const [formData, setFormData] = useState({
        subjectName: '',
        description: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (id !== '0') {
            dispatch(fetchSubjectById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        console.log("Fetched subject:", subject);
        if (id && id !== '0' && subject) {
            setFormData({
                subjectName: subject.subjectName || "",
                description: subject.description || "",
            });
        }
    }, [id, subject]);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: "",
        });
    };

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (formData.subjectName.length < 2) {
            errors.subjectName = "Subject Name must be at least 2 characters long";
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
                    await dispatch(createSubjectThunk(formData));
                } else {
                    await dispatch(updateSubjectThunk({ id, subject: formData }));
                }
                navigate("/subjects");
            } catch (error) {
                console.error("Failed to save subject:", error);
            }
        }
    };

    return (
        <div className="row justify-content-center align-items-center">
            <div className="col">
                <div className="mt-5 card shadow mb-4">
                    <div className="card-header py-3">
                        <div className="row justify-content-between align-items-center">
                            <h4 className="col text-primary">{id === '0' ? "Add New Subject" : "Edit Subject"}</h4>
                            <div className="col-auto text-center">
                                <Link to="/subjects" className="btn btn-outline-primary">
                                    Back
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <Form onSubmit={submitHandler}>
                            <Form.Group className="mb-3" controlId="subjectName">
                                <Form.Label>Subject Name</Form.Label>
                                <Form.Control
                                    placeholder="Enter subject name"
                                    type="text"
                                    name="subjectName"
                                    value={formData.subjectName}
                                    onChange={changeHandler}
                                />
                                {errors.subjectName &&
                                    <Form.Text className="text-danger">{errors.subjectName}</Form.Text>}
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
                                {errors.description &&
                                    <Form.Text className="text-danger">{errors.description}</Form.Text>}
                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
