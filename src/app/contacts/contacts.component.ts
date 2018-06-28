import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {Location} from '@angular/common';
import {Contact} from '../commons/models/contact';
import {ContactService} from '../contact.service';
import {Observable} from 'rxjs';
import {ContactTag} from '../commons/models/ContactTag';
import {TagService} from '../tag.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnChanges {
  @Input() contacts$: Observable<Contact[]>;
  @Input() contactsOfTag$: Observable<Contact[]>;
  tagsOfContact$: Observable<ContactTag[]>;
  selectedContact: Contact;
  tags: ContactTag[];
  contacts: Contact[];
  mapTag: Object;

  constructor(
    private contactService: ContactService,
    private tagService: TagService,
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getContactTag();
  }
  ngOnChanges() {
    this.contacts$.subscribe(contacts => {
      this.contacts = contacts;
    });
    if (this.contactsOfTag$) {
      this.contactsOfTag$.subscribe(contacts => {
        this.contacts = contacts;
      });
    }
  }

  getContactTag(): void {
    this.tagService.getTags().subscribe(tags => {
      this.mapTag = {};
      for (const tag of tags) {
        this.mapTag[tag.id + ''] = tag;
      }
      console.log(this.mapTag);
      this.tags = tags;
    });
  }
  selectContact($event, contact: Contact): void {
    if ($event.target.tagName === 'BUTTON') { return; }
    this.router.navigateByUrl('/contact/' + contact.id);
    this.selectedContact = contact;
  }

  popupTag($event, contact: Contact): void {
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
