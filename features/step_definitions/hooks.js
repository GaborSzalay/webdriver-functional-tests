const {defineSupportCode} = require('cucumber');
const chromedriver = require('chromedriver');
const testApp = require('../../test-app');
const sessionStorage = require('./session-storage');

defineSupportCode(({registerHandler}) => {
    registerHandler('BeforeFeatures', async () => {
        chromedriver.start();
        await testApp.start();
        await sessionStorage.start();
    });

    registerHandler('AfterFeatures', async () => {
        await sessionStorage.stop();
        await testApp.stop();
        chromedriver.stop();
    })
});
