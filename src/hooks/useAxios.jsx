import React from 'react';
import axios from 'axios'

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
})
const useAxios = () => {
    return axiosSecure
};

export default useAxios;