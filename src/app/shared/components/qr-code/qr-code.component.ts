import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html'
})
export class QrCodeComponent implements OnInit {

  @Input() valueQr: any = {};

  constructor(private modalController:ModalController) { }

  ngOnInit() {
      this.valueQr = JSON.stringify(this.valueQr);
  }
  
  back(){
    this.modalController.dismiss().then().catch();
  }

}
