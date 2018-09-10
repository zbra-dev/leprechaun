import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Software, SoftwareRepository } from '../../../repositories/software.repository';
import { ModalMediator, ModalType } from '../../../mediator/modal-mediator.component';

@Component({
  selector: 'app-index',
  templateUrl: './software-list.component.html',
  styleUrls: ['./software-list.component.css']
})
export class SoftwareListComponent implements OnInit {
  public softwares: Observable<Software[]>;

  constructor(private softwareService: SoftwareRepository, private modalMediator: ModalMediator) { }

  ngOnInit() {
    this.softwares = this.softwareService.list();
  }

  onDeleteClick(id: string) {
    this.softwareService.delete(id);
  }

  onEditClick(software: Software): void {
    this.modalMediator.createModal("Edit Software", ModalType.software, software);
  }

  onAddNewSoftwareClick(): void {
    this.modalMediator.createModal("Add New Software", ModalType.software, null);
  }

}
