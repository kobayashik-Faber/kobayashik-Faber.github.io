import { sva } from 'styled-system/css';

export const header = sva({
  className: 'Header',
  slots: ['root', 'menu'],
  base: {
    root: {
      alignItems: 'center',
      display: 'flex',
      h: 20,
      justifyContent: 'space-between',
      px: {
        md: 10,
        mdDown: 5,
      },
    },
    menu: {
      '& ul': {
        alignItems: 'center',
        display: 'flex',
        fontFamily: 'Oswald',
        gap: '1rem',
      },
      fontWeight: 'bold',
    },
  },
});
