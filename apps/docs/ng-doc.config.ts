import type { NgDocConfiguration } from '@ng-doc/builder';

const config: NgDocConfiguration = {
  routePrefix: 'docs',
  outDir: 'apps/docs',
  shiki: { themes: { dark: 'github-dark', light: 'github-dark' } },
  repoConfig: { mainBranch: 'main', releaseBranch: 'main', url: 'https://github.com/flebee/components' }
};

export default config;
