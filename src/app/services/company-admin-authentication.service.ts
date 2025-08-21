import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, interval } from 'rxjs';
import { map, switchMap, startWith, delay, catchError, publishReplay, refCount } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CompanyAdminAuthenticationService {
  // public url = "http://ec2-54-225-7-117.compute-1.amazonaws.com:3003/user";
  // public url = "http://54.225.7.117:3003/user";
  // public url = "http://ec2-100-26-170-172.compute-1.amazonaws.com:3003/user";
  public url = "http://127.0.0.1:3001/user";
  // https://ec2-100-26-170-172.compute-1.amazonaws.com/
  constructor(
    private http: HttpClient,
    private router: Router) { }


  signup(userinfo) {
    return this.http.post(this.url + '/companyAdmin/signup', userinfo).pipe(
      catchError(this.handleError)
    );
  }

  otpVerification(otp) {
    const data = { otp: otp }
    return this.http.post(this.url + '/companyAdmin/verification', data).pipe(
      catchError(this.handleError)
    );
  }



  companyAdminlogin(userinfo) {
    return this.http.post(this.url + '/companyAdmin/login', userinfo).pipe(
      catchError(this.handleError)
    );
  }


  getCompanyAdminPersonalData(email): Observable<any> {

    const data = { emails: email }
    // return interval(10000).pipe(
    //   switchMap(() => this.http.post(this.url + '/companyAdmin/getPersonaldata', data).pipe(
    //     catchError(this.handleError)
    //   ))
    // );
    return this.http.post(this.url + '/companyAdmin/getPersonaldata', data).pipe(
      catchError(this.handleError)
    );
  }


  getSuperAdminPersonalData(id) {
    const data = { ids: id }
    return this.http.post(this.url + '/superAdmin/getEmployeedata', data).pipe(
      catchError(this.handleError)
    );
  }


  
  employee_invite(userinfo, comanyAdminEmail, c_name) {
    const data ={ userinfo: userinfo, comanyAdminEmail : comanyAdminEmail, c_name: c_name }
    return this.http.post(this.url + '/companyAdmin/employee/invite', data).pipe(
      catchError(this.handleError)
    );
  }



  
  getallEmployeeData(email, cname) {
    const data = { emails: email, cname: cname }
    return this.http.post(this.url + '/getAllEmployeeData', data).pipe(
      catchError(this.handleError)
    );
  }

  

  giveEmployeeRights(employeeid) {
    const data = { employeeid : employeeid }
    return this.http.post(this.url + '/giveallRightstoEmployee', data).pipe(
      catchError(this.handleError)
    );
  }

  backEmployeeRights(employeeid) {
    const data = { employeeid : employeeid }
    return this.http.post(this.url + '/backallRightstoEmployee', data).pipe(
      catchError(this.handleError)
    );
  }

  //Error Showing function
  handleError(error: HttpErrorResponse) {
    return throwError(error.message);
  }


}
