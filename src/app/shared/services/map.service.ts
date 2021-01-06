import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  readonly mapURL = 'https://www.google.com/maps/place/';
  
  constructor() { }

  goToMap(addr: string){
    const addrUrl = addr.trim().split(' ').join('+');
    const link = this.mapURL + addrUrl;
    window.location.href = link;
  }
}
