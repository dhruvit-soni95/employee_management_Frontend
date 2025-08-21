import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, interval } from 'rxjs';
import { map, switchMap, startWith, delay, catchError, publishReplay, refCount } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SuperAdminAuthenticationService {

  constructor(
    private http: HttpClient,
    private router: Router) { }

  public url = "http://127.0.0.1:3001/user";
  

  superAdminlogin(userinfo) {
    return this.http.post(this.url + '/superAdmin/login', userinfo).pipe(
      catchError(this.handleError)
    );
  }


  
  
  getAllCompanyAdminPersonalData(email) {
    const data = { emails: email }
    return this.http.post(this.url + '/getAllCompanyAdminData', data).pipe(
      catchError(this.handleError)
    );
  }
  
  getParticularCompanyAdminPersonalData(id) {
    const data = { id: id }
    return this.http.post(this.url + '/getparticularCompanyAdminData', data).pipe(
      catchError(this.handleError)
    );
  }
  
  updateCompanyAdminProfileData(email, allinfo) {
    const data = { emails: email, allinfo: allinfo }
    return this.http.post(this.url + '/updateparticularCompanyAdminData', data).pipe(
      catchError(this.handleError)
    );
  }
  
  //Error Showing function
  handleError(error: HttpErrorResponse) {
    return throwError(error.message);
  }


}
