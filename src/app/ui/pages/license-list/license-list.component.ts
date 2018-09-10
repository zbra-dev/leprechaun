import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { License, LicenseRepository } from '../../../repositories/license.repository';
import { ModalMediator, ModalType } from '../../../mediator/modal-mediator.component';

@Component({
  selector: 'app-license-list',
  templateUrl: './license-list.component.html',
  styleUrls: ['./license-list.component.css']
})
export class LicenseListComponent implements OnInit {
public licenses: Observable<License[]>;

  constructor(private licenseRepository: LicenseRepository, private modalMediator: ModalMediator) { }

  ngOnInit() {
    this.licenses = this.licenseRepository.list();
  }

  onDeleteClick(id: string) {
    this.licenseRepository.delete(id);
  }

  onEditClick(license: License) {
    this.modalMediator.createModal('Edit License', ModalType.license, license);
  }

  onAddNewLicenseClick() {
    this.modalMediator.createModal('Add License', ModalType.license, null);
  }
}
