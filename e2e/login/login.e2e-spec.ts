import { LoginPage } from './login.po';
import { CommonPage } from '../common/common.po';
import { Navigation } from 'selenium-webdriver';
import { browser } from 'protractor';

describe('angular-two-recipe-app App Login', () => {
  let loginPage: LoginPage;
  let commonPage: CommonPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    commonPage = new CommonPage();
  });

  it('should successfully display the login page', async () => {
    //debugger;
    await loginPage.navigateTo();
    //await browser.get('http://www.angularjs.org')
    browser.manage().window().setSize(1680, 1050);
    await browser.debugger();
    expect(loginPage.getUsernameInputBox()).toBeTruthy();
    expect(loginPage.getPasswordInputBox()).toBeTruthy();
    expect(loginPage.getSubmitButton()).toBeTruthy();
    expect(loginPage.getUsernameInputBoxValue()).toBe('');
    expect(loginPage.getPasswordInputBoxValue()).toBe('');
  });

  it('should display "Incorrect username or password" and username and password input boxes should be cleared when inputting the incorrect username', () => {
    loginPage.enterUsername("xxx")
    loginPage.enterPassword("password")
    loginPage.clickSubmitButton();
    expect(loginPage.getErrorText()).toEqual('Incorrect username or password');
    expect(loginPage.getUsernameInputBoxValue()).toBe('');
    expect(loginPage.getPasswordInputBoxValue()).toBe('');
  }
 )

   it('should display "Incorrect username or password" and username and password input boxes should be cleared when inputting the incorrect password', () => {
    loginPage.enterUsername("admin")
    loginPage.enterPassword("xxx")
    loginPage.clickSubmitButton();
    expect(loginPage.getErrorText()).toEqual('Incorrect username or password');
    expect(loginPage.getUsernameInputBoxValue()).toBe('');
    expect(loginPage.getPasswordInputBoxValue()).toBe('');
  }
 )

  it('should display the Recipe App Read Recipes Page when successfully entering the correct username and password', () => {
    loginPage.enterUsername("admin")
    loginPage.enterPassword("password")
    loginPage.clickSubmitButton();
    //browser.pause();
    expect(commonPage.getRecipeAppText()).toEqual('Recipe App');
    //browser.pause();
    expect(commonPage.getPageHeaderText()).toEqual('Read Recipes');
    //browser.pause();
  })
  
});