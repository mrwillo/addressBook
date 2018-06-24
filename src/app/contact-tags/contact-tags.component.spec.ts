import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactTagsComponent } from './contact-tags.component';

describe('ContactTagsComponent', () => {
  let component: ContactTagsComponent;
  let fixture: ComponentFixture<ContactTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
