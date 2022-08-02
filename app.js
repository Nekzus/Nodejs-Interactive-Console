import colors from "colors";
import { guardarDB, leerDB } from "./helpers/guardarArchivo.js";
import {
  confirmar,
  inquirerMenu,
  leerInput,
  listadoTareasBorrar,
  mostrarListadoChecklist,
  pausa,
} from "./helpers/inquirer.js";
import Tareas from "./models/tareas.js";

const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareasDB = leerDB();
  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }
  do {
    // Imprimir el menu
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        // Crear opcion
        const desc = await leerInput("Descripción:");
        tareas.crearTarea(desc);
        break;
      case "2":
        // Listar opcion
        tareas.listadoCompleto();
        break;
      case "3":
        // Listar completadas
        tareas.listarPendientesCompletadas(true);
        break;
      case "4":
        // Listar pendientes
        tareas.listarPendientesCompletadas(false);
        break;
      case "5":
        // Completar tarea(s)
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;
      case "6":
        // Borrar
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== "0") {
          const ok = await confirmar(`¿Está seguro?`);
          if (ok) {
            tareas.borrarTarea(id);
            console.log();
            console.log("    Tarea borrada".cyan);
          }
        }
        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== "0");
};

main();
