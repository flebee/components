import { createGlobPatternsForDependencies } from '@nx/angular/tailwind';
import { join } from 'path';
import type { Config } from 'tailwindcss';

import { flebeeUI } from '../../packages/ui/src';

export default <Config>{
  content: [join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html,md}'), ...createGlobPatternsForDependencies(__dirname)],
  theme: { extend: {} },
  plugins: [flebeeUI()]
};
