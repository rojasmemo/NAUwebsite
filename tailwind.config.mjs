/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';
import aspectRatio from '@tailwindcss/aspect-ratio';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // Paleta de colores correcta del proyecto original
      colors: {
        'custom-light-teal': '#3dcad8',
        'custom-medium-teal': '#4F98A2',
        'custom-dark-teal': '#1E606A',
        'custom-darker-teal': '#143946',
        'custom-specific-blue': '#005366',
        'custom-hover-teal': '#d1e3e5',
        'custom-pale-teal': '#b3dddd',
        'custom-frosty-teal': '#e6efef',
        'custom-gray-blue': '#CAD4E0',
      },
      // Familia de fuentes correcta, con fallbacks del sistema
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      // Breakpoints personalizados
      screens: {
        'bp601': '601px',
        'bp1201': '1201px',
      },
    },
  },
  plugins: [typography, forms, aspectRatio],
};