import { browser, by, element } from 'protractor';

export class LoginPage {
    navigateTo() {
        return browser.get('/');
    }

    getUsernameInputBox() {
        return element(by.css('#username'));
    }

    getPasswordInputBox() {
        return element(by.css('#password'));
    }

    getUsernameInputBoxValue() {
        return element(by.css('#username')).getText();
    }

    getPasswordInputBoxValue() {
        return element(by.css('#password')).getText();
    }

    enterUsername(username:string) {
        element(by.css('#username')).sendKeys(username);
    }

    enterPassword(password:string) {
        element(by.css('#password')).sendKeys(password);
    }

    getSubmitButton() {
        return element(by.css('#submit'));
    }

    clickSubmitButton() {
        element(by.id('submit')).click();
    }

    getErrorText(){
        return element(by.css('.alert.alert-danger')).getText();
    }

}