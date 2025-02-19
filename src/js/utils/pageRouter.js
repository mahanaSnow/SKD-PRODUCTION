import { initAllPage } from "../pages/all";
import { initHomePage } from "../pages/home";
import { initAboutPage } from "../pages/about";
import { initWorkPage } from "../pages/work";


export function initPageRouter() {
  const pageWrapper = document.querySelector("[data-page-name]");

  if (!pageWrapper) {
    console.warn("No data-page-name attribute found on the page wrapper.");
    return;
  }

  const pageName = pageWrapper.getAttribute("data-page-name");


  initAllPage();


  const pageStarters = {
    home: initHomePage,
    about: initAboutPage,
    work: initWorkPage,
  };

  const starterFunction = pageStarters[pageName];

  if (starterFunction) {
    starterFunction();
  } else {
    console.warn(`No specific animations found for page: ${pageName}`);
  }
}
