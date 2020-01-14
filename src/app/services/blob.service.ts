import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
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

  public getBlob(id): Observable<any> {
    return this.httpClient
      .get(`${environment.backEndApi}/blob/${id}`,
        {
          headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }),
          responseType: 'text'
        }
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

  public addBlob(file, blobName?: string): Observable<any> {
    if (blobName) {
      return this.httpClient
        .post(`${environment.backEndApi}/blob?path=${blobName}`, file,
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
    } else {
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

}
