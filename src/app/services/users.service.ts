import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user.interfaces';
import { toLower } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private httpOption;

  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: any) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      })
    };
  }

  public registerUser(
    {
      email,
      nickname,
      password
    }: User): Observable<any> {

    return this.httpClient
      .post(`${environment.backEndApi}/users`, {
          email: toLower(email), nickname, password
        },
        this.httpOption
      )
      .pipe(
        map(res => {
            return res;
          },
          catchError(err => {
            return err;
          })
        )
      );
  }

  public updateUser(
    {
      uuid,
      nickname,
      email
    }: User): Observable<any> {

    return this.httpClient
      .patch(`${environment.backEndApi}/users/${uuid}`, {
          nickname, email
        },
        this.httpOption
      )
      .pipe(
        map(res => {
            return res;
          },
          catchError(err => {
            return err;
          })
        )
      );
  }

  public login(
    {
      email,
      password
    }: User): Observable<any> {

    return this.httpClient
      .post(`${environment.backEndApi}/auth/login`, {
          email: toLower(email), password
        },
        this.httpOption
      )
      .pipe(
        map(res => {
            return res;
          },
          catchError(err => {
            return err;
          })
        )
      );
  }

  public sendMailforChangePassword(
    {
      email,
    }: User): Observable<any> {
    return this.httpClient
      .post(`${environment.backEndApi}/auth/checkPassword`, {
          email: toLower(email),
        },
        this.httpOption
      )
      .pipe(
        map(res => {
            return res;
          },
          catchError(err => {
            return err;
          })
        )
      );
  }

  public getInfos({ uuid }: User): Observable<any> {
    return this.httpClient
      .get(`${environment.backEndApi}/users/${uuid}`,
        this.httpOption
      )
      .pipe(
        map(res => {
            return res;
          },
          catchError(err => {
            return err;
          })
        )
      );
  }
}
