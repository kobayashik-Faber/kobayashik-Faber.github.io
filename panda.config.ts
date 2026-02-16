import {defineConfig} from '@pandacss/dev';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx,svelte}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          black: {value: '#000000'},
          charcoal: {value: '#0a0a0a'},
          darkGrey: {value: '#1a1a1a'},
          white: {value: '#ffffff'},
          lightGrey: {value: '#f0f0f0'},
          mediumGrey: {value: '#cccccc'},
          accentRed: {value: '#8b0000'},
          accentGrey: {value: '#666666'},
        },
        fonts: {
          primary: {value: 'Inter, "Helvetica Neue", Arial, sans-serif'},
          mono: {value: '"SF Mono", Monaco, monospace'},
        },
        fontSizes: {
          xs: {value: '0.75rem'},
          sm: {value: '0.875rem'},
          base: {value: '1rem'},
          lg: {value: '1.125rem'},
          xl: {value: '1.25rem'},
          '2xl': {value: '1.5rem'},
          '3xl': {value: '1.875rem'},
          '4xl': {value: '2.25rem'},
          '5xl': {value: '3rem'},
        },
        lineHeights: {
          tight: {value: '1.25'},
          normal: {value: '1.5'},
          loose: {value: '1.75'},
        },
        letterSpacings: {
          tight: {value: '-0.025em'},
          normal: {value: '0'},
          wide: {value: '0.025em'},
        },
        spacing: {
          xs: {value: '0.25rem'},
          sm: {value: '0.5rem'},
          md: {value: '1rem'},
          lg: {value: '1.5rem'},
          xl: {value: '2rem'},
          '2xl': {value: '3rem'},
          '3xl': {value: '4rem'},
          '4xl': {value: '6rem'},
          '5xl': {value: '8rem'},
        },
      },
      breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',
});
