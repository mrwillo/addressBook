import { Component, OnInit, Input} from '@angular/core';
import {Contact} from '../commons/models/contact';
import {ContactService} from '../contact.service';
import {Observable} from 'rxjs';
import {ContactTag} from '../commons/models/ContactTag';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  @Input() contacts$: Observable<Contact[]>;
  tagsOfContact$: Observable<ContactTag[]>;

  constructor(
    public contactService: ContactService
  ) { }

  ngOnInit() {
    //this.getContacts();
  }

  // getContacts(): void {
  //   this.contactService.getContacts().subscribe(contacts => {
  //     this.contacts = contacts;
  //   });
  // }

  // getTagsOfContact(contact): Observable<ContactTag> {
  //   this.contactService.getTagsOfContact(contact.id);
  // }



}
