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

import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: "src",
  server: {
    cors: "*",
    hmr: {},
    allowedHosts: [
      "starter.ngrok.app" // Remplace par l'URL générée par Ngrok
    ],
  },
  build: {
    minify: true,
    outDir: "../src/dist",
    emptyOutDir: true,
    rollupOptions: {
      input: "/js/index.js",
      output: {
        format: "umd",
        entryFileNames: "index.js",
        compact: true,
      },
    },
  },
  envDir: "../",

  // Add alias for better path resolution
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Alias '@' maps to 'src'
      "@animations": path.resolve(__dirname, "src/js/animations"),
      "@components": path.resolve(__dirname, "src/js/components"),
      "@pages": path.resolve(__dirname, "src/js/pages"),
      "@utils": path.resolve(__dirname, "src/js/utils"),
    },
  },
});
