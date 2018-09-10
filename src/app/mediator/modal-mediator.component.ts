import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { EditSoftwareModalComponent } from '../ui/components/edit-software-modal/edit-software-modal.component';
import { EditLicenseModalComponent } from '../ui/components/edit-license-modal/edit-license-modal.component';
import { EditUserModalComponent } from '../ui/components/edit-user-modal/edit-user-modal.component';
import { Observable } from 'rxjs';
import { LicensesListModalComponent } from '../ui/components/licenses-list-modal/licenses-list-modal.component';

@Injectable()

export class ModalMediator {

  constructor(private modalService: NzModalService) { }

  createModal(title: string, type: ModalType, model: Object): Observable<any> {
    let content = this.factory(type);
    let ref = this.modalService.create({
        nzTitle: title,
        nzContent: content,
        nzFooter: null,
        nzComponentParams: { model: model }
      });

    return ref.afterClose;
  }

  private factory(type: ModalType): any {
    switch (type) {
      case ModalType.software:
        return EditSoftwareModalComponent;
      case ModalType.license:
        return EditLicenseModalComponent;
      case ModalType.user:
        return EditUserModalComponent;
      case ModalType.licenseList:
        return LicensesListModalComponent;
    }
  }
}

export enum ModalType {
  software, user, license, licenseList
}
