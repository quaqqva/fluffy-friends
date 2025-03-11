import { definePreset } from '@primeng/themes';

export const appTheme = definePreset({
  semantic: {
    primary: {
      50: '#FFEBE5',
      100: '#FFD3C2',
      200: '#FFB5A3',
      300: '#FF9783',
      400: '#FF7A64',
      500: '#FFE1DA',
      600: '#E6C8C4',
      700: '#CCAFAE',
      800: '#B39698',
      900: '#997D82',
      950: '#80646C',
    },
    surface: {
      50: '#D6EBFA',
      100: '#BFE0F8',
      200: '#A5D3F5',
      300: '#8AC0F3',
      400: '#74B3EE',
      500: '#5EA7EA',
      600: '#4D98D6',
      700: '#3E89C2',
      800: '#2F7AAE',
      900: '#226B9A',
      950: '#155C86',
    },
    colorScheme: {
      light: {
        primary: {
          color: '#FFE1DA',
          inverseColor: '#3E3E3E',
          hoverColor: '#FFB5A3',
          activeColor: '#FF9783',
        },
        highlight: {
          background: '#FFE1DA',
          focusBackground: '#FF7A64',
          color: '#3E3E3E',
          focusColor: '#3E3E3E',
        },
      },
      dark: {
        primary: {
          color: '#8AC0F3',
          inverseColor: '#3E3E3E',
          hoverColor: '#5EA7EA',
          activeColor: '#4D98D6',
        },
        highlight: {
          background: 'rgba(138, 192, 243, .16)',
          focusBackground: 'rgba(138, 192, 243, .24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)',
        },
      },
    },
  },
});
