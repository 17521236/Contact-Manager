import { Injectable } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';


@Injectable({
  providedIn: 'root'
})
export class CallService {

  constructor(private callNumber: CallNumber) {
  }

  async call(phoneNum: string){
    console.log('calling to ',phoneNum);
    return this.callNumber.callNumber(phoneNum, true);
  }
}
