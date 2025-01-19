import { sva } from 'styled-system/css';

export const footerLink = sva({
  className: 'FooterLink',
  slots: ['root'],
  base: {
    root: {
      color: 'gray.400',
      _hover: {
        color: 'gray.950',
      },
      _focus: {
        color: 'gray.950',
        outline: 'none',
      },
    },
  },
});
