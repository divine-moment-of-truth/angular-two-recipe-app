import { ReadRecipesPage } from '../read-recipes/read-recipes.po';
import { UpdateRecipeDetailsPage } from '../update-recipe-ingredient-details/update-recipe-ingredient-details.po';
import { UpdateRecipePage } from './update-recipe.po';
import { CommonPage } from '../common/common.po';
import { Navigation } from 'selenium-webdriver';
import { browser } from 'protractor';

describe('Angular 2 Recipe app, update recipe page tests', () => {
    let commonPage: CommonPage;
    let readRecipePage: ReadRecipesPage;
    let updateRecipePage: UpdateRecipePage;
    let updateRecipeDetailsPage: UpdateRecipeDetailsPage;

    beforeEach(() => {
        commonPage = new CommonPage();
        readRecipePage = new ReadRecipesPage();
        updateRecipePage = new UpdateRecipePage();
        updateRecipeDetailsPage = new UpdateRecipeDetailsPage();
    });

    it('should open the update form and display the title text "Edit Recipe"', () => {
        readRecipePage.getEditRecipeButton(2).click();
        browser.sleep(3000);
        expect(updateRecipePage.getUpdateRecipesPageTitle()).toEqual("Edit Recipe");
    });

    it('should open the update form for the first recipe selected from the read recipes table', () => {
        expect(updateRecipePage.getRecipeNameText()).toEqual("Beetroot & onion seed soup");
    });

    it('should display the recipe category change when changing the recipe category then clicking the Update button', () => {
        //Change recipe categorgy to 'Both'
        updateRecipePage.clickCategoryDropDown();
        updateRecipePage.changeRecipeCategory(7);

        browser.sleep(3000);

        //updateRecipePage.changeRecipeCategory(1);
        updateRecipePage.clickUpdateButton();

        //Wait for page to open
        browser.sleep(3000);

        //Check that 'Edit Recipe Ingredient Details' form opens
        expect(updateRecipeDetailsPage.getUpdateRecipesPageTitle()).toEqual("Edit Recipe Ingredient Details");

        //Click the Update Recipe Details button on the next page- xxx
        updateRecipeDetailsPage.getUpdateRecipeIngredientDetailsButton().click();

        //Wait for page to open
        browser.sleep(3000);

        //When 'Read Recipe' page appears check that the category for the top recipe has changed to 'Broth'
        expect(readRecipePage.getCategoryTextForRow(2)).toEqual("Broth");

        //Change recipe category back to 'Soup'
        readRecipePage.getEditRecipeButton(2).click();
        browser.sleep(3000);     
        updateRecipePage.changeRecipeCategory(6);
        updateRecipePage.clickUpdateButton();
        //Wait for page to open
        browser.sleep(3000);

        //Click the Update Recipe Details button on the next page
        updateRecipeDetailsPage.getUpdateRecipeIngredientDetailsButton().click();
        //Wait for page to open
        browser.sleep(3000);
        
        //Check that recipe on first row of recipe table displays 'Soup' again
        expect(readRecipePage.getCategoryTextForRow(2)).toEqual("Soup");
        
    });


    it('should display the read recipe page when clicking the "Read Recipe" button', () => {
        
    });
});

