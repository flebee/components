import type { NgDocConfiguration } from '@ng-doc/builder';

const config: NgDocConfiguration = {
  routePrefix: 'docs',
  repoConfig: { mainBranch: 'main', releaseBranch: 'main', url: 'https://github.com/flebee/components' }
};

export default config;
