import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { IngredientDetail } from '../ingredient-detail';
import { Ingredient } from '../ingredient';

@Injectable()
export class IngredientDetailService {

  constructor(private _http: Http) { }

  createRecipeIngredientDetails(ingredients): Promise<IngredientDetail> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(
      "http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/recipes/create_recipe_ingredients.php", ingredients, options)
      .toPromise()
      .then(res => res.json());
  }

  createRecipeIngredientDetailsNew(ingredients, recipe_id, total_num_ingredients): Promise<IngredientDetail> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(
      "http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/recipes/create_recipe_ingredients_new.php", 
      { ingredients, recipe_id, total_num_ingredients }, options)
      .toPromise()
      .then(res => res.json());
  }

  /* createRecipeIngredientDetails(ingredients): Observable<IngredientDetail> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(
      "http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/recipes/create_recipe_ingredients.php", 
      ingredients,
      options
    ).map(res => res.json());
  } */

/*
  getRecipeIngredientDetails(recipe_id): Observable<IngredientDetail> {
    return this._http
      .get("http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/recipes/read_recipe_ingredients.php?id=" + recipe_id)
      .map(res => res.json());
  }
*/

  getRecipeIngredientDetails(recipe_id: number): Promise<IngredientDetail>{
    return this._http
      .get("http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/recipes/read_recipe_ingredients.php?id=" + recipe_id)
      .toPromise()
      .then(res => res.json());
  }

  deleteIngredientsFromRecipe(recipe_id, ingredients_to_delete_ids:number[]){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(
      "http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/recipes/delete_recipe_ingredients.php",
      { id: recipe_id,
        ingredients_to_delete_ids: ingredients_to_delete_ids
      },
      options
    ).map(res => res.json());
  }

  //addIngredientsToRecipe(recipe_id, ingredients_to_add_ids:number[]): Observable<IngredientDetail>{
  addIngredientsToRecipe(recipe_id, ingredients_to_add: Array<Ingredient> ){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

     return this._http.post(
      "http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/recipes/add_ingredients_to_recipe.php",
      { id: recipe_id,
        ingredients_to_add: ingredients_to_add
      }, options)
      .toPromise()
      .then(res => res.json());
  }

  /*
  addIngredientsToRecipe(recipe_id, ingredients_to_add: Array<Ingredient> ){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

     return this._http.post(
      "http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/recipes/add_ingredients_to_recipe.php",
      { id: recipe_id,
        ingredients_to_add: ingredients_to_add
      },
      options
     ).map(res => res.json());
  }
  */

  //updateRecipeIngredients(recipe_id, ingredients_to_update: Array<Ingredient>){
  updateRecipeIngredients(ingredients_to_update: Array<IngredientDetail>): Promise<IngredientDetail>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(
      "http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/recipes/update_recipe_ingredients.php", { ingredients_to_update: ingredients_to_update }, options )
      .toPromise()
      .then(res => res.json());
  }

  /*
  updateRecipeIngredients(ingredients_to_update: Array<IngredientDetail>){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(
      "http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/recipes/update_recipe_ingredients.php",
      { ingredients_to_update: ingredients_to_update },
      options
    ).map(res => res.json());
  }
  */
}
