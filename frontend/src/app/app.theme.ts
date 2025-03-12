import { definePreset } from '@primeng/themes';

export const appTheme = definePreset({
  semantic: {
    primary: {
      50: '#FFFBF0',
      100: '#FFF9E2',
      200: '#FFF7D4',
      300: '#FFF5C6',
      400: '#FFF3B8',
      500: '#FFF6C9',
      600: '#E6D0B4',
      700: '#CCBA9F',
      800: '#B3A58A',
      900: '#998F75',
      950: '#807960',
    },
    surface: {
      50: '#F5F5F5',
      100: '#EDEDED',
      200: '#E5E5E5',
      300: '#DDDDDD',
      400: '#D5D5D5',
      500: '#D9D9D9',
      600: '#C3C3C3',
      700: '#ADADAD',
      800: '#979797',
      900: '#818181',
      950: '#6B6B6B',
    },
    secondary: {
      50: '#E3F0FC',
      100: '#C9E2FB',
      200: '#AFCFF8',
      300: '#95BCF6',
      400: '#7BA9F4',
      500: '#8AC0F3',
      600: '#7AB0E3',
      700: '#6AA0D3',
      800: '#5A90C3',
      900: '#4A80B3',
      950: '#3A70A3',
    },
    accent: {
      50: '#FFFBF0',
      100: '#FFF9E2',
      200: '#FFF7D4',
      300: '#FFF5C6',
      400: '#FFF3B8',
      500: '#FFF6C9',
      600: '#E6D0B4',
      700: '#CCBA9F',
      800: '#B3A58A',
      900: '#998F75',
      950: '#807960',
    },
    text: '#3e3e3e',
    colorScheme: {
      light: {
        primary: {
          color: '{text}',
          inverseColor: '${surface.50}',
          hoverColor: '${accent.300}',
          activeColor: '${accent.400}',
        },
        highlight: {
          background: '#FFF6C9',
          focusBackground: '#FFF3B8',
          color: '#3E3E3E',
          focusColor: '#3E3E3E',
        },
      },
      dark: {
        primary: {
          color: '${text}',
          inverseColor: '${surface.50}',
          hoverColor: '${secondary.500}',
          activeColor: '${secondary.600}',
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
  components: {
    chip: {
      colorScheme: {
        root: {
          background: '{secondary.500}',
          color: `{accent.500}`,
          borderRadius: '4px',
          paddingY: '4px',
          paddingX: '8px',
        },
      },
    },
  },
});
