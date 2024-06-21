import {getExamById} from "../services/examService";

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
        return {examName: "", description: ""}; // New exam
    }
    try {
        const response = await getExamById(params.id);
        return response.data;
    } catch (error) {
        throw new Response("Error fetching exam data", {status: 500});
    }
};