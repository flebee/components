import type { ColorScale, Colors } from './colors';

const dictionaryDark: Record<ColorScale, ColorScale> = {
  50: 900,
  100: 800,
  200: 700,
  300: 600,
  400: 500,
  500: 400,
  600: 300,
  700: 200,
  800: 100,
  900: 50
};

const prefix = 'flebee-ui' as const;

function getColorKey(colorName: keyof Colors): { light: string; dark: string };
function getColorKey(colorName: string, key: string): { light: string; dark: string };
function getColorKey(colorName: string, key: ColorScale): { light: string; dark: string };
function getColorKey(colorName: keyof Colors, key: ColorScale): { light: string; dark: string };
function getColorKey(colorName: keyof Colors | string, key?: ColorScale | string) {
  const prefixColor = `--${prefix}-${colorName}`;

  if (!key) return { light: prefixColor, dark: prefixColor };

  return { light: `${prefixColor}-${key}`, dark: `${prefixColor}-${dictionaryDark[key as ColorScale]}` };
}

const generateColor = (cssVariable: string) => `hsl(var(${cssVariable}) / <alpha-value>)`;

export const generateColors = ({ backdrop, ...colors }: Colors) => {
  const backdropKey = getColorKey('backdrop').light;
  const dividerKey = getColorKey('neutral', 200).light;
  const textMainKey = getColorKey('neutral', 900).light;
  const foregroundKey = getColorKey('neutral', 50).light;
  const textSecondaryKey = getColorKey('neutral', 700).light;

  const themeCSS = {
    borderColor: { divider: generateColor(dividerKey) },
    colors: {} as Record<string, Record<string, string>>,
    dark: { colorScheme: 'dark', [backdropKey]: backdrop.dark },
    light: { colorScheme: 'light', [backdropKey]: backdrop.light },
    textColor: { main: generateColor(textMainKey), secondary: generateColor(textSecondaryKey) },
    backgroundColor: { backdrop: generateColor(backdropKey), foreground: generateColor(foregroundKey) }
  };

  Object.entries(colors).forEach(([colorName, color]) => {
    const keys = Object.keys(color);

    const light = Object.fromEntries(Object.entries(color).map(([key, color]) => [getColorKey(colorName, key).light, color]));
    const dark = keys.map((key) => [getColorKey(colorName, key).light, light[getColorKey(colorName, key).dark]]);
    const extendColors = keys.map((key) => [key, generateColor(getColorKey(colorName, key).light)]);
    const defaultColor = generateColor(getColorKey(colorName, 500).light);

    Object.assign(themeCSS.colors, { [colorName]: { ...Object.fromEntries(extendColors), DEFAULT: defaultColor } });
    Object.assign(themeCSS.dark, Object.fromEntries(dark));
    Object.assign(themeCSS.light, light);
  });

  return themeCSS;
};
