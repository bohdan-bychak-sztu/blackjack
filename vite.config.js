import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => { // 👈 Передаємо { mode }
    const repoName = 'blackjack';
    const isProduction = mode === 'production';

    return {
        plugins: [react()],
        base: isProduction ? `/${repoName}/` : '/',
    };
});