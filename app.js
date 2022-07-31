import { inquirerMenu, pausa } from "./helpers/inquirer.js";
import colors from "colors";

console.clear();
const main = async () => {
  let opt = "";
  do {
    opt = await inquirerMenu();
    console.log({ opt });
    await pausa();
  } while (opt !== "0");
};

main();
