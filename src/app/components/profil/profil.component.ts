import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { decodeToken } from '../../helpers/token';
import { User } from '../../interfaces/user.interfaces';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  public userForm: FormGroup;
  private disable: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router, private formBuilder: FormBuilder,
              private userService: UsersService, public dialog: MatDialog,
              private changeDetectorRefs: ChangeDetectorRef) {
    this.disable = true;
    this.userForm = new FormGroup({
      nickname: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit() {
    this.user();
  }

  public user() {
    this.userService.getInfos({ uuid: decodeToken().uuid }).subscribe((res: User) => {
      return this.userForm = new FormGroup({
        nickname: new FormControl({ value: res.nickname, disabled: this.disable }, Validators.required),
        email: new FormControl({ value: res.email, disabled: true }, Validators.required)
      });
    }, error => {
      return error;
    });
  }

  public changePassword(e: Event) {
    e.preventDefault();
    this.dialog.open(ChangePasswordComponent, {
      autoFocus: true,
      disableClose: true,
      data: {
        title: 'Change password',
      }
    }).afterClosed().subscribe(res => {
      if (res !== null) {
        this.user();
      }
    });
  }

  submitFrom(e: Event) {
    e.preventDefault();
    return this.userService
      .updateUser({
        uuid: decodeToken().uuid,
        nickname: this.userForm.controls.nickname.value,
        email: this.userForm.controls.email.value
      })
      .subscribe(res => {
        return res;
      }, error => {
        return error;
      }, () => {
        this.cancelForm();
      });
  }

  editForm() {
    this.disable = false;
    this.user();
  }

  cancelForm() {
    this.disable = true;
    this.user();
  }
}
