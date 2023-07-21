import React, { useState, useEffect } from "react";
import "../estilos/listadetareas.css";
import Tarea from "./Tarea";
import Tareainput from "./Tareainput";

const TASK_KEY = "tasks";

function Listadetareas() {
  const [tareas, setTareas] = useState(
    []
  ); /*Inicialmente tarea es un arreglo vacio, y se va a ir agregando cada tarea*/

  useEffect(() => {
    obtenerTareasGuardadas();
  }, []);

  const agregarTarea = (tarea) => {
    if (tarea.texto !== "") {
      // verificamos que la cadena no este vacia.
      tarea.texto = tarea.texto.trim(); // trim es un metodo que nos permite quitar los espacios del principio o del final de la cadena de texto
      const tareasActualizadas = [tarea, ...tareas]; // cuando agregamos tarea nueva  va a ir en la primera linea, y con spread operator tomamos todas las anteriores, las convertimos a objetos individuales del arreglo.
      setTareas(tareasActualizadas); //actualizamos el estado.

      localStorage.setItem(TASK_KEY, JSON.stringify(tareasActualizadas));

    
    }
  };

  const eliminarTarea = (id) => {
    const tareasActualizadas = tareas.filter((tarea) => tarea.id !== id);
    setTareas(tareasActualizadas);

    localStorage.setItem(TASK_KEY, JSON.stringify(tareasActualizadas));
  };

  const completarTarea = (id) => {
    const tareasActualizadas = tareas.map((tarea) => {
      if (tarea.id == id) {
        tarea.completada = !tarea.completada;
      }
      return tarea;
    });
    setTareas(tareasActualizadas);

    localStorage.setItem(TASK_KEY, JSON.stringify(tareasActualizadas));
  };

  const obtenerTareasGuardadas = () => {
    const tareasGuardadas = localStorage.getItem(TASK_KEY);
    let tareasGuardadasParseadas = JSON.parse(tareasGuardadas);
    if (tareasGuardadasParseadas) {
      setTareas(tareasGuardadasParseadas);
    }
    return tareasGuardadasParseadas ? tareasGuardadasParseadas : [];
  };

  return (
    <>
      <Tareainput onSubmit={agregarTarea} />

      <div className="tareas-lista-contenedor">
        {tareas.map((tarea) => (
          <Tarea
            key={tarea.id} //key no se pasa como un props,no podemos acceder a el, por eso repetimos abajo con id.
            id={tarea.id}
            texto={tarea.texto}
            completada={tarea.completada}
            eliminarTarea={eliminarTarea} //props y funciones de Tarea
            completarTarea={completarTarea}
          />
        ))}
      </div>
    </>
  );
}
export default Listadetareas;
