import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Router } from "@angular/router";
import { AuthenticationService } from 'src/app/services/authentication.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['userName', 'email', 'mobileNumber', 'companyName', 'websiteLink', 'country', 'actions'];
  dataSource;

  constructor(private router: Router, private authservice: AuthenticationService) { }

  public Data;

  public personalData;
  public myEmail;

  ngOnInit(): void {
    let permission = localStorage.getItem('clienttokenEmail');
    if (!permission) {
      this.router.navigate(['/login'])
    }
    else {
      this.myEmail = permission
      // const intervalId = setInterval(() => {
        this.authservice.getPersonalData(permission).subscribe((results: any) => {
          this.personalData = results.token
          this.authservice.getallEmployeeData(permission, this.personalData.companyName).subscribe((results: any) => {
            this.Data = results.token
            this.dataSource = new MatTableDataSource(this.Data);
            // console.log(this.Data)
          }, error => {
          });
        }, error => {
        });
      // }, 1000);


    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(element) {
    this.router.navigate(['/profile/employee/' + element.id]);
  }

  delete(element) {
  }


  gotoProfile() {
    this.router.navigate(['/myprofile']);
  }

}
