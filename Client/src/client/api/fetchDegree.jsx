import axios from '../axios';

export const FetchDegree = async (student, exam) => {
    try {
        const response = await axios.get(`/degrees/${student}/${exam}`);
        return response.data; 
    } catch (error) {
        console.error("An error occurred while fetching degree", error);
        throw error;
    }
};
