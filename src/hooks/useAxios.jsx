import {useEffect } from 'react';
import axios from 'axios'
import useAuth from './useAuth';


const axiosSecure = axios.create({
    baseURL: 'https://todo-list-backend-ku5w.onrender.com',
    withCredentials: true,
})
const useAxios = () => {
        const  auth = useAuth()
    

 useEffect(()=>{

    axiosSecure.interceptors.response.use(response=>{
        return response
}, error=>{
    if(error.response.status === 401){
        auth?.logout()
        .then(()=>{
            auth?.setLoading(false)
        })
    }
    return Promise.reject(error)
})

 },[])

    return axiosSecure
};

export default useAxios;