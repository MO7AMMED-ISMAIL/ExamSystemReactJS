import axios from '../axios';

export const fetchExamsById = async (subjectId) => {
    try {
        const response = await axios.get(`/exams/subject/${subjectId}`);
        return response.data.data;
    } catch (error) {
        console.error("An error occurred while retrieving data", error);
        throw error;
    }
};

export const fetchExamById = async (examId) => {
    try {
        const response = await axios.get(`/exams/${examId}`);
        return response.data.data;
    } catch (error) {
        console.error("An error occurred while retrieving data", error);
        throw error;
    }
};


