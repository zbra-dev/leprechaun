import {Component, Input, OnInit} from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { License, LicenseRepository } from '../../../repositories/license.repository';

@Component({
  selector: 'app-licenses-list-modal',
  templateUrl: './licenses-list-modal.component.html',
  styleUrls: ['./licenses-list-modal.component.css', '../../../app.component.css']
})
export class LicensesListModalComponent implements OnInit {
public licenses: License[];
public loading: boolean = true;

  @Input()
  public model: String;

  constructor(private licenseRepository: LicenseRepository, private modal: NzModalRef) { }

  ngOnInit() {
    this.getLicenses();
  }

  onCloseClick() {
    this.modal.destroy();
  }

  async getLicenses() {
    this.loading = true;
    this.licenses = await this.licenseRepository.getUserLicenses(this.model);
    this.loading = false;
  }

  onUnassignClick(license: License) {
    this.licenseRepository.update(license);
    this.getLicenses();
  }
}
