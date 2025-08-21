import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {
  constructor(private fb: FormBuilder, private router: Router, private authservice: AuthenticationService, private activatedroute: ActivatedRoute) {
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

    let permission = localStorage.getItem('clienttokenEmail');
    this.authservice.updatePersonalSkills(this.personalData.email, this.skills.value).subscribe((results: any) => {
      Swal.fire({
        icon: "success",
        title: "Skills Update Successfully!",
        showConfirmButton: false,
        timer: 3000
      });

      this.router.navigate(['/profile/employee/' + id])
    }, error => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
      });
    });
  }




  profile = this.fb.group({
    userName: ['', Validators.required],
    comapanyName: ['', Validators.required],
    dob: ['', Validators.required],
    gender: ['', Validators.required],
    email: ['', Validators.required],
    maritalstatus: ['', Validators.required],
    password: ['', Validators.required],
    mobileNumber: ['', Validators.required],
    websiteLink: ['', Validators.required],
    address: ['', Validators.required],
    country: ['', Validators.required],
    employeeid: ['', Validators.required],
    jobtitle: ['', Validators.required],
    department: ['', Validators.required],
    dateofjoining: ['', Validators.required],
    employmenttype: ['', Validators.required],
    supervisorormanagerName: ['', Validators.required],
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

  public myddata;
  public refreshedData;
  public showrefreshDATA: boolean;

  ngOnInit(): void {
    const id = this.activatedroute.snapshot.paramMap.get('id');

    let permission = localStorage.getItem('clienttokenEmail');
    this.authservice.getPersonalData(permission).subscribe((results: any) => {
      this.myddata = results.token
    }, error => {
    });

    this.authservice.getEmployeeData(id).subscribe((results: any) => {
      this.personalData = results.token

      this.profile.setValue({
        userName: this.personalData.userName,
        comapanyName: this.personalData.companyName,
        dob: this.personalData.dob,
        gender: this.personalData.gender,
        email: this.personalData.email,
        maritalstatus: this.personalData.maritalstatus,
        password: this.personalData.password,
        mobileNumber: this.personalData.mobileNumber,
        websiteLink: this.personalData.websiteLink,
        address: this.personalData.address,
        country: this.personalData.country,
        employeeid: this.personalData.employeeid,
        jobtitle: this.personalData.jobtitle,
        department: this.personalData.department,
        dateofjoining: this.personalData.dateofjoining,
        employmenttype: this.personalData.employmenttype,
        supervisorormanagerName: this.personalData.supervisorormanagerName,
        languagespoken: this.personalData.languagespoken,
        otherrelevantinformation: this.personalData.otherrelevantinformation,
      })

      
    setInterval(() => {
      this.authservice.getPersonalData(permission).subscribe((results: any) => {
        this.refreshedData = results.token;
        // console.log(this.refreshedData.has_all_rights)
        if (this.refreshedData.has_all_rights == "yes") {
          this.showrefreshDATA = true;
          // setTimeout(()=>{
          //   window.location.reload();
          // },1000)
        } else {
          this.showrefreshDATA = false;
          // setTimeout(()=>{
          //   window.location.reload();
          // },1000)
        }
      }, error => {
      });
    }, 1000);


      const namesArray = this.personalData.skills.split(', ').map(name => name.trim());
      this.setSkills(namesArray);
      this.profileIMG = this.personalData.profile_image
      for (let i = 0; i < namesArray.length; i++) {
        this.allskillls.push(namesArray[i])
      }




      let permission = localStorage.getItem('clienttokenEmail');
      this.myEmail = permission;
      this.authservice.getEmployeeQuality(this.personalData.email).subscribe((results: any) => {
        for (let f = 0; f < results.token.length; f++) {
          this.employeeQuality.push(results.token[f])
        }
      }, error => {
      });
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
    this.authservice.updatePersonalData(this.personalData.email, this.profile.value).subscribe((results: any) => {
      Swal.fire({
        icon: "success",
        title: "Data Update Successfully!",
        showConfirmButton: false,
        timer: 3000
      });
      this.router.navigate(['/profile/employee/' + id])
    }, error => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
      });
    });
  }





  updateQuality(quality, email) {
    let permission = localStorage.getItem('clienttokenEmail');
    const id = this.activatedroute.snapshot.paramMap.get('id');
    this.authservice.updateQuality(permission, email, quality).subscribe((results: any) => {
      Swal.fire({
        icon: "success",
        title: "Quality Upload Successfully!",
        showConfirmButton: false,
        timer: 3000
      });
      this.router.navigate(['/profile/employee/' + id])
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
    let permission = localStorage.getItem('clienttokenEmail');


    this.authservice.addQuality(permission, email, this.qualities.value).subscribe((results: any) => {
      Swal.fire({
        icon: "success",
        title: "Quality Upload Successfully!",
        showConfirmButton: false,
        timer: 3000
      });
      this.router.navigate(['/profile/employee/' + id])
    }, error => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
      });
    });


  }





  deletequality(qualityid, email) {
    let permission = localStorage.getItem('clienttokenEmail');
    const id = this.activatedroute.snapshot.paramMap.get('id');
    this.authservice.deleteQuality(permission, email, qualityid).subscribe((results: any) => {
      Swal.fire({
        icon: "success",
        title: "Quality Delete Successfully!",
        showConfirmButton: false,
        timer: 3000
      });
      this.router.navigate(['/profile/employee/' + id])
    }, error => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
      });
    });

  }



}
