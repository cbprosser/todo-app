import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const port = +(env.VITE_BASE_PORT ?? 0);
  return {
    plugins: [react(), splitVendorChunkPlugin()],
    server: {
      host: env.VITE_BASE_HOST,
      port,
    },
  };
});
