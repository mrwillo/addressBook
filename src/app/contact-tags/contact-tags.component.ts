import { Component, OnInit, Input } from '@angular/core';
import {TagService} from '../tag.service';
import {ContactTag} from '../commons/models/ContactTag';
import {Contact} from '../commons/models/contact';

@Component({
  selector: 'app-contact-tags',
  templateUrl: './contact-tags.component.html',
  styleUrls: ['./contact-tags.component.css']
})
export class ContactTagsComponent implements OnInit {
  @Input() contact: Contact;
  tags: ContactTag[];
  selectedTag: ContactTag;

  constructor(
    private tagService: TagService
  ) { }

  ngOnInit() {
    this.getTags();
    this.selectedTag = {id: 0, name: ''};
  }

  getTags(): void {
    this.tagService.getTags().subscribe((tags => this.tags = tags));
  }

  addTag($event, name: string): void {
    if ($event.keyCode !== 13) { return; }
    if (this.selectedTag) {
      this.updateTag();
      return;
    }
    name = name.trim();
    if (!name) { return; }
    this.tagService.addTag({ name } as ContactTag)
      .subscribe(tag => {
        this.tags.push(tag);
      });
  }

  updateTag(): void {
    this.tagService.updateTag(this.selectedTag).subscribe();
  }

  editTag(tag: ContactTag): void {
    this.selectedTag = tag;
  }

  deleteTag(tag: ContactTag): void {
    this.tagService.deleteTag(tag).subscribe();
    this.tags = this.tags.filter(t => t.id !== tag.id);
  }
}
