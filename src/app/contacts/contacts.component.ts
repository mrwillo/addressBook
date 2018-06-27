import { Component, OnInit, Input} from '@angular/core';
import {Contact} from '../commons/models/contact';
import {ContactService} from '../contact.service';
import {Observable} from 'rxjs';
import {ContactTag} from '../commons/models/ContactTag';
import {Tag} from '@angular/compiler/src/i18n/serializers/xml_helper';
import {TagService} from '../tag.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  @Input() contacts$: Observable<Contact[]>;
  tagsOfContact$: Observable<ContactTag[]>;
  selectedContact: Contact;
  tags: ContactTag[];

  constructor(
    public contactService: ContactService,
    private tagService: TagService
  ) { }

  ngOnInit() {
    this.getContactTag();
  }

  getContactTag(): void {
    this.tagService.getTags().subscribe(tags => this.tags = tags);
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
  tagsOfContact(contact: Contact): ContactTag[] {
    const tagIds = contact.tags.split(',').map(Number);
    contact.tagObjs = this.tags.filter(t => tagIds.indexOf(t.id) > -1);
    return contact.tagObjs;
  }
}
