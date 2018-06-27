import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {ContactTag} from './commons/models/ContactTag';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {ApiResult} from './commons/models/ApiResult';
import {environment} from '../environments/environment';

const mockTags = [
  {id: 1, name: 'Consutant'},
  {id: 2, name: 'Mentor'},
  {id: 3, name: 'Service Provider'},
  {id: 4, name: 'Team member'},
];
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class TagService {
  private host = environment.apiServer;
  private tagUrl = this.host + '/api/tags/';
  constructor(private http: HttpClient) { }

  getTags(): Observable<ContactTag[]> {
    return this.http.get<ApiResult>(this.tagUrl, httpOptions).pipe(
      map(res => res.data)
    );
  }
  addTag (tag: ContactTag): Observable<ContactTag> {
    return this.http.post<ApiResult>(this.tagUrl, tag, httpOptions).pipe(
      map(res => res.data)
    );
  }
  deleteTag(tag: ContactTag): Observable<ApiResult> {
    const url = this.tagUrl + '/' + tag.id;
    return this.http.delete<ApiResult>(url, httpOptions);
  }
  updateTag(tag: ContactTag): Observable<ContactTag> {
    return this.http.put<ApiResult>(this.tagUrl, tag, httpOptions).pipe(
      map(res => res.data)
    );
  }

  changeTagAssign(contactId: number, tagId: number) {
    const url = this.tagUrl + '?contactId=' + contactId + '&tagId=' + tagId;
    return this.http.put<ApiResult>(url, httpOptions);
  }
}
