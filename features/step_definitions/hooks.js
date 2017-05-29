const {defineSupportCode} = require('cucumber');
const chromedriver = require('chromedriver');
const testApp = require('../../test-app');
const sessionProvider = require('./session-provider');

defineSupportCode(({registerHandler}) => {
    registerHandler('BeforeFeatures', async () => {
        chromedriver.start();
        await testApp.start();
        await sessionProvider.start();
    });

    registerHandler('AfterFeatures', async () => {
        await sessionProvider.stop();
        await testApp.stop();
        chromedriver.stop();
    })
});
