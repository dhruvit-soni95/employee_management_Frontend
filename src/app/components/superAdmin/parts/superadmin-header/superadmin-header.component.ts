import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import Swal from 'sweetalert2'
// import { AuthenticationService } from 'src/app/services/authentication.service';
import { CompanyAdminAuthenticationService } from 'src/app/services/company-admin-authentication.service';

@Component({
  selector: 'app-superadmin-header',
  templateUrl: './superadmin-header.component.html',
  styleUrls: ['./superadmin-header.component.css']
})
export class SuperadminHeaderComponent implements OnInit {


  constructor(  private router: Router, private companyadminauthservice: CompanyAdminAuthenticationService) { }

  public personalData;

  ngOnInit(): void {
    // let permission = localStorage.getItem('companyAdmintokenEmail');

    // this.companyadminauthservice.getCompanyAdminPersonalData(permission).subscribe((results:any) => {
    //   this.personalData = results.token
    // }, error => {
    //   console.log(error);
    // });

  }

  // Login() {
  //   this.router.navigate(['/company-login']);
  // }

  Home() {
    this.router.navigate(['/super/admin/dashboard']);
  }

  // Register() {
  //   this.router.navigate(['/registration']);
  // }

  profile() {
    // this.router.navigate(['/myprofile']);
  }

  logout() {
    localStorage.removeItem('superAdmintokenEmail');
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Loged out!",
          icon: "success",
          showConfirmButton: false,
          timer: 3000
        });
        this.router.navigate(['/super-login']);
      }
    });
  }


}
