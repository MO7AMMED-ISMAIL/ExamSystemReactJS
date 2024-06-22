import {getExamById} from "../services/examService";
import {getSubjectById} from "../services/subjectService";

export const examDetailsLoader = async ({params}) => {
    try {
        const response = await getExamById(params.id);
        return response.data;
    } catch (error) {
        throw new Response("Error fetching exam details", {status: 500});
    }
};

export const examFormLoader = async ({params}) => {
    if (params.id === '0') {
        return {examName: "", description: "", };
    }
    try {
        const response = await getExamById(params.id);
        return response.data;
    } catch (error) {
        throw new Response("Error fetching exam data", {status: 500});
    }
};

export const subjectDetailsLoader = async ({params}) => {
    try {
        const response = await getSubjectById(params.id);
        return response.data;
    } catch (error) {
        throw new Response("Error fetching subject details", {status: 500});
    }
};

export const subjectFormLoader = async ({params}) => {
    if (params.id === '0') {
        return {subjectName: "", description: ""};
    }
    try {
        const response = await getSubjectById(params.id);
        return response.data;
    } catch (error) {
        throw new Response("Error fetching subject data", {status: 500});
    }
};
