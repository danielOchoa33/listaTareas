import React from "react";
import FormLogin from "./FormLogin";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="w-full h-screen bg-gray-100">
      <div className="w-full flex items-center justify-center mt-5">
        <FormLogin />
      </div>
      <div>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/registro"
        >
          ¿No tienes una cuenta? Crear cuenta
        </Link>
      </div>
    </div>
  );
};
export default Login;
