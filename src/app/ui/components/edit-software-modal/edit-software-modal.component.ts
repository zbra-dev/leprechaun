import { Input, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Software, SoftwareRepository } from '../../../repositories/software.repository';
import { NzModalRef } from 'ng-zorro-antd';
import {User} from '../../../repositories/user.repository';
import {Upload, UploadService} from '../../../services/upload.service';

@Component({
  selector: 'app-edit-software-modal',
  templateUrl: './edit-software-modal.component.html',
  styleUrls: ['./edit-software-modal.component.css', '../../../app.component.css']
})
export class EditSoftwareModalComponent implements OnInit {
  angForm: FormGroup;
  selectedFile: File;
  isLoading: boolean = false;
  currentUpload: Upload;

  @Input()
  public model: Software;

  constructor(private softwareRepository: SoftwareRepository, private fb: FormBuilder, private modal: NzModalRef, private uploadService: UploadService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required ],
      version: ['', Validators.required ],
      key: ['', Validators.required]
    });
  }

  async addSoftware() {
    this.isLoading = true;
    if (this.selectedFile) {
      await this.uploadSingle();
      this.model.icon = this.currentUpload.url;
    }
    this.softwareRepository.add(this.model);
    this.modal.destroy();
  }

  clearForm(): void {
    this.angForm.reset();
    this.selectedFile = null;
    this.model.icon = null;
  }

  async editSoftware() {
    this.isLoading = true;
    if (this.selectedFile) {
      await this.uploadSingle();
      this.model.icon = this.currentUpload.url;
    }
    this.softwareRepository.update(this.model);
    this.modal.destroy();
  }

  setSelectedFile(file: File) {
    this.selectedFile = file;
  }

  async uploadSingle() {
    let file = this.selectedFile;
    this.currentUpload = new Upload(file);
    await this.uploadService.pushUpload("software-icons" , this.currentUpload);
  }

  ngOnInit() {
    if (this.model == null) {
      this.model = new Software('', '', '', '');
    } else {
      this.model = new Software(this.model.id, this.model.name, this.model.version, this.model.icon);
    }
  }

}
