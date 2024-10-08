import plugin from 'tailwindcss/plugin';

import { animations } from './animations';
import { type Colors, colors as flebeeColors } from './colors';
import { generateColors } from './generate-colors';
import { generateRadius, type Radius } from './generate-radius';

export interface FlebeeUIConfig {
  radius?: Partial<Radius>;
  colors?: Partial<Colors>;
}

export const flebeeUI = (config?: FlebeeUIConfig): ReturnType<typeof plugin> => {
  const borderRadius = generateRadius(config?.radius);
  const mergeColors: Colors = { ...flebeeColors, ...config?.colors };
  const { colors, dark, light, backgroundColor, textColor, borderColor } = generateColors(mergeColors);

  return plugin(
    ({ addBase }) => {
      addBase({
        ':root': { ...light, accentColor: 'hsl(var(--flebee-ui-primary-500))' },
        '@media (prefers-color-scheme: dark)': { ':root': { ...dark, colorScheme: 'dark' } },
        body: { color: 'hsl(var(--flebee-ui-neutral-900))', backgroundColor: 'hsl(var(--flebee-ui-backdrop))' }
      });
    },
    { theme: { extend: { colors, textColor, borderRadius, backgroundColor, borderColor, ...animations } } }
  );
};
