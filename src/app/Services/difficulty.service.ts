import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Difficulty } from '../difficulty';

@Injectable()
export class DifficultyService {

  constructor(private _http: Http) { }

  readDifficulties(): Promise<Difficulty[]>{
    return this._http.get("http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/difficulties/read_difficulties.php")
      .toPromise()
      .then(res => res.json());
  }

  /* readDifficulties(): Observable<Difficulty[]>{
    return this._http.get("http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/difficulties/read_difficulties.php")
      .map(res => res.json());
  } */

}
