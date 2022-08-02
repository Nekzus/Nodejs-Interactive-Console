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

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
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
    console.log();
    this.listadoArr.forEach((tarea, i) => {
      const idx = `${i + 1}.`.green;
      const { completadoEn, desc } = tarea;
      const estado = completadoEn ? completadoEn.green : "Pendiente".red;
      console.log(`${idx} ${desc} :: ${estado}`);
    });
  }

  listarPendientesCompletadas(completadas = true) {
    console.log();
    let idx = 0;
    this.listadoArr.forEach((tarea) => {
      const { completadoEn, desc } = tarea;
      const estado = completadoEn ? completadoEn.green : "Pendiente".red;
      if (completadas) {
        //mostrar tareas completadas
        if (completadoEn) {
          idx += 1;
          console.log(`${(idx + ".").green} ${desc} :: ${estado}`);
        }
      } else {
        // mostrar tareas pendientes
        if (!completadoEn) {
          idx += 1;
          console.log(`${(idx + ".").green} ${desc} :: ${estado}`);
        }
      }
    });
  }
  toggleCompletadas(ids = "") {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });
    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

export default Tareas;
