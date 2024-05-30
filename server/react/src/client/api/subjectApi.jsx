import axios from '../axios';

export const fetchSubjects = async () => {
    try {
        const response = await axios.get('/subjects');
        return response.data;
    } catch (error) {
        console.error("An error occurred while retrieving data", error);
        throw error;
    }
};
