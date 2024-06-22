import axiosInstance from './axiosInstance';

const DEGREES_URL = '/degrees';

const getAllDegrees = async () => {
    try {
        const response = await axiosInstance.get(DEGREES_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching degrees:', error);
        throw error;
    }
};

export {
    getAllDegrees,
};