import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { Router } from "@angular/router";
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CompanyAdminAuthenticationService } from 'src/app/services/company-admin-authentication.service';


import Swal from 'sweetalert2'

@Component({
  selector: 'app-company-admin-dashboard',
  templateUrl: './company-admin-dashboard.component.html',
  styleUrls: ['./company-admin-dashboard.component.css']
})
export class CompanyAdminDashboardComponent implements OnInit {

  displayedColumns: string[] = ['userName', 'email', 'mobileNumber', 'companyName', 'websiteLink', 'country', 'actions'];
  dataSource;

  constructor(private fb: FormBuilder, private router: Router, private cdr: ChangeDetectorRef, private companyadminauthservice: CompanyAdminAuthenticationService) { }

  invite = this.fb.group({
    employee_email: ['', Validators.required],
    c_code: ['', Validators.required]
  });



  public Data;

  public personalData;
  public timeouttimeDATA;
  ngOnInit(): void {
    let permission = localStorage.getItem('companyAdmintokenEmail');
    if (!permission) {
      this.router.navigate(['/company-registration'])
    }
    else {
      this.companyadminauthservice.getCompanyAdminPersonalData(permission).subscribe((results: any) => {
        this.personalData = results.token
        this.companyadminauthservice.getallEmployeeData(permission, this.personalData.companyName).subscribe((results: any) => {
          this.Data = results.token
          console.log(this.Data)
          this.dataSource = new MatTableDataSource(this.Data);
          // this.cdr.detectChanges();
        }, error => {
        });
      }, error => {
      });

      // setInterval(() => {

      // }, 1000);
      // setTimeout(() => {
      //   this.companyadminauthservice.getallEmployeeData(permission, this.personalData.companyName).subscribe((results: any) => {
      //     this.timeouttimeDATA = results.token
      //     for (let p = 0; p <= this.timeouttimeDATA.length; p++) {
      //       if (this.timeouttimeDATA[p].has_all_rights == "yes") {
      //         window.location.reload();
      //       } else {
      //       }
      //     }
      //   }, error => {
      //   });
      // }, 1000);



    }


  }

  // refreshPage(){
  //   let permission = localStorage.getItem('companyAdmintokenEmail');

  // }


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
  }

  invite_employee(companyName) {
    let comanyAdminEmail = localStorage.getItem('companyAdmintokenEmail');
    this.companyadminauthservice.employee_invite(this.invite.value, comanyAdminEmail, companyName).subscribe((result) => {
      Swal.fire({
        icon: "success",
        title: "Login Successfully!",
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


  giveRights(employeeId) {
    this.companyadminauthservice.giveEmployeeRights(employeeId.id).subscribe((result) => {
      Swal.fire({
        icon: "success",
        title: "You give all Rights to " + employeeId.id + " Successfully!",
        showConfirmButton: false,
        timer: 3000
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }, error => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
      });
    });
  }


  backRights(employeeId) {
    this.companyadminauthservice.backEmployeeRights(employeeId.id).subscribe((result) => {
      Swal.fire({
        icon: "success",
        title: "You get Back all Rights to " + employeeId.id + " Successfully!",
        showConfirmButton: false,
        timer: 3000
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }, error => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
      });
    });

  }

}
