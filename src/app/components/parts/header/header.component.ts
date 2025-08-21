import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import Swal from 'sweetalert2'
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(  private router: Router, private authservice: AuthenticationService) { }

  public personalData;

  ngOnInit(): void {
    let permission = localStorage.getItem('clienttokenEmail');

    this.authservice.getPersonalData(permission).subscribe((results:any) => {
      this.personalData = results.token
    }, error => {
      console.log(error);
    });

  }

  Login() {
    this.router.navigate(['/login']);
  }

  Home() {
    this.router.navigate(['/home']);
  }

  Register() {
    this.router.navigate(['/registration']);
  }

  profile() {
    this.router.navigate(['/myprofile']);
  }

  logout() {
    localStorage.removeItem('clienttokenEmail');

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
        this.router.navigate(['/login']);
      }
    });

  }

}
