import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 4200,
		proxy: {
			'/api': {
				target: 'http://localhost:3000', // Adjust to match your backend URL
				changeOrigin: true,
				secure: false, // Set to false if using self-signed SSL certs
				rewrite: (path) => path.replace(/^\/api/, '/api'), // Ensures the path remains intact
			},
		},
	},
	resolve: {
		alias: {
			'#root': path.resolve(__dirname),
			'#client': path.resolve(__dirname, 'src'),
		},
	},
})
