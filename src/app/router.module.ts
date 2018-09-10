import { Routes } from '@angular/router';
import { LoginComponent } from './ui/pages/login/login.component';
import { AuthenticationGuardService } from './services/authentication-guard.service';
import { SoftwareListComponent } from './ui/pages/software-list/software-list.component';
import { UserListComponent } from './ui/pages/user-list/user-list.component';
import { LicenseListComponent } from './ui/pages/license-list/license-list.component';

export const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'software-list',
    component: SoftwareListComponent,
    canActivate: [AuthenticationGuardService]
  },
  {
    path: 'user-list',
    component: UserListComponent,
    canActivate: [AuthenticationGuardService]
  },
  {
    path: 'license-list',
    component: LicenseListComponent,
    canActivate: [AuthenticationGuardService]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
