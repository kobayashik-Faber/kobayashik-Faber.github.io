import { sva } from 'styled-system/css';

export const globalNavigation = sva({
  className: 'GlobalNavigation',
  slots: ['root', 'menu', 'toggle', 'icon', 'button'],
  base: {
    root: {
      pos: 'relative',
      '& nav': {
        mdDown: {
          display: 'none',
        },
      },
    },
    menu: {
      alignItems: 'center',
      display: 'flex',
      gap: '2rem',
    },
    toggle: {
      display: 'none',
    },
  },
});
