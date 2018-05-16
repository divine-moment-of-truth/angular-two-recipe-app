import { Component } from '@angular/core';
import { Injectable,  } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Image } from '../image';

@Injectable()
export class ImageService {

  constructor(private _http: Http) { }

  //images: Image[];

  uploadImage(formData: any): Promise<Image[]> {
    
    return this._http
      .post("http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/recipes/upload_image.php", formData)
      .toPromise()
      .then(res => res.json());
  }

  readImages(): Promise<Image[]> {
    return this._http
      .get("http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/recipes/read_images.php")
      .toPromise()
      .then(res => res.json());
  }

  /* uploadImage(formData: any): Promise<Image[]> {
    
    return this._http
      .post("http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/recipes/upload_image.php", formData)
      .toPromise()
      .then(res => res.json());
  } */

/*   readImages(): Observable<Image[]> {
    return this._http
      .get("http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/recipes/read_images.php")
      .map(res => res.json());
  } */

  /*
  uploadImage(formData): Observable<Image[]>{

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http
      .post("http://localhost:8080/angular-two-recipe-app/angular-two-recipe-app/src/api/recipes/upload_image.php",
      formData,
      options
      ).map(res => res.json());
  }
  */

}
