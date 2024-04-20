export type ColorScale = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type BeeTheme = 'dark' | 'light';

export type HSLColor = `${number}deg ${number}% ${number}%`;

export type Colors = Record<'danger' | 'neutral' | 'primary' | 'success' | 'warning', Record<ColorScale, HSLColor>> & {
  backdrop: Record<BeeTheme, HSLColor>;
};

export type BeeColor = keyof Colors;

export const colors: Colors = {
  primary: {
    50: '268deg 64% 93%',
    100: '269deg 61% 89%',
    200: '269deg 62% 77%',
    300: '269deg 63% 66%',
    400: '270deg 62% 55%',
    500: '271deg 79% 44%',
    600: '272deg 80% 35%',
    700: '272deg 79% 26%',
    800: '273deg 80% 17%',
    900: '274deg 78% 11%'
  },
  success: {
    50: '147deg 64% 95%',
    100: '146deg 61% 89%',
    200: '146deg 62% 77%',
    300: '146deg 63% 66%',
    400: '146deg 62% 55%',
    500: '146deg 79% 44%',
    600: '146deg 80% 35%',
    700: '146deg 79% 26%',
    800: '146deg 80% 17%',
    900: '146deg 78% 9%'
  },
  warning: {
    50: '55deg 94% 95%',
    100: '37deg 91% 91%',
    200: '37deg 91% 82%',
    300: '37deg 91% 73%',
    400: '37deg 91% 64%',
    500: '37deg 91% 55%',
    600: '37deg 74% 44%',
    700: '37deg 74% 33%',
    800: '37deg 75% 22%',
    900: '37deg 75% 11%'
  },
  danger: {
    50: '0deg 92% 95%',
    100: '0deg 92% 90%',
    200: '0deg 90% 80%',
    300: '0deg 91% 71%',
    400: '0deg 84% 60%',
    500: '0deg 90% 51%',
    600: '0deg 87% 41%',
    700: '0deg 86% 31%',
    800: '0deg 87% 20%',
    900: '0deg 85% 10%'
  },
  neutral: {
    50: '240deg 1% 95%',
    100: '240deg 2% 90%',
    200: '210deg 2% 80%',
    300: '220deg 2% 70%',
    400: '240deg 1% 60%',
    500: '220deg 1% 50%',
    600: '240deg 1% 40%',
    700: '240deg 1% 30%',
    800: '210deg 2% 20%',
    900: '240deg 2% 10%'
  },
  backdrop: {
    dark: '240deg 55% 5%',
    light: '240deg 1% 90%'
  }
};
