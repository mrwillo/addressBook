import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactsComponent} from './contacts/contacts.component';
import {ContactDetailsComponent} from './contact-details/contact-details.component';

const routes: Routes = [
  {path: 'contacts', component: ContactsComponent},
  {path: '', redirectTo: 'contacts', pathMatch: 'full'},
  {path: 'contact/:id', component: ContactDetailsComponent}
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
