import axiosInstance from './axiosInstance';

const SUBJECTS_URL = '/subjects';

const getAllSubjects = async () => {
    try {
        const response = await axiosInstance.get(SUBJECTS_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching subjects:', error);
        throw error;
    }
};

const getSubjectById = async (id) => {
    try {
        const response = await axiosInstance.get(`${SUBJECTS_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching subject with id ${id}:`, error);
        throw error;
    }
};

const createSubject = async (subject) => {
    try {
        const response = await axiosInstance.post(SUBJECTS_URL, subject);
        return response.data;
    } catch (error) {
        console.error('Error creating subject:', error);
        throw error;
    }
};

const updateSubject = async (id, subject) => {
    try {
        const response = await axiosInstance.put(`${SUBJECTS_URL}/${id}`, subject);
        return response.data;
    } catch (error) {
        console.error(`Error updating subject with id ${id}:`, error);
        throw error;
    }
};

const deleteSubject = async (id) => {
    try {
        const response = await axiosInstance.delete(`${SUBJECTS_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting subject with id ${id}:`, error);
        throw error;
    }
};

export {
    getAllSubjects,
    getSubjectById,
    createSubject,
    updateSubject,
    deleteSubject
};