import React, { useState } from "react";

export const AgregarTarea = ({
  isShow = false,
  obtenerTarea,
  limpiarTarea,
}) => {
  const [tarea, setTarea] = useState({
    nombre: "",
    descripcion: "",
    prioridad: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setTarea((prevTarea) => ({
      ...prevTarea,
      [name]: value,
    }));

    obtenerTarea(tarea);
  };
  return (
    <div
      className={`flex justify-around bg-gray-50 p-2 mb-2 ${
        isShow ? "block" : "hidden"
      }`}
    >
      <div className="w-1/4 md:w-1/2 lg:w-1/4 px-2">
        <input
          name="nombre"
          type="text"
          placeholder="Nombre"
          className="w-full border-2 p-1 mt-1 bg-transparent   outline-none focus:ring-0 border-gray-100 rounded-xl"
          onChange={handleChange}
        />
      </div>
      <div className="w-1/4 md:w-1/2 lg:w-1/4 px-2">
        <input
          name="descripcion"
          type="text"
          placeholder="Descripcion"
          className="w-full border-2 p-1 mt-1 bg-transparent   outline-none focus:ring-0 border-gray-100 rounded-xl"
          onChange={handleChange}
        />
      </div>
      <div className="w-1/4 md:w-1/2 lg:w-1/4 px-2">
        <input
          name="prioridad"
          type="text"
          placeholder="Prioridad"
          className="w-full border-2 p-1 mt-1 bg-transparent   outline-none focus:ring-0 border-gray-100 rounded-xl"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
