import { CommonPage } from '../common/common.po';
import { ReadRecipesPage } from '../read-recipes/read-recipes.po';
import { CreateRecipePage } from './create-recipe.po';
import { Navigation } from 'selenium-webdriver';
import { browser } from 'protractor';

describe('angular-two-recipe-app App Login', () => {
  let commonPage: CommonPage;
  let readRecipesPage: ReadRecipesPage;
  let createRecipePage: CreateRecipePage;

  beforeEach(() => {
    commonPage = new CommonPage();
    readRecipesPage = new ReadRecipesPage();
    createRecipePage = new CreateRecipePage();
  });

  it('should successfully display the Create new recipe page', async () => {
    //debugger;
    await readRecipesPage.getCreateRecipeButton().click();

    expect(createRecipePage.getCreateRecipePageTitle()).toEqual("Create Recipe");
  });

});