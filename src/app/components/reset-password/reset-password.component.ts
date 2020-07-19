import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { UsersService } from '../../services/users.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public status;
  public load: boolean;
  public changePasswordForm = {
    email: new FormControl('', [Validators.required, Validators.email]),
  };

  constructor(public dialogRef: MatDialogRef<ResetPasswordComponent>, private userService: UsersService) {
  }

  ngOnInit() {
    this.status = undefined;
  }
  onClose(): void {
    this.dialogRef.close();
  }
  public updatePassword(event: Event) {
    event.preventDefault();
    this.load = true;
    return this.userService.sendMailforChangePassword({ email: this.changePasswordForm.email.value }).subscribe(res => {
      this.status = true;
      this.load = false;
      return res;
    }, error => {
      this.status = false;
      this.load = false;
      return error.message;
    });
  }
}
