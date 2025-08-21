import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { Router } from "@angular/router";
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CompanyAdminAuthenticationService } from 'src/app/services/company-admin-authentication.service';
import { SuperAdminAuthenticationService } from 'src/app/services/super-admin-authentication.service';


import Swal from 'sweetalert2'
@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.css']
})
export class SuperAdminDashboardComponent implements OnInit {


  displayedColumns: string[] = ['companyadminName', 'companyadminEmail', 'companyadminMobileNumber', 'companyName', 'actions'];
  dataSource;


  constructor(private fb: FormBuilder, private router: Router, private superadminauthservice: SuperAdminAuthenticationService) { }



  public Data;

  public personalData;
  ngOnInit(): void {
    let permission = localStorage.getItem('superAdmintokenEmail');
    if (!permission) {
      this.router.navigate(['/super-login'])
    }
    else {
      this.superadminauthservice.getAllCompanyAdminPersonalData(permission).subscribe((results:any) => {
        this.personalData = results.token
          this.dataSource = new MatTableDataSource(this.personalData);
      }, error => {
        console.log(error);
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
    this.router.navigate(['/profile/company/admin/' + element.id]);
  }

  see(element) {
    this.router.navigate(['/employee/list/' + element.id]);
  }


  delete(element) {
    // Delete logic here
  }

}
