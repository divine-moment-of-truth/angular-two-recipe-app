import { UpdateRecipeDetailsPage } from './update-recipe-ingredient-details.po';
import { ReadRecipePage } from '../read-recipes/read-recipes.po';
import { CommonPage } from '../common/common.po';
import { Navigation } from 'selenium-webdriver';
import { browser } from 'protractor';

describe('Angular 2 Recipe app, update recipe ingredient details page tests', () => {
    let commonPage: CommonPage;
    let updateRecipeDetailsPage: UpdateRecipeDetailsPage;

    beforeEach(() => {
        commonPage = new CommonPage();
        updateRecipeDetailsPage = new UpdateRecipeDetailsPage();
    });

    /*
    it('should open the Edit Recipe Ingredient Details form and display the title text "Edit Recipe Ingredient Details"', () => {
        expect(updateRecipeDetailsPage.getUpdateRecipesPageTitle()).toEqual("Edit Recipe Ingredient Details");
    });
    */

});

