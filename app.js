import colors from "colors";
import { guardarDB, leerDB } from "./helpers/guardarArchivo.js";
import { inquirerMenu, leerInput, pausa } from "./helpers/inquirer.js";
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
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== "0");
};

main();
