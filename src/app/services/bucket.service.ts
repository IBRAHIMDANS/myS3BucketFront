import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bucket } from '../interfaces/bucket.interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { toLower } from 'lodash';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BucketService {

  private httpOptions;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      })
    };
  }

  public addBucket({ name }: Bucket): Observable<any> {
    return this.httpClient
      .post(`${environment.backEndApi}/bucket`, {
          name: toLower(name),
        },
        this.httpOptions
      )
      .pipe(
        map(res => {
            console.log(res);
            return res;
          },
          catchError(err => {
            return err;
          })
        )
      );
  }
}
