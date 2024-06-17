import { createGlobPatternsForDependencies } from '@nx/angular/tailwind';
import { join } from 'node:path';
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

import { flebeeUI } from '../../packages/ui/src';

export default <Config>{
  content: [join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html,md}'), ...createGlobPatternsForDependencies(__dirname)],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Onest Variable"', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [flebeeUI()]
};
