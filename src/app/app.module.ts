import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { ReadRecipesComponent } from './read-recipes/read-recipes.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { RecipeService } from './services/recipe.service';
import { CategoryService } from './services/category.service';
import { DifficultyService } from './services/difficulty.service';
import { IngredientService } from './services/ingredient.service';
import { RecipeIngredientsDetailsComponent } from './recipe-ingredients-details/recipe-ingredients-details.component';
import { ReadOneRecipeComponent } from './read-one-recipe/read-one-recipe.component';
import { DeleteRecipeComponent } from './delete-recipe/delete-recipe.component';
import { UpdateRecipeComponent } from './update-recipe/update-recipe.component';
import { UpdateRecipeIngredientDetailsComponent } from './update-recipe-ingredient-details/update-recipe-ingredient-details.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';

const appRoutes:Routes = [
  {
    path: '',
    component: LoginFormComponent
  },
  {
    path: 'readRecipes',
    component: ReadRecipesComponent
  },
  {
    path: 'createRecipe',
    component: CreateRecipeComponent
  },
  {
    path: 'readOneRecipe/:recipe_id',
    component: ReadOneRecipeComponent
  },
  {
    path: 'updateRecipe/:recipe_id',
    component: UpdateRecipeComponent
  },
  {
    path: 'deleteRecipe/:recipe_id',
    component: DeleteRecipeComponent
  },
  {
    path: 'recipeIngredientsDetails/:recipe_id',
    component: RecipeIngredientsDetailsComponent
  },
  {
    path: 'updateRecipeIngredientDetails/:recipe_id',
    component: UpdateRecipeIngredientDetailsComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    ReadRecipesComponent,
    CreateRecipeComponent,
    RecipeIngredientsDetailsComponent,
    ReadOneRecipeComponent,
    DeleteRecipeComponent,
    UpdateRecipeComponent,
    UpdateRecipeIngredientDetailsComponent,
    LoginFormComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
