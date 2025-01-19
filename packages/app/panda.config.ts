import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,ts,svelte}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          primary: {
            value: '#89ff14',
          },
        },
        fonts: {
          NotoSansJP: {
            value: "'Noto Sans JP Variable', sans-serif",
          },
          Oswald: {
            value: 'Oswald, sans-serif',
          },
        },
      },
    },
  },

  globalCss: {
    'html, body': {
      fontFamily: "'Noto Sans JP Variable', sans-serif",
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',
});
