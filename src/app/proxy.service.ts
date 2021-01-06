import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class ProxyService {

  constructor() { 
  }
  
  //  set all
  async setObject(key: string, arrValue: any[]) {
    await Storage.set({
      key,
      value: JSON.stringify(arrValue)
    }).then().catch();
  }

  // get all
  async getObject(key: string) {
    const ret = await Storage.get({ key });
    return JSON.parse(ret.value);
  }

  // remove all
  async removeObject(key: string) {
    await Storage.remove({ key });
  }

  // getOne
  async getOne(id, key) {
    let obj = await this.getObject(key);
    let result = obj.find(x => x.id === id);
    return result;
  }
  // add
  async create(item, key) {
    let obj = await this.getObject(key);
    const id = new Date().getTime();
    item = { id, ...item };
    obj = obj ? obj : [];
    obj.push(item);
    this.setObject(key, obj);
  }

  // update
  async update(item, key) {
    let obj = await this.getObject(key);
    obj[obj.findIndex(x => x.id === item.id)] = item;
    this.setObject(key, obj);
  }

  // delete
  async delete(id, key) {
    let obj = await this.getObject(key);
    obj.splice(obj.findIndex(x => x.id === id), 1);
    this.setObject(key, obj);
  }
}
