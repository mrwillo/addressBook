import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Contact } from './commons/models/contact';
import {ContactTag} from './commons/models/ContactTag';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const mockTags = [
  {id: 1, name: 'Consutant'},
  {id: 2, name: 'Mentor'},
  {id: 3, name: 'Service Provider'},
  {id: 4, name: 'Team member'},
];
const mockContacts = [
  {id: 1, name: 'sanial', phone: '0909002052',
    email: 'sanial@email.com',
    skype: 'sanialSkype',
    linkedIn: 'http://linkedIn/duy/86',
    title: 'Director at Sample Compnay' },
  {id: 2, name: 'sanial', phone: '0909002052',
    email: 'sanial@email.com',
    skype: 'sanialSkype',
    linkedIn: 'http://linkedIn/duy/86',
    title: 'Director at Sample Compnay' },
  {id: 3, name: 'sanial', phone: '0909002052',
    email: 'sanial@email.com',
    skype: 'sanialSkype',
    linkedIn: 'http://linkedIn/duy/86',
    title: 'Director at Sample Compnay' }
];

@Injectable({ providedIn: 'root' })
export class ContactService {

  private contactUrl = 'api/contacts';  // URL to web api
  private tagUrl = 'api/tags';

  constructor(
    private http: HttpClient) { }

  /** GET heroes from the server */
  getContacts (): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactUrl)
      .pipe(
        catchError(this.handleError<Contact[]>('getContacts', []))
      );
  }

  searchContact(term: string): Observable<Contact[]> {
    if (!term.trim()) {
      return of([]);
    }
    return of(mockContacts);
  }

  getTagsOfContact(id: number): Observable<ContactTag[]> {
    return of(mockTags);
  }


  searchContactByTag(tag: ContactTag): Observable<Contact[]> {
    return of(mockContacts.splice(0, 2));
  }
  getContact(id: number): Observable<Contact> {
    return of(mockContacts.find(c => c.id === id));
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
