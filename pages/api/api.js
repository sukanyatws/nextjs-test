import React from 'react';
import axios from 'axios';

const postLoginRequest = async (req) => {
  try {
    const response = await axios.post(`https://reqres.in/api/login`, req);
    return response.data;
  } catch (error) {
    console.error('Error during login request:', error.response ? error.response.data : error.message);
    return { success: false, message: 'Login failed' }; 
  }
};

const postRegisterRequest = async (req) => {
  try {
    const response = await axios.post(`https://reqres.in/api/register`, req);
    return response.data;
  } catch (error) {
    console.error('Error during Register request:', error.response ? error.response.data : error.message);
    return { success: false, message: 'Register failed' }; 
  }
};

const getListUser = async (req) => {
  try {
    const response = await axios.get(`https://reqres.in/api/users?page=2`, req);
    return response.data; 
  } catch (error) {
    console.error('Error can not get data:', error.response ? error.response.data : error.message);
    return { success: false, message: response.code };
  }
};

const deleteListUser = async (req) => {
  try {
    const response = await axios.delete(`https://reqres.in/api/users?page=2`, req);
    return response.data; 
  } catch (error) {
    console.error('Error can not delete data:', error.response ? error.response.data : error.message);
    return { success: false, message: response.code };
  }
};

const putListUser = async (req) => {
  try {
    const response = await axios.put(`https://reqres.in/api/users/2`, req);
    return response.data; 
  } catch (error) {
    console.error('Error can not get data:', error.response ? error.response.data : error.message);
    return { success: false, message: response.code };
  }
};
  
  export {
    postLoginRequest,
    getListUser,
    postRegisterRequest,
    putListUser,
    deleteListUser
  };
