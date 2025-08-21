import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from 'src/app/services/authentication.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private authservice: AuthenticationService, private activatedroute: ActivatedRoute) { }

  register = this.fb.group({
    userName: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    c_code: ['', Validators.required],
    password: ['', Validators.required],
    mobileNumber: ['', Validators.required]
  });
  passwordFieldType: string = 'password';

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  ngOnInit(): void {
    let permission = localStorage.getItem('clienttokenEmail');

    if (permission) {
      this.router.navigate(['/home'])
    }

  }

  captchaResponse: string;


  resolved(captchaResponse: string) {
    this.captchaResponse = captchaResponse;
  }

  registration() {

    if (this.captchaResponse) {
      const cname = this.activatedroute.snapshot.paramMap.get('cname');
      this.authservice.signup(this.register.value, cname).subscribe((result) => {
        Swal.fire({
          icon: "success",
          title: "Account Created Successfully!",
          showConfirmButton: false,
          timer: 3000
        });
        this.router.navigate(['/login']);
      }, error => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!"
        });
      });
    }
    else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Recaptcha Wrong!"
      });
    }
  }


}
