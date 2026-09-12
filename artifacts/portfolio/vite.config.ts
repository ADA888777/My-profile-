import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// Port is optional and defaults to 3000.
const rawPort = process.env.PORT || "3000";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

// Base path is optional and defaults to the root "/".
const basePath = process.env.BASE_PATH || "/";
const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    // Dev-only helpers, kept out of production builds.
    ...(!isProduction ? [runtimeErrorOverlay()] : []),
    ...(!isProduction && process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) => m.devBanner()),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    target: "es2020",
    sourcemap: false,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        // Splits the single large bundle into long-lived cacheable chunks so a
        // content change no longer invalidates the whole vendor payload.
        manualChunks(id: string) {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("framer-motion") || id.includes("motion-dom") || id.includes("motion-utils")) {
            return "motion";
          }
          if (id.includes("react-dom") || id.includes("scheduler")) return "react";
          if (id.includes("@radix-ui")) return "radix";
          if (id.includes("lucide-react")) return "icons";
          if (id.includes("@tanstack")) return "query";
          return "vendor";
        },
      },
    },
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
