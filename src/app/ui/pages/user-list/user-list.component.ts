import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User, UserRepository} from '../../../repositories/user.repository';
import {ModalMediator, ModalType} from '../../../mediator/modal-mediator.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public users: Observable<User[]>;

  constructor(private userRepository: UserRepository, private modalMediator: ModalMediator) { }

  ngOnInit() {
    this.users = this.userRepository.list();
  }

  onDeleteClick(id: string) {
    this.userRepository.delete(id);
  }

  onLicensesClick(userId: String) {
    this.modalMediator.createModal('Licenses', ModalType.licenseList, userId);
  }
}
