import { Component, OnInit } from '@angular/core';
import {Contact} from '../commons/models/contact';

@Component({
  selector: 'app-contact-search',
  templateUrl: './contact-search.component.html',
  styleUrls: ['./contact-search.component.css']
})
export class ContactSearchComponent implements OnInit {
  contacts: Contact[];

  constructor() { }

  ngOnInit() {
  }

}
