import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bucket } from '../interfaces/bucket.interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { toLower } from 'lodash';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlobService {
  private httpOptions;
  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      })
    };
  }
  public addBlob(file): Observable<any> {
    return this.httpClient
      .post(`${environment.backEndApi}/blob`, file,
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
