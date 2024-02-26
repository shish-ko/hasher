import { UserConfig, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ts_paths from "vite-tsconfig-paths";
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({command}) =>  {
  const config: UserConfig = {plugins: [react(), ts_paths(), svgr()]}
  if(command === 'build') {
    config.esbuild = {drop: ['console'] };
  }
  return config;
});
