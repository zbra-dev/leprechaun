import {Component, ElementRef, EventEmitter, Input, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { User, UserRepository } from '../../../repositories/user.repository';
import { AuthenticationService } from '../../../services/authentication.service';
import { Upload, UploadService } from '../../../services/upload.service';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css', '../../../app.component.css']
})
export class EditUserModalComponent implements OnInit {
  angForm: FormGroup;
  selectedFile: File = null;
  currentUpload: Upload;
  isLoading: boolean = false;

  @ViewChild('pictureFile')
  pictureFile: ElementRef;

  @Input()
  public model: User;

  constructor(private fb: FormBuilder, private modal: NzModalRef, private userRepository: UserRepository, private authService: AuthenticationService,
              private uploadService: UploadService ) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required ],
      picture: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.model == null) {
      this.model = new User('', '', '', '');
    } else {
      this.model = new User(this.model.id, this.model.name, this.model.email, this.model.picture);
    }
  }

  setSelectedFile(file: File) {
    this.selectedFile = file;
  }

  async uploadSingle() {
    let file = this.selectedFile;
    this.currentUpload = new Upload(file);
    await this.uploadService.pushUpload("user-pictures" , this.currentUpload);
  }

  clearForm(): void {
    this.angForm.reset();
    this.selectedFile = null;
    this.model.picture = null;
  }

  async editUser() {
    this.isLoading = true;
    if (this.selectedFile) {
      await this.uploadSingle();
      this.model.picture = this.currentUpload.url;
    }
    this.authService.updateUserProfile(this.model);
    this.userRepository.update(this.model);
    this.modal.destroy(this.model);
  }

}

