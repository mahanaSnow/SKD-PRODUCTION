// main entry point (e.g., src/js/index.js)
import "../styles/index.css";
import { initPageRouter } from "./utils/pageRouter.js";

// 🔥 Exécute le router pour charger le bon fichier selon la page
initPageRouter();
