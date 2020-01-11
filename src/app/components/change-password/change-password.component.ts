import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { UsersService } from '../../services/users.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MustMatch } from '../../helpers/must-match.validator';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChangePasswordComponent implements OnInit {
  public userForm = this.formBuilder.group({
    oldPassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(4)]),
  }, {
    validator: MustMatch('password', 'passwordConfirm')
  });

  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>, private route: ActivatedRoute,
              private router: Router, private formBuilder: FormBuilder, private userService: UsersService) {
  }

  ngOnInit() {
  }

  changePassword() {

  }

  public onClose(event: Event): void {
    event.preventDefault();
    this.dialogRef.close(null);
  }

}
