import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RecentPageRoutingModule } from './recent-routing.module';
import { RecentPage } from './recent.page';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ContactAddComponent } from 'src/app/shared/components/contact-add/contact-add.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecentPageRoutingModule,
    SharedModule
  ],
  declarations: [
    RecentPage
  ],
  providers:[BarcodeScanner]
})
export class RecentPageModule {}
