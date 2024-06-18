import axios from '../axios';

export const addDegree = async (student, exam, degree) => {
    try {
        const response = await axios.post(`/degrees`, { student, exam, degree });
        return response.data; 
    } catch (error) {
        console.error("An error occurred while adding degree", error);
        throw error;
    }
};
