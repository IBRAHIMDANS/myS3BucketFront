import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { UsersService } from '../../services/users.service';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public error: undefined;
  public hidden: boolean;
  public userForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
              private router: Router, public dialog: MatDialog, private userService: UsersService,
              @Inject(PLATFORM_ID) private platformId: any) {
  }

  resetPassword(event: Event): void {
    event.preventDefault();
    this.dialog.open(ResetPasswordComponent, {
      autoFocus: true,
      disableClose: true,
      data: {
        title: 'Reset  password',
      }
    });
  }

  ngOnInit() {
    this.hidden = false;
    if (this.error) {
      setTimeout(() => {
        console.log(this.error);
        this.error = undefined;
      }, 100);
    }
  }

  public login(e: Event) {
    e.preventDefault();
    this.hidden = true;
    return this.userService
      .login({
        email: this.userForm.controls.email.value,
        password: this.userForm.controls.password.value
      }).subscribe(res => {
        this.hidden = false;
        this.router.navigate(['/', 'home']);
        if (isPlatformBrowser(this.platformId)) {
          return localStorage.setItem('token', res.meta.token);
        }
      }, error => {
        console.log(error);
        this.error = error;
        this.hidden = false;
        setTimeout(() => {
          this.error = undefined;
        }, 2000);
        return error;
      }, () => {
      });
  }

}
