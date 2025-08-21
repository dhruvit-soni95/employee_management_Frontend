import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/parts/header/header.component';
import { FooterComponent } from './components/parts/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { PersonalProfileComponent } from './components/personal-profile/personal-profile.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';



import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';
import { CompanySignupComponent } from './components/authentication/company-admin/signup/signup.component';
import { CompanyAdminVerificationComponent } from './components/authentication/company-admin/company-admin-verification/company-admin-verification.component';
import { CompanyAdminDashboardComponent } from './components/companyAdmin/company-admin-dashboard/company-admin-dashboard.component';
import { CompanyAdminLoginComponent } from './components/authentication/company-admin/company-admin-login/company-admin-login.component';
import { CompanyadminHeaderComponent } from './components/companyAdmin/parts/companyadmin-header/companyadmin-header.component';
import { CompanyadminFooterComponent } from './components/companyAdmin/parts/companyadmin-footer/companyadmin-footer.component';
import { EmployeeProfileOnlyforAdminComponent } from './components/companyAdmin/employee-profile-onlyfor-admin/employee-profile-onlyfor-admin.component';
import { SuperSignupComponent } from './components/authentication/super-admin/super-signup/super-signup.component';
import { SuperLoginComponent } from './components/authentication/super-admin/super-login/super-login.component';
import { SuperAdminDashboardComponent } from './components/superAdmin/super-admin-dashboard/super-admin-dashboard.component';
import { SuperadminHeaderComponent } from './components/superAdmin/parts/superadmin-header/superadmin-header.component';
import { SuperadminFooterComponent } from './components/superAdmin/parts/superadmin-footer/superadmin-footer.component';
import { CompanyAdminProfileComponent } from './components/superAdmin/company-admin-profile/company-admin-profile.component';
import { EmployeeListComponent } from './components/superAdmin/employee-list/employee-list.component';


import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    PersonalProfileComponent,
    EmployeeProfileComponent,
    CompanySignupComponent,
    CompanyAdminVerificationComponent,
    CompanyAdminDashboardComponent,
    CompanyAdminLoginComponent,
    CompanyadminHeaderComponent,
    CompanyadminFooterComponent,
    EmployeeProfileOnlyforAdminComponent,
    SuperSignupComponent,
    SuperLoginComponent,
    SuperAdminDashboardComponent,
    SuperadminHeaderComponent,
    SuperadminFooterComponent,
    CompanyAdminProfileComponent,
    EmployeeListComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    RecaptchaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
