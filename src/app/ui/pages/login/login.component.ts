import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private redirectUrl: string = null;

  constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
  }

  signInWithGoogle() {
    if (this.redirectUrl == null) {
      this.authService.signInWithGoogle()
        .then((res) => this.router.navigate(['/software-list']));
    } else {
      this.authService.signInWithGoogle()
        .then((res) => {
          this.router.navigate([this.redirectUrl]);
          this.redirectUrl = null;
        });
    }
  }

  isLoggedIn(): boolean {
    if (this.authService.isLoggedIn()) {
      if (this.redirectUrl != null) {
        this.router.navigate([this.redirectUrl]);
        return true;
      }
      this.router.navigate(['/software-list']);
      return true
    }
    return false;
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.redirectUrl = params['redirect'];
    });
  }

  compareFn(a, b) {
    return (a.id == b.id);
  }

}
