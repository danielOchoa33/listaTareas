import axios from "axios"
import { isExpired } from "react-jwt";
const baseUrl = 'http://localhost:3001/api';

async function axiosRequest({ method, url, data }) {
    try {
      let token = localStorage.getItem("token");
      if(isExpired(token)){
        const refreshToken = await axios({
          method:'POST',
          url:baseUrl + "/auth/refresh",
          data:{},
          headers:{
            Authorization:token
          }
          
        })
        localStorage.setItem('token',refreshToken.data.token);
         token = refreshToken.data.token;
      }
      const response = await axios({
        method,
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data
      });
  
      return response; 
    } catch (error) {
      throw error;
    }
  }

  export async function login({ method, url, data }) {
    try {
      const response = await axiosRequest({
        method,
        url:baseUrl + url,
        data
      });
  
      return response; 
    } catch (error) {
      throw error;
    }
  }

  export async function registrarUsuario({ method, url, data }) {
    try {
      const response = await axiosRequest({
        method,
        url:baseUrl + url,
        data
      });
  
      return response; 
    } catch (error) {
      throw error;
    }
  }


  export async function obtenerListado({ method, url, data }) {
    try {
      const response = await axiosRequest({
        method,
        url:baseUrl + url,
        data
      });
  
      return response; 
    } catch (error) {
      throw error;
    }
  }

  export async function filtrarTareas({ method, url, data }) {
    try {
      const response = await axiosRequest({
        method,
        url:baseUrl + url,
        data
      });
  
      return response; 
    } catch (error) {
      throw error;
    }
  }

  export async function actualizarTask({ method, url, data }) {
    try {
      const response = await axiosRequest({
        method,
        url:baseUrl + url,
        data
      });
  
      return response; 
    } catch (error) {
      throw error;
    }
  }

  export async function agregarTareaAxios({ method, url, data }) {
    try {
      const response = await axiosRequest({
        method,
        url:baseUrl + url,
        data
      });
  
      return response; 
    } catch (error) {
      throw error;
    }
  }
  
  
