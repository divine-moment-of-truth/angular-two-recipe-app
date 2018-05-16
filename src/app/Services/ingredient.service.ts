import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Ingredient } from '../ingredient';

@Injectable()
export class IngredientService {

  constructor(private _http: Http) { }

  /*   readIngredients(): Observable<Ingredient[]>{
      return this._http
        .get("http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/ingredients/read_ingredients.php")
        .map(res => res.json());
    } */

  readIngredients(): Promise<Ingredient[]>{
    return this._http
      .get("http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/ingredients/read_ingredients.php")
      .toPromise()
      .then(res => res.json());
  }

}
