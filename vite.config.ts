import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@forms': path.resolve(__dirname, './src/forms'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@providers': path.resolve(__dirname, './src/providers'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@models': path.resolve(__dirname, './src/models'),
        },
    },
    plugins: [react()],
})
