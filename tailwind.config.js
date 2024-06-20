/** @type {import('tailwindcss').Config} */
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    viteCommonjs(),
  ],
}
