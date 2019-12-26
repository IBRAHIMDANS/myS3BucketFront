import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MustMatch } from '../../helpers/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public userForm = this.formBuilder.group({
    nickname: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(4)]),
  }, {
    validator: MustMatch('password', 'passwordConfirm')
  });
  private hidden: boolean;

  constructor(private formBuilder: FormBuilder) {
  }

  public checkPasswords(): boolean {
    return this.userForm.controls.password.value === this.userForm.controls.passwordConfirm.value;
  }

  ngOnInit() {
    this.checkPasswords();
    this.hidden = false;
  }

}
