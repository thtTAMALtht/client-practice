import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecureHook = () => {
    instance.interceptors.request.use((config)=>{
        return config;
    })
    return instance;
};

export default useAxiosSecureHook;
