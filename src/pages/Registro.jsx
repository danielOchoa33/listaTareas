import { useState } from "react";
import { Link } from "react-router-dom";
import { showErrorNotification } from "../utils/messages";
import { registrarUsuario } from "../actions/axiosRequest";
import Spinner from "../components/SpinnerLoading/Spinner";

const Registro = () => {
  const [loadig, setLoading] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes("")) {
      showErrorNotification("todos los campos son requeridos.");
      return;
    }

    if (password !== repetirPassword) {
      showErrorNotification("Las contraseñas no coinciden.");
      return;
    }

    if (password.length < 6) {
      showErrorNotification(
        "La contraseña debe tener un minimo de 6 caracteres."
      );
      return;
    }

    try {
      setLoading(true);
      const crearUsuario = await registrarUsuario({
        method: "POST",
        url: "/users/add/user",
        data: {
          nombre: nombre,
          correo: email,
          password: password,
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));

      setNombre("");
      setEmail("");
      setPassword("");
      setRepetirPassword("");
      setLoading(false);
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      showErrorNotification(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center">
      <div className="md:w-2/3 lg:w-2/5 ">
        {loadig && <Spinner />}
        <h1 className=" text-5xl font-semibold capitalize">Crea Usuario</h1>

        <form
          className="my-1 bg-white shadow rounded-lg p-4"
          onSubmit={handleSubmit}
        >
          <div className="my-1">
            <label
              className="uppercase font-medium text-lg text-gray-500"
              htmlFor="nombre"
            >
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              placeholder="Tu Nombre"
              className="w-full mt-3 p-3 border rounded-xl font-medium text-lg text-black"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="my-1">
            <label
              className="uppercase font-medium text-lg text-gray-500"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email de Registro"
              className="w-full mt-3 p-3 border rounded-xl font-medium text-lg text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-1">
            <label
              className="uppercase font-medium text-lg text-gray-500"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password de Registro"
              className="w-full mt-3 p-3 border rounded-xl font-medium text-lg text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="my-1">
            <label
              className="uppercase font-medium text-lg text-gray-500"
              htmlFor="password2"
            >
              Repetir Password
            </label>
            <input
              id="password2"
              type="password"
              placeholder="Repetir tu Password"
              className="w-full mt-3 p-3 border rounded-xl font-medium text-lg text-black"
              value={repetirPassword}
              onChange={(e) => setRepetirPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Crear Cuenta"
            className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-2 rounded-xl bg-violet-500 text-white text-lg font-bold w-full"
          />
        </form>

        <nav className="lg:flex lg:justify-between">
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="/"
          >
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
        </nav>
      </div>
    </main>
  );
};

export default Registro;
