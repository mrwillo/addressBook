import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {TagService} from '../tag.service';
import {ContactTag} from '../commons/models/ContactTag';
import {Contact} from '../commons/models/contact';
import {TagChangeEvent} from '../commons/models/TagChangeEvent';
import {Events} from '../commons/Events';

@Component({
  selector: 'app-contact-tags',
  templateUrl: './contact-tags.component.html',
  styleUrls: ['./contact-tags.component.css']
})
export class ContactTagsComponent implements OnInit {
  @Input() contact: Contact;
  @Input() tags: ContactTag[];
  @Output() tagChanged = new EventEmitter<TagChangeEvent>();
  selectedTag: ContactTag;
  editingTag: ContactTag;

  constructor(
    private tagService: TagService
  ) { }

  ngOnInit() {
    this.initTagCheck();
    this.selectedTag = {id: 0, name: ''};
  }

  /**
   * Function to Emit event to parent component
   * @param {ContactTag} tag
   * @param {Contact} contact
   * @param {string} type
   */
  onTagChange(tag: ContactTag, contact: Contact, type: string) {
    this.tagChanged.emit({tag: tag, type: type, contact: contact});
  }

  /**
   * If current contact has this tag, than mark this tag as checked
   */
  initTagCheck() {
    const tags = this.contact.tags.split(',').map(Number);
    // if (tags.length === 0) { return; }
    for (const tag of this.tags) {
      if (tags.indexOf(tag.id) > -1) {
        tag.isCheck = true;
      } else {
        tag.isCheck = false;
      }
    }
  }

  /**
   * Add new tag and Assign Tag to Contact
   * @param $event
   * @param {string} name
   */
  addTag($event, name: string): void {
    if ($event.keyCode !== 13) { return; }
    if (this.selectedTag.id > 0 ) {
      this.updateTag($event);
      return;
    }
    name = name.trim();
    if (!name) { return; }
    this.tagService.addTag({ name } as ContactTag)
      .subscribe(tag => {
        this.tags.push(tag);
        $event.target.value = '';
        // this.onTagChange(tag, this.contact, Events.addTag);
        this.changeTagAssign(this.contact, tag);
      });
  }

  /**
   * Update Tag information
   * @param $event
   */
  updateTag($event): void {
    this.tagService.updateTag(this.selectedTag).subscribe(tag => {
      $event.target.value = '';
      this.editingTag.name = tag.name;
    });
  }

  /**
   * Set Tag is in edit mode
   * @param {ContactTag} tag
   */
  editTag(tag: ContactTag): void {
    this.selectedTag = Object.create(tag);
    this.selectedTag.id = tag.id;
    this.editingTag = tag;
  }

  /**
   * Assign/Remove tag To/From contact
   * @param {Contact} contact
   * @param {ContactTag} tag
   */
  changeTagAssign(contact: Contact, tag: ContactTag) {
    this.tagService.changeTagAssign(contact.id, tag.id).subscribe(res => {
      if (res.id === 1) { // assign tag;
        tag.isCheck = true;
        this.onTagChange(tag, this.contact, Events.assignTag);
        return;
      }
      tag.isCheck = false;
      this.onTagChange(tag, this.contact, Events.removeTag);
    });
  }

  /**
   * Delete Tag
   * @param {ContactTag} tag
   */
  deleteTag(tag: ContactTag): void {
    this.tagService.deleteTag(tag).subscribe(res => {
      if (res.status) {
        this.tags = this.tags.filter(t => t.id !== tag.id);
        this.onTagChange(tag, this.contact, Events.deleteTag);
      } else {
        tag.error = res.processMessage;
        setTimeout(() => {
          tag.error = '';
        }, 2000);
      }
    });
  }
}
