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

  // Initialize general animations for all pages
  initAllPage();

  // Mapping of page names to their respective starter functions
  const pageStarters = {
    home: initHomePage,
    about: initAboutPage,
    // Add additional page starters here
  };

  const starterFunction = pageStarters[pageName];

  if (starterFunction) {
    starterFunction();
  } else {
    console.warn(`No specific animations found for page: ${pageName}`);
  }
}
