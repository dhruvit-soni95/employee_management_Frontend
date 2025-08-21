import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { CompanyAdminAuthenticationService } from 'src/app/services/company-admin-authentication.service';

import Swal from 'sweetalert2'
@Component({
  selector: 'app-company-admin-verification',
  templateUrl: './company-admin-verification.component.html',
  styleUrls: ['./company-admin-verification.component.css']
})
export class CompanyAdminVerificationComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private companyAdminauthservice: CompanyAdminAuthenticationService) { }

  ngOnInit(): void {
  }

  otp: string[] = ['', '', '', ''];

  onInputChange(event: any, index: number): void {
    const input = event.target.value;
    this.otp[index] = input;
    if (input.length === 1 && index < this.otp.length - 1) {
      (document.getElementById(`otp-${index + 1}`) as HTMLInputElement).focus();
    }
  }

  verify(){
    const otpValue = this.otp.join('');

    this.companyAdminauthservice.otpVerification(otpValue).subscribe((result) => {
      Swal.fire({
        icon: "success",
        title: "Company Account Created Successfully!",
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
