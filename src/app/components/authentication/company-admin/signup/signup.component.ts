import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CompanyAdminAuthenticationService } from 'src/app/services/company-admin-authentication.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class CompanySignupComponent implements OnInit {


  constructor(private fb: FormBuilder, private router: Router, private companyAdminauthservice: CompanyAdminAuthenticationService) { }

  register = this.fb.group({
    companyName: ['', Validators.required],
    companyAdminName: ['', Validators.required],
    companyAdminemail: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    companyAdminpassword: ['', Validators.required],
    companyAdminmobileNumber: ['', Validators.required]
  });

  ngOnInit(): void {
    let permission = localStorage.getItem('companyAdmintokenEmail');

    if (permission) {
      this.router.navigate(['/home'])
    }

  }


  passwordFieldType: string = 'password';
  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }


  
  captchaResponse: string;

  resolved(captchaResponse: string) {
    this.captchaResponse = captchaResponse;
    console.log(`Resolved captcha with response: ${this.captchaResponse}`);
  }


  registration() {
    this.companyAdminauthservice.signup(this.register.value).subscribe((result) => {
      localStorage.setItem('companyAdmintokenEmail', this.register.value.companyAdminemail)
      Swal.fire({
        icon: "success",
        title: "Company Account Created Successfully!",
        showConfirmButton: false,
        timer: 3000
      });
      this.router.navigate(['/company-verification/'+this.register.value.companyAdminemail]);
    }, error => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
      });
    });
  }
}
