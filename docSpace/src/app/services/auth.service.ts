import { Injectable } from '@angular/core';
//import { HttpClient } from 'selenium-webdriver/http';
//import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
//import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Http, Headers } from '@angular/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';


//import { Observable} from 'rxjs';
//import { tokenNotExpired } from 'angular2-jwt';

@Injectable(
  {providedIn: 'root'}
)
export class AuthService {
  authToken: any;
  user: any;
//  backUrl = 'http://localhost:3000';

  constructor(private http:HttpClient) { 
    //this.isDev = true; 
  }

  registerUser(user) {
    //let headers = new Headers();
    //headers.append('Content-Type', 'application/json');
    //return this.http.post(`${this.backUrl}/addemployee`,user)
    return this.http.post('http://localhost:3000/addemployee', user)
    //.pipe(map(res => res.json()));
  };

  authenticateUser(user) {
    //let headers = new Headers();
    //headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/login', user)
      //.map(res => res.json());
  };

  // addHero (hero: Hero): Observable<Hero> {
  //   return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
  //     .pipe(
  //       catchError(this.handleError('addHero', hero))
  //     );
  // }

  getProfile() {
    let headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    //console.log(headers);
    return this.http.get('http://localhost:3000/profile',{headers:headers})
    //.pipe(map(res => res.json()));
  };

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  };

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  };

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  };

}


