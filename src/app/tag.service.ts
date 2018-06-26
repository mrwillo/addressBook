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
}
