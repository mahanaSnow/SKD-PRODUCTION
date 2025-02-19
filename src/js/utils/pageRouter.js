export function initPageRouter() {
  const pageWrapper = document.querySelector("[data-page-name]");

  if (!pageWrapper) {
    console.warn("No data-page-name attribute found on the page wrapper.");
    return;
  }

  const pageName = pageWrapper.getAttribute("data-page-name");

  // Charger les animations globales (si besoin)
  import("../pages/all/index.js")
    .then((module) => module.initAllPage())
    .catch((err) => console.error("Error loading global animations:", err));

  // Import dynamique basé sur `data-page-name`
  const pageStarters = {
    home: () =>
      import("../pages/home/index.js")
        .then((module) => module.initHomePage())
        .catch((err) => console.error("Error loading Home page:", err)),

    about: () =>
      import("../pages/about/index.js")
        .then((module) => module.initAboutPage())
        .catch((err) => console.error("Error loading About page:", err)),
  };

  if (pageStarters[pageName]) {
    pageStarters[pageName]();
  } else {
    console.warn(`No specific animations found for page: ${pageName}`);
  }
}
