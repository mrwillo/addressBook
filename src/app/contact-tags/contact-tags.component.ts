import { Component, OnInit, Input } from '@angular/core';
import {TagService} from '../tag.service';
import {ContactTag} from '../commons/models/ContactTag';
import {Contact} from '../commons/models/contact';
import {P} from '@angular/core/src/render3';

@Component({
  selector: 'app-contact-tags',
  templateUrl: './contact-tags.component.html',
  styleUrls: ['./contact-tags.component.css']
})
export class ContactTagsComponent implements OnInit {
  @Input() contact: Contact;
  @Input() tags: ContactTag[];
  selectedTag: ContactTag;

  constructor(
    private tagService: TagService
  ) { }

  ngOnInit() {

    // this.getTags();
    this.initTagCheck();
    this.selectedTag = {id: 0, name: ''};
  }

  initTagCheck() {
    const tags = this.contact.tags.split(',').map(Number);
    console.log(tags);
    // if (tags.length === 0) { return; }
    for (const tag of this.tags) {
      if (tags.indexOf(tag.id) > -1) {
        tag.isCheck = true;
      } else {
        tag.isCheck = false;
      }
    }
  }
  getTags(): void {
    this.tagService.getTags().subscribe(tags => {
      this.tags = tags
      this.initTagCheck();
    });
  }

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
      });
  }

  updateTag($event): void {
    this.tagService.updateTag(this.selectedTag).subscribe(tag => {
      $event.target.value = '';
    });
  }

  editTag(tag: ContactTag): void {
    this.selectedTag = tag;
  }

  changeTagAssign(contact: Contact, tag: ContactTag) {
    this.tagService.changeTagAssign(contact.id, tag.id).subscribe(res => {
      if (res.id === 1) { //assign tag;
        tag.isCheck = true;
        return;
      }
      tag.isCheck = false;
    });
  }

  deleteTag(tag: ContactTag): void {
    this.tagService.deleteTag(tag).subscribe(res => {
      if (res.status) {
        this.tags = this.tags.filter(t => t.id !== tag.id);
      } else {
        tag.error = res.processMessage;
      }
    });
  }
}
