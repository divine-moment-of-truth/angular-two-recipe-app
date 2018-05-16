import { ReadRecipesPage } from './read-recipes.po';
import { CommonPage } from '../common/common.po';
import { Navigation } from 'selenium-webdriver';
import { browser } from 'protractor';

describe('Angular 2 Recipe app, read recipe page tests', () => {
    let commonPage: CommonPage;
    let readRecipePage: ReadRecipesPage;

    beforeEach(() => {
        commonPage = new CommonPage();
        readRecipePage = new ReadRecipesPage();
    });

    it('should display the name of the first recipe on the table', () => {
        expect(readRecipePage.getFirstTableRowRecipeName()).toEqual("Beetroot & onion seed soup");
    });

    it('should display the name of the first recipe on the table', () => {
        expect(readRecipePage.getFirstTableRowRecipeName()).toEqual("Beetroot & onion seed soup");
    });
});

