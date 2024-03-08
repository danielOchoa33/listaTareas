import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from "../../actions/axiosRequest";
import { useNavigate } from "react-router-dom";
import Spinner from "../SpinnerLoading/Spinner";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../../utils/messages";
import { useAuth } from "../../Context/AuthContext";

const FormLogin = () => {
  const { setUsuarioActual } = useAuth();
  const navigate = useNavigate();
  const [loadig, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [recordarUsuario, setRecordarUsuario] = useState(false);
  const [credenciales, setCredenciales] = useState({
    correo: "",
    password: "",
  });

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("recordarUsuario");

    if (usuarioGuardado) {
      const { correo: correoGuardado, password: passwordGuardada } =
        JSON.parse(usuarioGuardado);
      setRecordarUsuario(true);
      setCredenciales({ correo: correoGuardado, password: passwordGuardada });
    }
  }, []);

  const handleChangeCheckbox = () => {
    setRecordarUsuario(!recordarUsuario);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const limpiarForm = () => {
    setCredenciales({
      correo: "",
      password: "",
    });
  };

  const handleCredentials = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCredenciales((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const inicioSe = async () => {
    try {
      setLoading(true);
      const responseData = await login({
        method: "POST",
        url: "/auth/login",
        data: {
          correo: credenciales.correo,
          password: credenciales.password,
        },
      });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (responseData.data) {
        localStorage.setItem("token", responseData.data.token);
        setUsuarioActual(responseData.data);
        const { nombre } = responseData.data;
        showSuccessNotification(`Bienvenido ${nombre}`);
        if (recordarUsuario) {
          localStorage.setItem("recordarUsuario", JSON.stringify(credenciales));
        } else {
          localStorage.removeItem("recordarUsuario");
        }
        navigate("listaTareas");
        limpiarForm();
        setLoading(false);
      }
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      showErrorNotification(error.response.data.message);
      limpiarForm();
      setLoading(false);
    }
  };

  return (
    <div className="bg-white px-10 py-8 rounded-3xl border-2 border-gray-100 mt-3">
      {loadig && <Spinner />}
      <h1 className="text-5xl font-semibold">Bienvenido</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Bienvenido, Por favor ingresa tus datos.
      </p>
      <div className="mt-8">
        <div>
          <label htmlFor="correo" className="text-lg font-medium">
            Correo
          </label>
          <input
            id="correo"
            name="correo"
            className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent   outline-none focus:ring-0"
            placeholder="Ingresa tu Correo"
            value={credenciales.correo}
            onChange={handleCredentials}
          />
        </div>

        <div>
          <label htmlFor="contraseña" className="text-lg font-medium">
            Contraseña
          </label>
          <div className="w-full border-2 flex justify-between border-gray-100 rounded-xl p-3 mt-1 bg-transparent">
            <input
              id="contraseña"
              className="border-none  outline-none focus:ring-0 w-11/12"
              placeholder="Ingresa tu Contraseña"
              type={showPassword ? "text" : "password"}
              name="password"
              value={credenciales.password}
              onChange={handleCredentials}
            />
            <span
              className="mt-1 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <div className="mt-8  justify-between items-center">
          <div>
            <input
              type="checkbox"
              id="recordar"
              checked={recordarUsuario}
              onChange={handleChangeCheckbox}
            />
            <label htmlFor="recordar" className="ml-2 font-medium text-base">
              Recordar mi usuario
            </label>
          </div>
        </div>
        <div className="mt-8 w-full">
          <button
            onClick={() => inicioSe()}
            className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-2 rounded-xl bg-violet-500 text-white text-lg font-bold w-full"
          >
            Iniciar sesion
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
