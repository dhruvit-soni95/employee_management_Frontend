import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, interval, BehaviorSubject } from 'rxjs';
import { map, switchMap, startWith, delay, catchError, publishReplay, refCount } from 'rxjs/operators';
import { Router } from "@angular/router";



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // public url = "http://ec2-54-225-7-117.compute-1.amazonaws.com:3003/user";
  // public url = "http://54.225.7.117:3003/user";
  // public url = "http://ec2-100-26-170-172.compute-1.amazonaws.com:3003/user";
  public url = "http://127.0.0.1:3001/user";
  // https://ec2-100-26-170-172.compute-1.amazonaws.com/
  constructor(
    private http: HttpClient,
    private router: Router) { }

  signup(userinfo, cname) {
    const data ={ userinfo: userinfo, cname: cname }
    return this.http.post(this.url + '/signup', data).pipe(
      catchError(this.handleError)
    );
  }

  login(userinfo) {
    return this.http.post(this.url + '/login', userinfo).pipe(
      catchError(this.handleError)
    );
  }

  getPersonalData(email) {
    const data = { emails: email }
    // return interval(10000).pipe( // Poll every 5 seconds
    //   switchMap(() => this.http.post(this.url + '/getPersonaldata', data).pipe(
    //   catchError(this.handleError)
    // ))
    // );
    return this.http.post(this.url + '/getPersonaldata', data).pipe(
      catchError(this.handleError)
    );
  }

  updatePersonalData(email, allInfo) {
    const data = { emails: email, allinfo: allInfo }
    return this.http.post(this.url + '/updatePersonaldata', data).pipe(
      catchError(this.handleError)
    );
  }


  getallEmployeeData(email, cname) {
    const data = { emails: email, cname: cname }
    return this.http.post(this.url + '/getAllEmployeeData', data).pipe(
      catchError(this.handleError)
    );
  }

  // private dataSubject = new BehaviorSubject<string>('Initial data');
  // data$ = this.dataSubject.asObservable();

  getEmployeeData(id) {
    const data = { id: id }
    return this.http.post(this.url + '/getEmployeeData', data).pipe(
      catchError(this.handleError)
    );
  }

  updatePersonalSkills(email, skills) {
    const data = { emails: email, skills: skills }
    return this.http.post(this.url + '/updatePersonalskills', data).pipe(
      catchError(this.handleError)
    );
  }

  updateProfileImage(email, img: string | ArrayBuffer | null) {
    const data = { emails: email, img: img }
    return this.http.post(this.url + '/updateProfileimage', data).pipe(
      catchError(this.handleError)
    );
  }


  addQuality(email, otherEmployeeEmail, quality) {
    const data = { emails: email, otherEmployeeEmail: otherEmployeeEmail, quality: quality }
    return this.http.post(this.url + '/addQuality', data).pipe(
      catchError(this.handleError)
    );
  }


  getEmployeeQuality(otherEmployeeEmail) {
    const data = { otherEmployeeEmail: otherEmployeeEmail }
    return this.http.post(this.url + '/getEmployeeQuality', data).pipe(
      catchError(this.handleError)
    );
  }
  
  updateQuality(email, otherEmployeeEmail, quality) {
    const data = { emails: email, otherEmployeeEmail: otherEmployeeEmail, quality: quality }
    return this.http.post(this.url + '/updateQuality', data).pipe(
      catchError(this.handleError)
    );
  }
  
  deleteQuality(email, otherEmployeeEmail, qualityid) {
    const data = { emails: email, otherEmployeeEmail: otherEmployeeEmail, qualityid: qualityid }
    return this.http.post(this.url + '/deleteQuality', data).pipe(
      catchError(this.handleError)
    );
  }

  
  getQuality(email) {
    const data = { emails: email }
    return this.http.post(this.url + '/getQuality', data).pipe(
      catchError(this.handleError)
    );
  }

  //Error Showing function
  handleError(error: HttpErrorResponse) {
    return throwError(error.message);
  }
}
