import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CompanyAdminAuthenticationService } from 'src/app/services/company-admin-authentication.service';


import Swal from 'sweetalert2'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {


  displayedColumns: string[] = ['userName', 'email', 'mobileNumber', 'companyName', 'websiteLink', 'country', 'actions'];
  dataSource;


  constructor(private fb: FormBuilder, private router: Router, private companyadminauthservice: CompanyAdminAuthenticationService, private activatedroute: ActivatedRoute) { }

  invite = this.fb.group({
    employee_email: ['', Validators.required],
    c_code: ['', Validators.required]
  });



  public Data;

  public personalData;
  ngOnInit(): void {
    const id = this.activatedroute.snapshot.paramMap.get('id');
    let permission = localStorage.getItem('superAdmintokenEmail');
    if (!permission) {
      this.router.navigate(['/company-registration'])
    }
    else {
      this.companyadminauthservice.getSuperAdminPersonalData(id).subscribe((results:any) => {
        this.personalData = results.token
        this.companyadminauthservice.getallEmployeeData(id, this.personalData.companyName).subscribe((results: any) => {
          this.Data = results.token
          this.dataSource = new MatTableDataSource(this.Data);
        }, error => {
        });
      }, error => {
      });
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
    this.router.navigate(['/company/admin/profile/employee/' + element.id]);
  }

  delete(element) {
    // Delete logic here
  }


  giveRights(employeeId){
    this.companyadminauthservice.giveEmployeeRights(employeeId.id).subscribe((result) => {
      Swal.fire({
        icon: "success",
        title: "You give all Rights to "+employeeId.id+" Successfully!",
        showConfirmButton: false,
        timer: 3000
      });
    }, error => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
      });
    });
  }


  backRights(employeeId){
    this.companyadminauthservice.backEmployeeRights(employeeId.id).subscribe((result) => {
      Swal.fire({
        icon: "success",
        title: "You get Back all Rights to "+employeeId.id+" Successfully!",
        showConfirmButton: false,
        timer: 3000
      });
    }, error => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
      });
    });
  }

}
