var HtmlReporter = require('testx-html-reporter');

exports.config = {
  directConnect: true,

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome',
    shartedTestFiles:true
  },

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: ['../test/*_spec.js'],

  onPrepare: function(){
    jasmine.getEnv().addReporter(
      new HtmlReporter({
        savePath: '../result/',
        showPassed: true,
        showFailuresCount: false,
        showTestsCount: false
      })
    );
  },

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },
};