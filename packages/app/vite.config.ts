import type { UserConfig } from 'vite';
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
  let config: UserConfig = {
    plugins: [sveltekit()],

    test: {
      include: ['src/**/*.{test,spec}.{js,ts}'],
    },

    server: {
      fs: {
        allow: ['styled-system'],
      },
    },
  };

  switch (mode) {
    case 'analyze':
      {
        config = {
          ...config,
          plugins: config.plugins?.concat([
            visualizer({
              emitFile: true,
              filename: 'stats.html',
            }),
          ]),
          build: {
            minify: false,
          },
        };
      }
      break;
  }

  return config;
});
