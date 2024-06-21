import axiosInstance from './axiosInstance';

const EXAMS_URL = '/exams';

const getAllExams = async () => {
    try {
        const response = await axiosInstance.get(EXAMS_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching exams:', error);
        throw error;
    }
};

const getExamById = async (id) => {
    console.log(id)
    try {
        const response = await axiosInstance.get(`examsById/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching exam with id ${id}:`, error);
        throw error;
    }
};

const createExam = async (exam) => {
    try {
        const response = await axiosInstance.post(EXAMS_URL, exam);
        return response.data;
    } catch (error) {
        console.error('Error creating exam:', error);
        throw error;
    }
};

const updateExam = async (id, exam) => {
    try {
        const response = await axiosInstance.put(`${EXAMS_URL}/${id}`, exam);
        return response.data;
    } catch (error) {
        console.error(`Error updating exam with id ${id}:`, error);
        throw error;
    }
};

const deleteExam = async (id) => {
    try {
        const response = await axiosInstance.delete(`${EXAMS_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting exam with id ${id}:`, error);
        throw error;
    }
};

export {
    getAllExams,
    getExamById,
    createExam,
    updateExam,
    deleteExam
};