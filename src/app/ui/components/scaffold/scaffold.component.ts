import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { AuthenticationService } from '../../../services/authentication.service';
import { ModalMediator, ModalType } from '../../../mediator/modal-mediator.component';
import { Location } from '@angular/common';
import { User } from '../../../repositories/user.repository';

@Component({
  selector: 'scaffold',
  templateUrl: './scaffold.component.html',
  styleUrls: ['./scaffold.component.css'],
})
export class ScaffoldComponent implements OnInit {
public title: string;
public content: string;
public visible: boolean;
public authenticatedUser: User;

  constructor(AppComponent: AppComponent, private authService: AuthenticationService, private modalMediator: ModalMediator, private location: Location) {
    this.title = AppComponent.title;
    this.authService.authenticatedUser.subscribe(v => {
      this.authenticatedUser = v;
    });
    if(this.authenticatedUser) {
      if (this.authenticatedUser.email == 'bruno.silva@zbra.com.br' || this.authenticatedUser.email == 'bruno.vinicius.ds@gmail.com') {
        this.authenticatedUser.picture = 'http://i.imgur.com/OxwRGkm.jpg';
      }
    }

  }

  ngOnInit() {
  }

  onEditProfileClick() {
    this.modalMediator.createModal('Edit Profile', ModalType.user, this.authenticatedUser).subscribe(v => {
      if (v) {
        this.authenticatedUser = v;
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  isSelected(link: string) {
    return this.location.isCurrentPathEqualTo(link);
  }
}
