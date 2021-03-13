const Colors = {
  gray100: '#f8f9fa',
  gray150: '#f2f2f2',
  gray200: '#e9ecef',
  gray300: '#dee2e6',
  gray400: '#ced4da',
  gray500: '#adb5bd',
  gray600: '#6c757d',
  gray700: '#495057',
  gray800: '#343a40',
  gray900: '#212529',

  white: '#ffffff',
  black: '#000000',
};

const WhiteTheme = {
  breakpoints: {
    xl: '1024px',
    md: '768px',
    sm: '576px',
  },
  mediaQueries: {
    lg: (style: string) => `@media screen and (max-width: 1500px) { ${style} }`,
    xl: (style: string) => `@media screen and (max-width: 1024px) { ${style} }`,
    md: (style: string) => `@media screen and (max-width: 768px) { ${style} }`,
    sm: (style: string) => `@media screen and (max-width: 576px) { ${style} }`,
  },
  colors: {
    ...Colors,

    primary: '#EC4067',
    secondary: '#EE587B',
    mono: Colors.gray600,
    light: '#FFF9FB',
    dark: '#131313',

    border: Colors.gray300, // '#e6e6e6',
    borderLight: Colors.gray150, // '#e6e6e6',
  },
  transitions: {
    button: (duration: number = 0.2) => `${duration}s cubic-bezier(0,1, .43, .86)`,
    link: (duration: number = 0.2) => `${duration}s cubic-bezier(.18, .69, 1, .88)`,
  },
};

export default WhiteTheme;
