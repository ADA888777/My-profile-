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

// Groups third-party code into a few long-lived chunks instead of one large
// bundle, so a content change no longer invalidates the whole vendor payload.
const VENDOR_GROUPS: Array<[string, RegExp]> = [
  ["react", /node_modules\/(react|react-dom|scheduler)\//],
  ["motion", /node_modules\/(framer-motion|motion-dom|motion-utils)\//],
  ["radix", /node_modules\/@radix-ui\//],
  ["icons", /node_modules\/lucide-react\//],
  ["query", /node_modules\/@tanstack\//],
];

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
        manualChunks(id: string) {
          const normalized = id.split(path.sep).join("/");
          if (!normalized.includes("node_modules")) return undefined;
          for (const [name, pattern] of VENDOR_GROUPS) {
            if (pattern.test(normalized)) return name;
          }
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
