import Tarea from "./tarea.js";
import colors from "colors";

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    let i = 0;
    this.listadoArr.forEach((tarea) => {
      console.log(
        `${colors.green(i++)}${".".green} ${tarea.desc} :: ${
          tarea.completadoEn ? colors.green("✓") : colors.red("X")
        }`
      );
    });
  }
}

export default Tareas;
