import { Component, OnInit } from '@angular/core';
import {Contact} from '../commons/models/contact';
import {ContactService} from '../contact.service';
import {Observable, Subject} from 'rxjs';
import {ContactTag} from '../commons/models/ContactTag';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/internal/operators';
import {TagService} from '../tag.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-contact-search',
  templateUrl: './contact-search.component.html',
  styleUrls: ['./contact-search.component.css']
})
export class ContactSearchComponent implements OnInit {
  contacts: Contact[];
  tags: ContactTag[];
  contacts$: Observable<Contact[]>;
  contactsOfTag$: Observable<Contact[]>;

  private searchTerms = new Subject<string>();

  constructor(
    private contactService: ContactService,
    private tagService: TagService,
  ) { }

  ngOnInit() {
    this.contacts$ = this.searchTerms.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((t: string) => this.contactService.searchContact(t))
    );
    setTimeout(() => { // get all list at begining
      this.search('');
    });
  }

  search(term: string): void {
    if (term.trim() === '#') {
      this.tagService.getTags().subscribe(tags => {
        this.tags = tags;
      });
    } else {
      this.searchTerms.next(term);
    }
  }
  searchByTag(tag: ContactTag): void {
    this.contactsOfTag$ = this.contactService.searchContactByTag(tag);
  }
}
