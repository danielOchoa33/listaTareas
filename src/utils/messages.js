import {  Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showSuccessNotification = (message) => {
    toast.success(message,{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
    });
  };
  
  export const showErrorNotification = (message) => {
    toast.error(message,{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
    });
  };
