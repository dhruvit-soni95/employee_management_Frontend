import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {Router} from "@angular/router";
import { AuthenticationService } from 'src/app/services/authentication.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private fb : FormBuilder,  private router: Router, private authservice: AuthenticationService) { }

  login = this.fb.group({
    email: ['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['',Validators.required]
  });
  passwordFieldType: string = 'password';
  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
  ngOnInit(): void {
    let permission = localStorage.getItem('clienttokenEmail');

    if(permission){
      this.router.navigate(['/home'])      
    }
  }

  captchaResponse: string;

  resolved(captchaResponse: string) {
    this.captchaResponse = captchaResponse;
  }

  loginAccount(){
    
    if (this.captchaResponse) {
    this.authservice.login(this.login.value).subscribe((result) => {
      localStorage.setItem('clienttokenEmail', this.login.value.email)
      Swal.fire({
        icon: "success",
        title: "Login Successfully!",
        showConfirmButton: false,
        timer: 3000
      });
      this.router.navigate(['/home']);
    }, error => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
      });
    });
  }else{
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Recaptcha Wrong!"
    });
  }
  }

}
