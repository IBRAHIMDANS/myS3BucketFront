import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { decodeToken } from '../../helpers/token';
import { User } from '../../interfaces/user.interfaces';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  public userForm = this.formBuilder.group({
    nickname: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private route: ActivatedRoute,
              private router: Router, private formBuilder: FormBuilder, private userService: UsersService) {
  }

  ngOnInit() {
    this.userService.getInfos({ uuid: decodeToken().uuid }).subscribe((res: User) => {
      return this.userForm.setValue({ nickname: res.nickname, email: res.email });
    }, error => {
      console.log(error);
      return error;
    });
  }

  changePassword() {
    return this.router.navigate(['/', 'changePassword']);
  }

  submitFrom(e: Event) {
    e.preventDefault();
    // return this.userService
    //   .registerUser({
    //     nickname: this.userForm.value.nickname,
    //     password: this.userForm.value.password,
    //     passwordConfirm: this.userForm.value.passwordConfirm,
    //     email: this.userForm.value.email
    //   })
    //   .subscribe(res => {
    //     // console.log(res);
    //     // localStorage.setItem('token', res.meta.token);
    //     this.router.navigate(['/', 'login']);
    //     return res;
    //   }, error => {
    //     console.log(error);
    //     this.hidden = false;
    //     this.error = error;
    //     setTimeout(() => {
    //       this.error = undefined;
    //     }, 2000);
    //     return error;
    //   }, () => {
    //     this.hidden = false;
    //   });
  }
}
