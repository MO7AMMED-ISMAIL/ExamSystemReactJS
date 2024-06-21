import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubjectById } from "../../redux/subjectSlice";
import { Error } from "../../layouts/errors/Error";
import {fetchExamById} from "../../redux/examSlice";

export function SubjectDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const subject = useSelector((state) => state.subjects.subject);
    const status = useSelector((state) => state.subjects.status);
    const error = useSelector((state) => state.subjects.error);

    useEffect(() => {
        console.log(id)
        if (id) {
            dispatch(fetchSubjectById(id));
        }
    }, [dispatch, id]);

    // Handle response status
    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "failed") {
        return <Error />;
    }

    if (!subject) {
        return <div>Subject not found</div>;
    }

    return (
        <div className="row justify-content-center align-items-center">
            <div className="col">
                <div className="mt-5 card shadow mb-4">
                    <div className="card-header py-3">
                        <div className="row justify-content-between align-items-center">
                            <h4 className="col text-primary">Show Subject Details</h4>
                            <div className="col-auto text-center">
                                <Link to="/subjects" className="btn btn-outline-primary">
                                    Back
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="card-body p-5">
                        <div className="mb-3">
                            <strong>Subject Name:</strong> {subject.subjectName}
                        </div>
                        <div className="mb-3">
                            <strong>Description:</strong> {subject.description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}