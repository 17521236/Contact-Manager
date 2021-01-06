import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactItemComponent } from './components/contact-item/contact-item.component';
import { PhonePipe } from './pipes/phone.pipe';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { ContactAddComponent } from './components/contact-add/contact-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NgxQRCodeModule
  ],
  declarations: [
    ContactDetailComponent,
    ContactItemComponent,
    ContactAddComponent,
    PhonePipe,
    ContactEditComponent,
    QrCodeComponent,
    SearchComponent
  ],
  exports: [
    ContactItemComponent
  ]
})
export class SharedModule { }
