import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { PersonalProfileComponent } from './components/personal-profile/personal-profile.component';
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';

import { CompanySignupComponent } from './components/authentication/company-admin/signup/signup.component';
import { CompanyAdminVerificationComponent } from './components/authentication/company-admin/company-admin-verification/company-admin-verification.component';
import { CompanyAdminDashboardComponent } from './components/companyAdmin/company-admin-dashboard/company-admin-dashboard.component';
import { CompanyAdminLoginComponent } from './components/authentication/company-admin/company-admin-login/company-admin-login.component';
import { EmployeeProfileOnlyforAdminComponent } from './components/companyAdmin/employee-profile-onlyfor-admin/employee-profile-onlyfor-admin.component';
import { SuperLoginComponent } from './components/authentication/super-admin/super-login/super-login.component';
import { SuperAdminDashboardComponent } from './components/superAdmin/super-admin-dashboard/super-admin-dashboard.component';
import { CompanyAdminProfileComponent } from './components/superAdmin/company-admin-profile/company-admin-profile.component';
import { EmployeeListComponent } from './components/superAdmin/employee-list/employee-list.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Company Admin
  { path: 'company-login', component: CompanyAdminLoginComponent },
  { path: 'company-registration', component: CompanySignupComponent },
  { path: 'company-verification/:email', component: CompanyAdminVerificationComponent },
  { path: 'company/admin/dashboard', component: CompanyAdminDashboardComponent },
  { path: 'company/admin/profile/employee/:id', component: EmployeeProfileOnlyforAdminComponent },
  
  
  // Super Admin
  { path: 'super-login', component: SuperLoginComponent },
  { path: 'super/admin/dashboard', component: SuperAdminDashboardComponent },
  { path: 'profile/company/admin/:id', component: CompanyAdminProfileComponent },
  { path: 'employee/list/:id', component: EmployeeListComponent },
  
  
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration/:cname', component: SignupComponent },
  { path: 'registration', component: SignupComponent },
  { path: 'myprofile', component: PersonalProfileComponent },
  { path: 'profile/employee/:id', component: EmployeeProfileComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
