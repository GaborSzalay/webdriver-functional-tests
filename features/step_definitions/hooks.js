const {newSession} = require('w3c-webdriver');
const {defineSupportCode} = require('cucumber');
const chromedriver = require('chromedriver');
const testApp = require('../../test-app');

defineSupportCode(async function ({After, Before}) {
    Before(async function () {
        chromedriver.start();
        await testApp.start();
        this.session = await newSession('http://localhost:9515', {
            browserName: 'Chrome'
        });
    });

    After(async function () {
        await this.session.delete();
        chromedriver.stop();
        await testApp.stop();
    });
});