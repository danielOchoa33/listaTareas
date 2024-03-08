import React, { useState } from "react";
import { filtrarTareas } from "../../actions/axiosRequest";
import { showErrorNotification } from "../../utils/messages";
import { Search } from "lucide-react";
import { useAuth } from "../../Context/AuthContext";

const Filtrado = ({ setLoading, setListado }) => {
  const { usuarioActual } = useAuth();
  const [filtros, setFiltros] = useState({
    nombre: "",
    prioridad: "",
    estatus: "",
  });

  const handleFiltros = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFiltros((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const buscarPiezas = async () => {
    const { nombre, prioridad, estatus } = filtros;
    try {
      setLoading(true);
      const listado = await filtrarTareas({
        method: "POST",
        url: `/tasks/search/task/${usuarioActual.id}`,
        data: {
          nombre: nombre,
          prioridad: prioridad,
          estatus: estatus,
        },
      });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setListado(listado.data);
      if (listado.data.length === 0)
        showErrorNotification("No se entrontaron tareas.");
      setLoading(false);
    } catch (error) {
      showErrorNotification(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-around bg-gray-50 p-2 mb-2">
      <div className="w-1/4 md:w-1/2 lg:w-1/4 px-2">
        <input
          name="nombre"
          type="text"
          placeholder="Nombre"
          className="w-full border-2 p-1 mt-1 bg-transparent   outline-none focus:ring-0 border-gray-100 rounded-xl"
          onChange={handleFiltros}
        />
      </div>
      <div className="w-1/4 md:w-1/2 lg:w-1/4 px-2">
        <input
          name="prioridad"
          type="text"
          placeholder="Prioridad"
          className="w-full border-2 p-1 mt-1 bg-transparent   outline-none focus:ring-0 border-gray-100 rounded-xl"
          onChange={handleFiltros}
        />
      </div>
      <div className="w-1/4 md:w-1/2 lg:w-1/4 px-2">
        <input
          name="estatus"
          type="text"
          placeholder="Estatus"
          className="w-full border-2 p-1 mt-1 bg-transparent   outline-none focus:ring-0 border-gray-100 rounded-xl"
          onChange={handleFiltros}
        />
      </div>
      <div className="w-1/4 sm:w-1/5 md:w-1/4 lg:w-1/4 px-2">
        <button
          className="w-full bg-blue-500 text-white p-2 rounded-xl flex justify-between"
          onClick={buscarPiezas}
        >
          Buscar
          <Search />
        </button>
      </div>
    </div>
  );
};

export default Filtrado;
