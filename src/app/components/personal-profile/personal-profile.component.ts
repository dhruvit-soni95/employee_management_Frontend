import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2'
import Compressor from 'compressorjs';

@Component({
  selector: 'app-personal-profile',
  templateUrl: './personal-profile.component.html',
  styleUrls: ['./personal-profile.component.css']
})
export class PersonalProfileComponent implements OnInit {
  imageBase64;


  constructor(private fb: FormBuilder, private router: Router, private authservice: AuthenticationService) {
    this.skillsForm = this.fb.group({
      skills: this.fb.array([this.createSkill()])
    });
  }


  existingSkills: string[] = ['Angular', 'TypeScript'];

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
    const skillsArray = this.skills.value;

    let permission = localStorage.getItem('clienttokenEmail');
    this.authservice.updatePersonalSkills(permission, this.skills.value).subscribe((results: any) => {
      Swal.fire({
        icon: "success",
        title: "Skills Update Successfully!",
        showConfirmButton: false,
        timer: 3000
      });
      this.router.navigate(['/myprofile'])
    }, error => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
      });
    });
  }


  public personalData;
  public allQualities;
  public personalDataSKILLS;
  public profileIMG;
  arrayOfObjects: { name: string }[] = [];
  ngOnInit(): void {
    let permission = localStorage.getItem('clienttokenEmail');
    if (!permission) {
      this.router.navigate(['/login'])
    }

    this.authservice.getPersonalData(permission).subscribe((results: any) => {
      this.personalData = results.token
      this.personalDataSKILLS = results.skills
      if(this.personalDataSKILLS !=""){
        const namesArray = this.personalData.skills.split(', ').map(name => name.trim());
        this.setSkills(namesArray);
      }

      this.profileIMG = this.personalData.profile_image
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



      this.authservice.getQuality(this.personalData.email).subscribe((results: any) => {
        this.allQualities = results.token
      }, error => {
      });

    }, error => {
    });


  }


  updatePersonalData() {
    let permission = localStorage.getItem('clienttokenEmail');
    this.authservice.updatePersonalData(permission, this.profile.value).subscribe((results: any) => {
      Swal.fire({
        icon: "success",
        title: "Data Update Successfully!",
        showConfirmButton: false,
        timer: 3000
      });
      this.router.navigate(['/myprofile'])
    }, error => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
      });
    });
  }


  onFileChange(event: Event) {
    let permission = localStorage.getItem('clienttokenEmail');
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      new Compressor(file, {
        quality: 0.6,
        maxWidth: 800,
        maxHeight: 800,
        success: (compressedResult) => {
          const reader = new FileReader();
          reader.onload = (e: ProgressEvent<FileReader>) => {
            this.imageBase64 = e.target?.result;


            this.authservice.updateProfileImage(permission, this.imageBase64).subscribe((results: any) => {
              Swal.fire({
                icon: "success",
                title: "Image Update Successfully!",
                showConfirmButton: false,
                timer: 3000
              });
              this.router.navigate(['/myprofile'])
            }, error => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!"
              });
            });
            this.router.navigate(['/myprofile'])
          };
          reader.readAsDataURL(compressedResult);
        },
        error: (err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Image Compression!"
          });
        }
      });
    }
  }

}
