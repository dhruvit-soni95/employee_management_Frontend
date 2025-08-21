import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {Router} from "@angular/router";
import { AuthenticationService } from 'src/app/services/authentication.service';
// import { CompanyAdminAuthenticationService } from 'src/app/services/company-admin-authentication.service';
import { SuperAdminAuthenticationService } from 'src/app/services/super-admin-authentication.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-super-login',
  templateUrl: './super-login.component.html',
  styleUrls: ['./super-login.component.css']
})
export class SuperLoginComponent implements OnInit {

  constructor( private fb : FormBuilder,  private router: Router, private superadminauthservice: SuperAdminAuthenticationService) { }

  login = this.fb.group({
    email: ['',Validators.required],
    password: ['',Validators.required]
  });

  ngOnInit(): void {
    let permission = localStorage.getItem('superAdmintokenEmail');

    if(permission){
    }
  }

  loginAccount(){
    this.superadminauthservice.superAdminlogin(this.login.value).subscribe((result) => {
      localStorage.setItem('superAdmintokenEmail', this.login.value.email)
      Swal.fire({
        icon: "success",
        title: "Login Successfully!",
        showConfirmButton: false,
        timer: 3000
      });
      this.router.navigate(['/super/admin/dashboard']);
    }, error => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
      });
    });
  }

}
