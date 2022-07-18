import '@cypress/instrument-cra';
import { defineConfig } from 'cypress';
import codeCoverageTask from '@cypress/code-coverage/task';

export default defineConfig({
  env: {
    coverage: true,
    codeCoverage: {
      exclude: 'cypress/**/*.*',
    },
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config;
    },
  },
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack'
    },
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'));
      return config;
    },
  },
});
