import axios from '../axios';

export const register = async (name, email, password, age, imageFile) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('age', age);
  formData.append('image', imageFile);
  try {
    const response = await axios.post('/students', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};


export const login = async (email, password) => {
    const response = await axios.post(`/login`, { email, password });
    return response.data;
  };
