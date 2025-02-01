// export default {
//   root: "src",
//   server: {
//     cors: "*",
//     hmr: {},
//   },
//   build: {
//     minify: true,
//     outDir: "../src/dist",
//     emptyOutDir: true,
//     rollupOptions: {
//       input: "/js/index.js",
//       output: {
//         format: "umd",
//         entryFileNames: "index.js",
//         compact: true,
//       },
//     },
//   },
//   envDir: "../",
// };

export default defineConfig({
  root: "src",
  server: {
    cors: "*",
    hmr: {},
    allowedHosts: [
      "starter.ngrok.app"
    ],
  },
  build: {
    minify: true,
    outDir: "../src/dist",
    emptyOutDir: true,
    rollupOptions: {
      input: "/js/index.js",
      output: {
        format: "iife",  // Changé de "umd" à "iife"
        entryFileNames: "index.js",
        compact: true,
        name: 'SKDProduction'  // Ajouté - nom de votre bundle global
      },
    },
  },
  envDir: "../",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@animations": path.resolve(__dirname, "src/js/animations"),
      "@components": path.resolve(__dirname, "src/js/components"),
      "@pages": path.resolve(__dirname, "src/js/pages"),
      "@utils": path.resolve(__dirname, "src/js/utils"),
    },
  },
});
