import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {ContactTag} from './commons/models/ContactTag';

const mockTags = [
  {id: 1, name: 'Consutant'},
  {id: 2, name: 'Mentor'},
  {id: 3, name: 'Service Provider'},
  {id: 4, name: 'Team member'},
];

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor() { }

  getTags(): Observable<ContactTag[]> {
    return of(mockTags);
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
