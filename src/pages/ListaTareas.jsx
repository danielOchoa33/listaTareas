import React, { useCallback, useEffect, useState } from "react";
import {
  actualizarTask,
  agregarTareaAxios,
  obtenerListado,
} from "../actions/axiosRequest";
import Filtrado from "../../src/components/Filtrado/Filtrado";
import Spinner from "../../src/components/SpinnerLoading/Spinner";
import { useAuth } from "../Context/AuthContext";
import { FaCheck, FaHammer, FaTrash } from "react-icons/fa";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../utils/messages";
import { AgregarTarea } from "../components/RegistroTareas/AgregarTarea";

const ListadoTareas = () => {
  const { usuarioActual } = useAuth();
  const [listadoTarea, setListadoTarea] = useState([]);
  const [loadig, setLoading] = useState(false);
  const [isShowForm, setIsShowForm] = useState(false);
  const [tarea, setTarea] = useState({
    nombre: "",
    descripcion: "",
    prioridad: "",
  });
  const limpiarTarea = () => {
    setTarea({
      nombre: "",
      descripcion: "",
      prioridad: "",
    });
  };
  const listado = useCallback(async () => {
    const listado = await obtenerListado({
      method: "GET",
      url: `/tasks/getTask/${usuarioActual.id}`,
    });
    setListadoTarea(listado.data);
  }, []);

  useEffect(() => {
    listado();
  }, []);

  const actualizarTarea = async (idTarea, estatus) => {
    try {
      setLoading(true);
      const tarea = await actualizarTask({
        method: "PUT",
        url: `/tasks/update/task/${idTarea}/${estatus}`,
      });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      showSuccessNotification("La tarea se actualizó correctamente.");
      listado();
      setLoading(false);
    } catch (error) {
      showErrorNotification(error.response.data.message);
      setLoading(false);
    }
  };
  const obtenerTarea = (tarea) => {
    setTarea(tarea);
  };
  const agregarTarea = async () => {
    try {
      setLoading(true);
      obtenerTarea();
      const tareaAxios = agregarTareaAxios({
        method: "POST",
        url: `/tasks/add/task`,
        data: {
          nombre: tarea.nombre,
          descripcion: tarea.descripcion,
          prioridad: tarea.prioridad,
          userId: usuarioActual.id,
        },
      });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      showSuccessNotification("La tarea se agregó correctamente.");
      listado();
      setLoading(false);
      limpiarTarea();
      setIsShowForm(false);
    } catch (error) {
      showErrorNotification(error.response.data.message);
      setLoading(false);
      limpiarTarea();
    }
  };
  const onHandleButtonClick = (action, id) => {
    switch (action) {
      case "INICIAR":
        actualizarTarea(id, "INICIADA");
        break;

      case "ELIMINAR":
        actualizarTarea(id, "ELIMINADA");
        break;

      case "FINALIZAR":
        actualizarTarea(id, "FINALIZADA");
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex">
      {loadig && <Spinner />}
      <div className="p-5 h-screen bg-gray-100 w-full">
        <h1 className="text-xl mb-2 font-semibold">Listado de Tareas</h1>
        <div className="flex-grow overflow-hidden">
          <Filtrado setLoading={setLoading} setListado={setListadoTarea} />
          <div className="flex w-full justify-between">
            <div className="w-1/4 sm:w-1/5 md:w-1/4 lg:w-1/4 px-2 ">
              <button
                className="w-1/3 bg-blue-500 text-white p-2 rounded-xl flex justify-between"
                onClick={
                  isShowForm ? () => agregarTarea() : () => setIsShowForm(true)
                }
              >
                {isShowForm ? "Guardar" : "   Agregar Tarea"}
              </button>
            </div>
            <AgregarTarea isShow={isShowForm} obtenerTarea={obtenerTarea} />
          </div>
          <div className="overflow-auto  max-h-[calc(100vh-4rem)] rounded-lg shadow hidden md:block">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200 sticky top-0 z-10">
                <tr>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Nombre Tarea
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Descripcion
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Prioridad
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Estatus
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {listadoTarea.length !== 0 ? (
                  listadoTarea.map((tarea, index) => (
                    <tr
                      className="bg-white hover:bg-gray-200 cursor-pointer"
                      key={index}
                    >
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {tarea.nombre}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {tarea.descripcion}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {tarea.prioridad}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {tarea.estatus}
                      </td>
                      <td className="flex gap-2 p-3 text-sm text-gray-700 whitespace-nowrap">
                        <FaHammer
                          className="mr-2"
                          onClick={(e) => {
                            onHandleButtonClick("INICIAR", tarea.id);
                          }}
                          size={20}
                          color="blue"
                        />

                        <FaCheck
                          id="FINALIZAR"
                          className="mr-2"
                          onClick={(e) => {
                            onHandleButtonClick("FINALIZAR", tarea.id);
                          }}
                          size={20}
                          color="green"
                        />
                        <FaTrash
                          id="ELIMINAR"
                          className="mr-2"
                          onClick={(e) => {
                            onHandleButtonClick("ELIMINAR", tarea.id);
                          }}
                          size={20}
                          color="red"
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="p-3 text-sm text-gray-700 text-center"
                    >
                      Listado Vacio.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 h-screen sm:grid-cols-1 gap-4 md:hidden ">
          <div className="flex-grow">
            <div className="overflow-auto max-h-[calc(100vh-4rem)]">
              {listadoTarea.map((tarea) => (
                <div className="bg-white space-y-3 p-4 m-2 rounded-lg shadow hover:bg-slate-100 cursor-pointer">
                  <div className="flex items-center space-x-2 text-sm p-2 uppercase">
                    <div className="text-gray-400 font-semibold">
                      {tarea.nombre}
                    </div>
                    <div className="text-gray-400 font-semibold">
                      {tarea.prioridad}
                    </div>
                    <div className="w-1/4 p-1.5 text-xs font-medium tracking-wide text-gray-500 bg-green-500 rounded-lg bg-opacity-30 ">
                      {tarea.estatus}
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="text-black-400 font-semibold">
                      {tarea.descripcion}
                    </div>
                  </div>
                  <div className="p-2 flex">
                    <FaHammer
                      className="mr-2"
                      onClick={(e) => {
                        onHandleButtonClick("INICIAR", tarea.id);
                      }}
                      size={20}
                      color="blue"
                    />

                    <FaCheck
                      id="FINALIZAR"
                      className="mr-2"
                      onClick={(e) => {
                        onHandleButtonClick("FINALIZAR", tarea.id);
                      }}
                      size={20}
                      color="green"
                    />
                    <FaTrash
                      id="ELIMINAR"
                      className="mr-2"
                      onClick={(e) => {
                        onHandleButtonClick("ELIMINAR", tarea.id);
                      }}
                      size={20}
                      color="red"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListadoTareas;
