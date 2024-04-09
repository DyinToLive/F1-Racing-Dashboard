import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        // split vendor code into separate chunks
                        return 'vendor';
                    }
                }
            }
        },
        chunkSizeWarningLimit: 600, // Adjust the chunk size warning limit (in KB)
    },
});