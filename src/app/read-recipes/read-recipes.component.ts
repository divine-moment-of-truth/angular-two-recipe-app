import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';

import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-read-recipes',
  templateUrl: './read-recipes.component.html',
  styleUrls: ['./read-recipes.component.css'],
  providers: [RecipeService]
})
export class ReadRecipesComponent implements OnInit {

  title: string = "Read Recipes";
  recipes: Recipe[];

  constructor(private _recipeService: RecipeService, private router:Router) { }

  ngOnInit() {

  this._recipeService.readRecipes()
    .then( recipes => this.recipes = recipes['records']);
  }

  createRecipe():void {
    this.router.navigate(['createRecipe']);
  }

  readOneRecipe(id) {
    this.router.navigate(['readOneRecipe', id]);
  }

  deleteRecipe(id):void {
    this.router.navigate(['deleteRecipe', id]);
  }

  updateRecipe(id):void {
    this.router.navigate(['updateRecipe', id]);
  }

}
