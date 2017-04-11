const { newSession } = require('w3c-webdriver');
const chai = require('chai');
const {defineSupportCode} = require('cucumber');
const chromedriver = require('chromedriver');
const testApp = require('../../test-app');
chai.should();

let session;

defineSupportCode(({Given, Then, When}) => {
  Given('User is on the simple calculator page', async function () {
    chromedriver.start();
    await testApp.start();
    session = await newSession('http://localhost:9515', {
      browserName: 'Chrome'
    });
    await session.go('http://localhost:8087');
  });

  Given('User enter {int} in A field', async function (int) {
    const field = await session.findElement('css', '#a');
    await field.sendKeys(int.toString());
  });

  Given('User enter {int} in B field', async function (int) {
    const field = await session.findElement('css', '#b');
    await field.sendKeys(int.toString());
  });

  When('User press Add button', async function () {
    const add = await session.findElement('css', '#add');
    await add.click();
  });

  Then('The result should contain {int}', async function (int) {
    const result = await session.findElement('css', '#result');
    const resultText = await result.getText();
    resultText.should.equal(int.toString());
    await session.delete();
    chromedriver.stop();
    await testApp.stop();
  });
});