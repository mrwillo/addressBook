import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {ContactTag} from './commons/models/ContactTag';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ApiResult} from './commons/models/ApiResult';

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
  private tagUrl = 'http://localhost:23789/api/tags/';
  constructor(private http: HttpClient) { }

  getTags(): Observable<ContactTag[]> {
    return this.http.get<ApiResult>(this.tagUrl, httpOptions).pipe(
      map(res => res.data),
    );
  }
  addTag (tag: ContactTag): Observable<ContactTag> {
    const id = Math.floor(Math.random() * 100);
    return of({id: id, name: tag.name});
  }
  deleteTag(tag: ContactTag): Observable<any> {
    return of();
  }
  updateTag(tag: ContactTag): Observable<ContactTag>{
    return of(tag);
  }
}
