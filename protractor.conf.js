// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    //'./e2e/**/*.e2e-spec.ts'
    './e2e/login/login.e2e-spec.ts',
    './e2e/read-recipes/read-recipes.e2e-spec.ts',
    './e2e/read-one-recipe/read-one-recipe.e2e-spec.ts',
    './e2e/update-recipe/update-recipe.e2e-spec.ts',
    './e2e/create-recipe/create-recipe.e2e-spec.ts',
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
