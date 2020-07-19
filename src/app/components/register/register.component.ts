import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MustMatch } from '../../helpers/must-match.validator';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  public error: any;
  public hidden: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router, private formBuilder: FormBuilder, private userService: UsersService) {
  }

  public checkPasswords(): boolean {
    return this.userForm.controls.password.value === this.userForm.controls.passwordConfirm.value;
  }

  ngOnInit() {
    this.checkPasswords();
    this.hidden = false;
  }

  submitFrom(e: Event) {
    e.preventDefault();
    this.hidden = true;
    return this.userService
      .registerUser({
        nickname: this.userForm.value.nickname,
        password: this.userForm.value.password,
        passwordConfirm: this.userForm.value.passwordConfirm,
        email: this.userForm.value.email
      })
      .subscribe(res => {
        this.router.navigate(['/', 'login']);
        return res;
      }, error => {
        console.log(error);
        this.hidden = false;
        this.error = error;
        setTimeout(() => {
          this.error = undefined;
        }, 2000);
        return error;
      }, () => {
        this.hidden = false;
      });
  }

}
