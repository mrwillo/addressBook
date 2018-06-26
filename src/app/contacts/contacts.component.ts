import { Component, OnInit, Input} from '@angular/core';
import {Contact} from '../commons/models/contact';
import {ContactService} from '../contact.service';
import {Observable} from 'rxjs';
import {ContactTag} from '../commons/models/ContactTag';
import {Tag} from '@angular/compiler/src/i18n/serializers/xml_helper';

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

  popupTag(contact: Contact): void {
    contact.isPopup = !contact.isPopup;
  }
  updateTags(contact: Contact, tag: ContactTag): void {
    if (!contact.tags) { contact.tags = []; }
    if (!contact.tags[tag.id]) { contact.tags.push(tag.id); }
  }
  // getTagsOfContact(contact: Contact): Contact[] {
  //   this.contactService.getTagsOfContact(contact.id).
  // }



}
