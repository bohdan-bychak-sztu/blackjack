import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

const repoName = 'blackjack';
const isProduction = process.env.NODE_ENV === 'production';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: isProduction ? `/${repoName}/` : '/',
})
