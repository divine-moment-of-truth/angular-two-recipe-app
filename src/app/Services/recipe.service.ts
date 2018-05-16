import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Recipe } from '../recipe';

@Injectable()
export class RecipeService {

  constructor(private _http: Http) { }

  readRecipes(): Promise<Recipe[]>{
    return this._http
      .get("http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/recipes/read.php")
      .toPromise()
      .then(res => res.json())
      .catch(this.handlePromiseError);
  }

  /*
  readRecipes(): Observable<Recipe[]>{
    return this._http
      //.get("http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/recipes/read_paging.php")
      .get("http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/recipes/read.php")
      .map(res => res.json());
  }
  */

  // readOneRecipe(recipe_id): Observable<Recipe>{
  //   return this._http
  //     .get("http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/recipes/read_one_recipe.php?id=" + recipe_id)
  //     .map(res => res.json());
  // }

  readOneRecipe(recipe_id: number): Promise<Recipe>{
    return this._http
      .get("http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/recipes/read_one_recipe.php?id=" + recipe_id)
      .toPromise()
      .then(res => res.json())
      .catch(this.handlePromiseError);
  }

  readOneRecipeForUpdate(recipe_id): Observable<Recipe>{
    return this._http
      .get("http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/recipes/read_one_recipe_for_update.php?id=" + recipe_id)
      .map(res => res.json());
  }

  deleteRecipe(recipe_id: number): Promise<Recipe>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
    return this._http.post("http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/recipes/delete_one_recipe.php",
        { id: recipe_id }, options)
        .toPromise()
        .then(res => res.json())
        .catch(this.handlePromiseError);
  }

  /*
  deleteRecipe(recipe_id){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
    return this._http.post(
        "http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/recipes/delete_one_recipe.php",
        { id: recipe_id },
        options
    ).map(res => res.json());
  }
  */

  updateRecipe(recipe): Promise<Recipe>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post("http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/recipes/update_recipe.php", recipe, options )
    .toPromise()
    .then(res => res.json())
    .catch(this.handlePromiseError);
  }

  /*
  updateRecipe(recipe): Observable<Recipe>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(
      "http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/recipes/update_recipe.php",
      recipe,
      options
    ).map(res => res.json());
  }
  */

  /* createRecipe(recipe): Observable<Recipe>{

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(
      "http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/recipes/create_recipe.php", 
      recipe,
      options
    ).map(res => res.json());
  } */

  createRecipe(recipe): Promise<Recipe>{

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http
      .post("http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/recipes/create_recipe.php", recipe ) 
      .toPromise()
      .then(res => res.json());
  }

  handlePromiseError(error: Response) {
    console.error(error);
    throw(error);
  }
  
}
