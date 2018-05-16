import { ReadOneRecipePage } from './read-one-recipe.po';
import { ReadRecipesPage } from '../read-recipes/read-recipes.po';
import { CommonPage } from '../common/common.po';
import { Navigation } from 'selenium-webdriver';
import { browser } from 'protractor';

describe('Angular 2 Recipe app, read one recipe tests', () => {
    let commonPage: CommonPage;
    let readRecipePage: ReadRecipesPage;
    let readOneRecipePage: ReadOneRecipePage;

    beforeEach(() => {
        commonPage = new CommonPage();
        readRecipePage = new ReadRecipesPage();
        readOneRecipePage = new ReadOneRecipePage();
    });

    it('should display "Read One Recipe" when the first recipe from the read recipes page Read button is clicked', () => {
        readRecipePage.getReadRecipeButton(2).click();
        expect(readOneRecipePage.getPageTitle()).toEqual("Read One Recipe");
    });

    it('should display the recipe name of the first recipe in the read recipes page table', () => {      
        expect(readOneRecipePage.getRecipeTitle()).toEqual("Beetroot & onion seed soup");
    });

    it('should display the read recipes page when the Read Recipes button is clicked', () => {      
        readOneRecipePage.getReadRecipesBtn().click();
        expect(readRecipePage.getReadRecipesPageTitle()).toEqual("Read Recipes");
    });

});

