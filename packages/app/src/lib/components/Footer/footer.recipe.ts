import { sva } from 'styled-system/css';

export const footer = sva({
  className: 'Footer',
  slots: ['root', 'copyright', 'links'],
  base: {
    root: {
      alignItems: 'center',
      display: 'flex',
      h: 16,
      px: 10,
      justifyContent: 'space-between',
      mdDown: {
        flexDirection: 'column',
        gap: 4,
        h: 'auto',
      },
    },
    copyright: {
      fontFamily: 'NotoSansJP',
      fontSize: '0.75rem',
      fontWeight: 'normal',
      textAlign: 'center',
    },
    links: {
      display: 'flex',
      gap: '1rem',
    },
  },
});
