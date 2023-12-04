import { shadcnPlugin } from "./lib/shadcn-plugin";

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    './stories/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
	],
  plugins: [shadcnPlugin],
};

export default config;