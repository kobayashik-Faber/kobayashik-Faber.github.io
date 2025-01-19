import { sva } from 'styled-system/css';

export const logo = sva({
  className: 'Logo',
  slots: ['root'],
  base: {
    root: {
      fontFamily: 'Oswald',
      fontSize: '1.5rem',
      fontWeight: 'black',
      userSelect: 'none',
    },
  },
});
