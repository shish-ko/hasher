import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ts_paths from "vite-tsconfig-paths";
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ts_paths(), svgr()],
});
