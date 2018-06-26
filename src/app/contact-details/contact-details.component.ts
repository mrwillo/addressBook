import { Component, OnInit, Input } from '@angular/core';
import {Contact} from '../commons/models/contact';
import {ContactService} from '../contact.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  @Input() contact: Contact;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getContact();
  }

  getContact(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.contactService.getContact(id)
      .subscribe(contact => this.contact = contact);
  }

}
