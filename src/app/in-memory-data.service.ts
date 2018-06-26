import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const contacts = [
      {id: 1, name: 'sanial', phone: '0909002052', email: 'sanial@email.com', skype: 'sanialSkype',
        linkedIn: 'http://linkedIn/duy/86', title:"Director at Sample Compnay" }
    ];
    return {contacts};
  }
}
