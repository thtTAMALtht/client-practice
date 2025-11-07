import axios from "axios";
import { use, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const { user ,logOut} = use(AuthContext);
  const navigate = useNavigate()

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use((config) => {
      config.headers.authorization = `Bearer ${user.accessToken}`;
      return config;
    });

    const responseInterceptor=instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        const status = err.status;
        if(status === 401 || status === 403){
            logOut()
            .then(()=>{
                navigate("/register")
            })
        }
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.request.eject(responseInterceptor);
    };
  }, [user,navigate,logOut]);

  return instance;
};

export default useAxiosSecure;
