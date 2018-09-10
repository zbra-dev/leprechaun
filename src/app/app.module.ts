import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { appRoutes } from './router.module';
import { RouterModule } from '@angular/router';
import { SoftwareRepository } from './repositories/software.repository';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthenticationService } from './services/authentication.service';
import { LoginComponent } from './ui/pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { UserRepository } from './repositories/user.repository';
import { SoftwareListComponent } from './ui/pages/software-list/software-list.component';
import { ScaffoldComponent } from './ui/components/scaffold/scaffold.component';
import { EditSoftwareModalComponent } from './ui/components/edit-software-modal/edit-software-modal.component';
import { ModalMediator } from './mediator/modal-mediator.component';
import { UserListComponent } from './ui/pages/user-list/user-list.component';
import { LicenseListComponent } from './ui/pages/license-list/license-list.component';
import { LicenseRepository } from './repositories/license.repository';
import { EditLicenseModalComponent } from './ui/components/edit-license-modal/edit-license-modal.component';
import { EditUserModalComponent } from './ui/components/edit-user-modal/edit-user-modal.component';
import { LicensesListModalComponent } from './ui/components/licenses-list-modal/licenses-list-modal.component';
import { UploadService } from './services/upload.service';
import { ImageUploadComponent } from './ui/components/image-upload/image-upload.component';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SoftwareListComponent,
    ScaffoldComponent,
    EditSoftwareModalComponent,
    UserListComponent,
    LicenseListComponent,
    EditLicenseModalComponent,
    EditUserModalComponent,
    LicensesListModalComponent,
    ImageUploadComponent
  ],
  entryComponents: [
    EditSoftwareModalComponent,
    EditLicenseModalComponent,
    EditUserModalComponent,
    LicensesListModalComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgZorroAntdModule
  ],
  providers: [SoftwareRepository, UserRepository, LicenseRepository, AuthenticationService, UploadService, ModalMediator, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
