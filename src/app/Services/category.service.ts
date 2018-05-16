import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Category } from '../category';

@Injectable()
export class CategoryService {

  constructor(private _http: Http) { }

  readCategories(): Promise<Category[]>{
    return this._http
      .get("http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/categories/read_categories.php")
      .toPromise()
      .then(res => res.json());
  }

  /* readCategories(): Observable<Category[]>{
    return this._http
      .get("http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/categories/read_categories.php")
      .map(res => res.json());
  } */

}
