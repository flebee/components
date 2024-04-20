import { createGlobPatternsForDependencies } from '@nx/angular/tailwind';
import { join } from 'path';
import type { Config } from 'tailwindcss';

export default <Config>{
  content: [join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'), ...createGlobPatternsForDependencies(__dirname)],
  theme: { extend: {} },
  plugins: []
};
