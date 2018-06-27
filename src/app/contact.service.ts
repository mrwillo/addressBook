import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {Contact} from './commons/models/contact';
import {ContactTag} from './commons/models/ContactTag';
import {ApiResult} from './commons/models/ApiResult';
import {environment} from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'})
export class ContactService {
  private host = environment.apiServer;
  private contactUrl = this.host + '/api/contact/';  // URL to web api
  private tagUrl = '/api/tags';

  constructor(private http: HttpClient) {
  }


  searchContact(term: string): Observable<Contact[]> {
    if (!term.trim()) {
      return of([]);
    }
    // return of(mockContacts);
    const url = this.contactUrl + '?tagId=0&keyword=' + term;
    return this.http.get<ApiResult>(url, httpOptions).pipe(
      map(res => res.data),
      catchError(this.handleError('list contact', []))
    );
  }

  searchContactByTag(tag: ContactTag): Observable<Contact[]> {
    const url = this.contactUrl + '?keyword=&tagId=' + tag.id;
    return this.http.get<ApiResult>(url, httpOptions).pipe(
      map(res => res.data)
    );
  }

  getContact(id: number): Observable<Contact> {
    const url = this.contactUrl + '/' + id;
    return this.http.get<ApiResult>(url, httpOptions).pipe(
      map(res => res.data)
    );
  }



  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
