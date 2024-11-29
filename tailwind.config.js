/** @type {import('tailwindcss').Config} */
module.exports = {
  // Asegúrate de incluir todas las rutas donde tengas archivos de componentes o vistas
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./componentes/**/*.{js,jsx,ts,tsx}",
    "./app/(tabs)/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
