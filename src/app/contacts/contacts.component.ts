import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {Location} from '@angular/common';
import {Contact} from '../commons/models/contact';
import {ContactService} from '../contact.service';
import {Observable} from 'rxjs';
import {ContactTag} from '../commons/models/ContactTag';
import {TagService} from '../tag.service';
import {Router, RouterLink} from '@angular/router';
import {TagChangeEvent} from '../commons/models/TagChangeEvent';
import {Events} from '../commons/Events';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnChanges {
  @Input() contacts$: Observable<Contact[]>;
  @Input() contactsOfTag$: Observable<Contact[]>;
  selectedContact: Contact;
  currentContact: Contact;
  tags: ContactTag[];
  contacts: Contact[];
  mapTag: Object;

  constructor(
    private contactService: ContactService,
    private tagService: TagService,
  ) { }

  ngOnInit() {
    this.getContactTag();
  }

  /**
   * Source of list contact can come form keyword or by tagID
   */
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

  /**
   * Event emitted from Tag popup to update list tag without reload it.
   * Make UI more responsible
   * @param {boolean} agreed
   */
  onTagChange(data: TagChangeEvent) {
    const contact = this.contacts.find(c => c.id === data.contact.id);
    switch (data.type) {
      case Events.addTag:
        contact.tags = contact.tags + ',' + data.tag.id;
        break;
      case Events.deleteTag:
        this.tags = this.tags.filter(t => t.id !== data.tag.id)
        break;
      case Events.removeTag:
        contact.tags = contact.tags.split(',').filter(i => i !== data.tag.id + '').join(',');
        break;
      case Events.assignTag:
        contact.tags = contact.tags + ',' + data.tag.id;
        break;
      default:
        break;
    }
    this.mapTag[data.tag.id] = data.tag;
  }

  /**
   * Build map of tag, to easy to integrate receive information of tag
   */
  getContactTag(): void {
    this.tagService.getTags().subscribe(tags => {
      this.mapTag = {};
      for (const tag of tags) {
        this.mapTag[tag.id + ''] = tag;
      }
      this.tags = tags;
    });
  }

  /**
   * Select the contact, change the navigation to that selected contact;
   * @param $event
   * @param {Contact} contact
   */
  selectContact($event, contact: Contact): void {
    if ($event.target.tagName === 'BUTTON') { return; }
    // this.router.navigateByUrl('/contact/' + contact.id);
    this.selectedContact = contact;
  }

  /**
   * Open/Close Tag popup
   * @param $event
   * @param {Contact} contact
   */
  popupTag($event, contact: Contact): void {
    this.currentContact === contact ? this.currentContact = null : this.currentContact = contact;
  }
}
