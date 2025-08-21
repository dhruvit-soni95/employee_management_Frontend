import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {Router} from "@angular/router";
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CompanyAdminAuthenticationService } from 'src/app/services/company-admin-authentication.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-company-admin-login',
  templateUrl: './company-admin-login.component.html',
  styleUrls: ['./company-admin-login.component.css']
})
export class CompanyAdminLoginComponent implements OnInit {

  constructor( private fb : FormBuilder,  private router: Router, private companyadminauthservice: CompanyAdminAuthenticationService) { }

  login = this.fb.group({
    email: ['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['',Validators.required]
  });


  passwordFieldType: string = 'password';
  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  ngOnInit(): void {
    let permission = localStorage.getItem('companyAdmintokenEmail');

    if(permission){
      this.router.navigate(['/company/admin/dashboard'])      
    }
  }

  captchaResponse: string;

  resolved(captchaResponse: string) {
    this.captchaResponse = captchaResponse;
  }

  loginAccount(){
    this.companyadminauthservice.companyAdminlogin(this.login.value).subscribe((result) => {
      localStorage.setItem('companyAdmintokenEmail', this.login.value.email)
      Swal.fire({
        icon: "success",
        title: "Login Successfully!",
        showConfirmButton: false,
        timer: 3000
      });
      this.router.navigate(['/company/admin/dashboard']);
    }, error => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
      });
    });
  }

}
