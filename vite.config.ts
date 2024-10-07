import { defineConfig } from 'vite'
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      entry: './lib/index.ts',
      name: 'wasm-test',
      fileName: "index",
      formats: ["es", "umd"],
    },
    assetsDir: "assets-wasm-test",
  }
})
