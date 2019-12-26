import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public error: undefined;
  private hidden: boolean;
  public userForm = {
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  };

  constructor(private route: ActivatedRoute,
              private router: Router, public dialog: MatDialog) {
  }
  resetPassword(event: Event): void {
    event.preventDefault();
    // this.dialog.open(ResetpasswordComponent, {
    //   autoFocus: true,
    //   disableClose: true,
    //   data: {
    //     title: 'Ajouter une location',
    //     id: '1'
    //   }
    // });
  }
  ngOnInit() {
    this.hidden = false;
  }
  public login(e: Event) {
    e.preventDefault();
    this.hidden = true;
    // this.userService.login({ email: this.userForm.email.value, password: this.userForm.password.value }).subscribe(res => {
    //   this.hidden = false;
    //   // @ts-ignore
    //   const token = res.meta.token;
    //   localStorage.setItem('isconnect', 'true');
    //   localStorage.setItem('token', token);
    //   // @ts-ignore
    //   this.router.navigate(['/', 'bien']);
    //   return res;
    // }, error => {
    //   this.hidden = false;
    //   return this.error = error.error;
    // }, () => {
    // });
  }

}
