import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://todo-list-backend-ku5w.onrender.com",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
