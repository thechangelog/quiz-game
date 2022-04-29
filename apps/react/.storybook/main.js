const { mergeConfig } = require('vite');

module.exports = {
  async viteFinal(config, { configType }) {
    // return the customized config
    return mergeConfig(config, {
      // customize the Vite config here
      resolve: {},
      define: {
        ...config.define,
        global: 'window',
      },
    });
  },
  core: { builder: '@storybook/builder-vite' },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-xstate-addon/preset',
  ],
  framework: '@storybook/react',
  staticDirs: ['../public'],
};
