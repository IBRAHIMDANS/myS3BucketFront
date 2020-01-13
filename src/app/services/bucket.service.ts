import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bucket } from '../interfaces/bucket.interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { toLower } from 'lodash';
import { catchError, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BucketService {

  private httpOptions;
  public urlParam;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute,
    private router: Router) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      })
    };
    this.urlParam = this.router.routerState.snapshot.url.split('/').pop().toString();
  }

  public addBucket({ name }: Bucket): Observable<any> {
    if (this.urlParam === 'bucket') {
      return this.httpClient
        .post(`${environment.backEndApi}/bucket`, {
            name: toLower(name),
          },
          this.httpOptions
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
    } else {

    }
  }
  public editBucket({id, name }: Bucket): Observable<any> {
    if (this.urlParam === 'bucket') {
      return this.httpClient
        .put(`${environment.backEndApi}/bucket/${id}`, {
            name: toLower(name),
          },
          this.httpOptions
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
    } else {

    }
  }
  public deleteBucket({id }: Bucket): Observable<any> {
    if (this.urlParam === 'bucket') {
      return this.httpClient
        .delete(`${environment.backEndApi}/bucket/${id}`,
          this.httpOptions
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
    } else {
      
    }
  }
  public getAllBucket(): Observable<any> {
    return this.httpClient
      .get(`${environment.backEndApi}/bucket`,
        this.httpOptions
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
  public getBucketById({id }: Bucket): Observable<any> {
    return this.httpClient
      .get(`${environment.backEndApi}/bucket/${id}`,
        this.httpOptions
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
