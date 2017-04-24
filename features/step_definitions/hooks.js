const {newSession} = require('w3c-webdriver');
const {defineSupportCode} = require('cucumber');
const chromedriver = require('chromedriver');
const testApp = require('../../test-app');
const sessionStorage = require('./session-storage');

defineSupportCode(({registerHandler}) => {
    registerHandler('BeforeFeatures', async () => {
        await chromedriver.start();
        await testApp.start();
        await sessionStorage.create(newSession('http://localhost:9515', {
            browserName: 'Chrome'
        }));
    });

    registerHandler('AfterFeatures', async () => {
        const session = await sessionStorage.get();
        await session.delete();
        await chromedriver.stop();
        await testApp.stop();
    })
});
