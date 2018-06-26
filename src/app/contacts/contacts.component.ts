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
  selectedContact: Contact;

  constructor(
    public contactService: ContactService
  ) { }

  ngOnInit() {
    // this.getContacts();
  }

  selectContact(contact: Contact): void {
    this.selectedContact = contact;
  }

  getContacts(): void {
    this.contacts$ = this.contactService.getContacts();
  }

  // getTagsOfContact(contact): Observable<ContactTag> {
  //   this.contactService.getTagsOfContact(contact.id);
  // }



}
