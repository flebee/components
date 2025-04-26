import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

import { flebeeUI } from '../../packages/ui/src';

export default <Config>{
  content: ['{apps,packages}/**/*.{ts,html,md}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Onest Variable"', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [
    flebeeUI(),
    plugin(({ addUtilities, matchUtilities }) => {
      addUtilities({ '.vt-name-none': { 'view-transition-name': 'none' } });
      matchUtilities({ 'vt-name': (value) => ({ viewTransitionName: value }) });
    })
  ]
};
