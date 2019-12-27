import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { UsersService } from '../../services/users.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public status;
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

    // this.userService.sendMailforChangePassword(this.changePasswordForm.email.value).subscribe(res => {
    //   this.status = true;
    //   return res;
    // }, error => {
    //   this.status = false;
    //   return error.message;
    // });
  }
}
