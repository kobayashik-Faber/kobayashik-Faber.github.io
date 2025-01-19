import { sva } from 'styled-system/css';

export const globalNavigationItem = sva({
  className: 'GlobalNavigationItem',
  slots: ['root', 'text'],
  base: {
    root: {
      '& a': {
        _hover: {
          color: 'primary',
          cursor: 'pointer',
        },
        _focus: {
          color: 'primary',
          outline: 'none',
        },
      },
    },
    text: {
      fontFamily: 'Oswald',
      fontWeight: 'bold',
    },
  },
});
