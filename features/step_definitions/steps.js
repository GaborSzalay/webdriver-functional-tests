const chai = require('chai');
const {defineSupportCode} = require('cucumber');
const sessionStorage = require('./session-storage');
chai.should();

defineSupportCode(({Given, Then, When}) => {
    Given('User is on the simple calculator page', async function () {
        await (await sessionStorage.get()).go('http://localhost:8087');
    });

    Given('User enter {int} in A field', async function (int) {
        const field = await (await sessionStorage.get()).findElement('css', '#a');
        await field.sendKeys(int.toString());
    });

    Given('User enter {int} in B field', async function (int) {
        const field = await (await sessionStorage.get()).findElement('css', '#b');
        await field.sendKeys(int.toString());
    });

    When('User press Add button', async function () {
        const add = await (await sessionStorage.get()).findElement('css', '#add');
        await add.click();
    });

    Then('The result should contain {int}', async function (int) {
        const result = await (await sessionStorage.get()).findElement('css', '#result');
        const resultText = await result.getText();
        resultText.should.equal(int.toString());
    });
});