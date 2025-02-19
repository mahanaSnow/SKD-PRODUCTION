import { initAllPage } from "../pages/all";
import { initHomePage } from "../pages/home";
import { initAboutPage } from "../pages/about";

// Initializes page-specific files based on the data-page-name attribute.

export function initPageRouter() {
  const pageWrapper = document.querySelector("[data-page-name]");

  if (!pageWrapper) {
    console.warn("No data-page-name attribute found on the page wrapper.");
    return;
  }

  const pageName = pageWrapper.getAttribute("data-page-name");

  // Initialise les animations globales pour toutes les pages
  import("../pages/all").then((module) => module.initAllPage());

  // Import dynamique basé sur `data-page-name`
  const pageStarters = {
    home: () => import(`../pages/${pageName}.js`).then((module) => module.initHomePage()),
    about: () => import(`../pages/${pageName}.js`).then((module) => module.initAboutPage()),
  };

  if (pageStarters[pageName]) {
    pageStarters[pageName]();
  } else {
    console.warn(`No specific animations found for page: ${pageName}`);
  }
}
