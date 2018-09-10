import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {User, UserRepository} from '../../../repositories/user.repository';
import {License, LicenseRepository} from '../../../repositories/license.repository';
import {Software, SoftwareRepository} from '../../../repositories/software.repository';
import {NzModalRef} from 'ng-zorro-antd';

@Component({
  selector: 'app-edit-license-modal',
  templateUrl: './edit-license-modal.component.html',
  styleUrls: ['./edit-license-modal.component.css', '../../../app.component.css']
})
export class EditLicenseModalComponent implements OnInit {
  angForm: FormGroup;
  users: Observable<User[]>;
  softwares: Observable<Software[]>;

  @Input()
  public model: License;

  constructor(private licenseRepository: LicenseRepository, private softwareRepository: SoftwareRepository,
              private userRepository: UserRepository, private fb: FormBuilder, private modal: NzModalRef) {
    this.createForm();
  }

  ngOnInit() {
    this.users = this.userRepository.list();
    this.softwares = this.softwareRepository.list();
    if (this.model == null) {
      this.model = new License('', '', null, null);
    } else {
      this.model = new License(this.model.id, this.model.key, this.model.software, this.model.user);
    }
  }

  createForm() {
    this.angForm = this.fb.group({
      key: ['', Validators.required ],
      software: ['', Validators.required ],
      user: ['', Validators.required]
    });
  }

  addLicense() {
    this.licenseRepository.add(this.model);
    this.modal.destroy();
  }

  editLicense() {
    this.licenseRepository.update(this.model);
    this.modal.destroy();
  }

  clearForm(): void {
    this.angForm.reset();
  }

  compareFn(a: User, b: User) {
    if (a == null || b == null) {
      return false;
    }
    return (a.id == b.id);
  }
}
