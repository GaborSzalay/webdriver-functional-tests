const chai = require('chai');
const {defineSupportCode} = require('cucumber');
const sessionProvider = require('./session-provider');
chai.should();

defineSupportCode(({Given, Then, When}) => {
    Given('User is on the simple calculator page', async function () {
        await sessionProvider.get().go('http://localhost:8087');
    });

    Given('User enter {int} in A field', async function (int) {
        const field = await sessionProvider.get().findElement('css', '#a');
        await field.sendKeys(int.toString());
    });

    Given('User enter {int} in B field', async function (int) {
        const field = await sessionProvider.get().findElement('css', '#b');
        await field.sendKeys(int.toString());
    });

    When('User press Add button', async function () {
        const add = await sessionProvider.get().findElement('css', '#add');
        await add.click();
    });

    Then('The result should contain {int}', async function (int) {
        const result = await sessionProvider.get().findElement('css', '#result');
        const resultText = await result.getText();
        resultText.should.equal(int.toString());
    });
});