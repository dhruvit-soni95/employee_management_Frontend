import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';
import { SuperAdminAuthenticationService } from 'src/app/services/super-admin-authentication.service';

@Component({
  selector: 'app-company-admin-profile',
  templateUrl: './company-admin-profile.component.html',
  styleUrls: ['./company-admin-profile.component.css']
})
export class CompanyAdminProfileComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private superadminauthservice: SuperAdminAuthenticationService, private authservice: AuthenticationService, private activatedroute: ActivatedRoute) {
    this.skillsForm = this.fb.group({
      skills: this.fb.array([this.createSkill()])
    });
  }



  skillsForm: FormGroup;
  get skills() {
    return this.skillsForm.get('skills') as FormArray;
  }


  createSkill(name: string = ''): FormGroup {
    return this.fb.group({
      name: [name]
    });
  }


  setSkills(skills: string[]): void {
    const skillFGs = skills.map(skill => this.createSkill(skill));
    const skillFormArray = this.fb.array(skillFGs);
    this.skillsForm.setControl('skills', skillFormArray);
  }

  addSkill(): void {
    this.skills.push(this.createSkill());
  }


  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  logSkills(): void {
    const id = this.activatedroute.snapshot.paramMap.get('id');
    const skillsArray = this.skills.value;

    let permission = localStorage.getItem('companyAdmintokenEmail');
    this.authservice.updatePersonalSkills(this.personalData.email, this.skills.value).subscribe((results: any) => {
      Swal.fire({
        icon: "success",
        title: "Skills Update Successfully!",
        showConfirmButton: false,
        timer: 3000
      });
      this.router.navigate(['/company/admin/profile/employee/' + id])
    }, error => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
      });
    });
  }





  profile = this.fb.group({
    companyadminName: ['', Validators.required],
    companyName: ['', Validators.required],
    dob: ['', Validators.required],
    gender: ['', Validators.required],
    companyadminEmail: ['', Validators.required],
    maritalstatus: ['', Validators.required],
    companyadminMobileNumber: ['', Validators.required],
    websiteLink: ['', Validators.required],
    address: ['', Validators.required],
    country: ['', Validators.required],
    dateofjoining: ['', Validators.required],
    languagespoken: ['', Validators.required],
    otherrelevantinformation: ['', Validators.required],
  });



  qualities = this.fb.group({
    quality: ['', Validators.required]
  });


  public personalData;
  public employeeQuality = [];

  public profileIMG;

  public allskillls = [];
  public myEmail;




  ngOnInit(): void {
    const id = this.activatedroute.snapshot.paramMap.get('id');
    this.superadminauthservice.getParticularCompanyAdminPersonalData(id).subscribe((results: any) => {
      this.personalData = results.token

      this.profile.setValue({
        companyadminName: this.personalData.companyadminName,
        companyName: this.personalData.companyName,
        dob: this.personalData.dob,
        gender: this.personalData.gender,
        companyadminEmail: this.personalData.companyadminEmail,
        maritalstatus: this.personalData.maritalstatus,
        companyadminMobileNumber: this.personalData.companyadminMobileNumber,
        websiteLink: this.personalData.websiteLink,
        address: this.personalData.address,
        country: this.personalData.country,
        dateofjoining: this.personalData.dateofjoining,
        languagespoken: this.personalData.languagespoken,
        otherrelevantinformation: this.personalData.otherrelevantinformation,
      })
    }, error => {
    });
  }

  showQualityinput: boolean = false;


  toggleVisibility(index: number) {
    this.employeeQuality[index].isVisible = !this.employeeQuality[index].isVisible;
  }

  doSomething(item: any) {
    this.showQualityinput = true
  }





  updatePersonalData() {
    const id = this.activatedroute.snapshot.paramMap.get('id');
    this.superadminauthservice.updateCompanyAdminProfileData(this.personalData.companyadminEmail, this.profile.value).subscribe((results: any) => {
      Swal.fire({
        icon: "success",
        title: "Data Update Successfully!",
        showConfirmButton: false,
        timer: 3000
      });
      this.router.navigate(['/profile/company/admin/' + id]);
    }, error => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
      });
    });
  }




  updateQuality(quality, email) {
    let permission = localStorage.getItem('companyAdmintokenEmail');
    const id = this.activatedroute.snapshot.paramMap.get('id');
    this.authservice.updateQuality(permission, email, quality).subscribe((results: any) => {
      Swal.fire({
        icon: "success",
        title: "Quality Upload Successfully!",
        showConfirmButton: false,
        timer: 3000
      });
      this.router.navigate(['/company/admin/profile/employee/' + id])
    }, error => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
      });
    });
  }




  selectedLanguages: string[] = [];


  addQuality(email) {
    const id = this.activatedroute.snapshot.paramMap.get('id');
    let permission = localStorage.getItem('companyAdmintokenEmail');

    this.authservice.addQuality(permission, email, this.qualities.value).subscribe((results: any) => {
      Swal.fire({
        icon: "success",
        title: "Quality Upload Successfully!",
        showConfirmButton: false,
        timer: 3000
      });
      this.router.navigate(['/company/admin/profile/employee/' + id])
    }, error => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
      });
    });


  }





  deletequality(qualityid, email) {
    let permission = localStorage.getItem('companyAdmintokenEmail');
    const id = this.activatedroute.snapshot.paramMap.get('id');
    this.authservice.deleteQuality(permission, email, qualityid).subscribe((results: any) => {
      Swal.fire({
        icon: "success",
        title: "Quality Delete Successfully!",
        showConfirmButton: false,
        timer: 3000
      });
      this.router.navigate(['/company/admin/profile/employee/' + id])
    }, error => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
      });
    });
  }


}
