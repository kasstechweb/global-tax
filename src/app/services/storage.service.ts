import { Injectable } from '@angular/core';

import {Storage} from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // private _storage: Storage | null = null;

  constructor(
    private storage: Storage,
  ) {
    this.init();
  }
  //
  async init() {
    const storage = await this.storage.create();
  }

  getStorageData(key){
    return this.storage.get(key).then((res)=>{
      return res
    })
  }

  setStorageData(key, data) {
    return this.storage.set(key,JSON.stringify(data)).then((res)=>{
      return res
    })
  }

  removeStorageData(key){
    return this.storage.remove(key).then((res)=>{
      return res
    })
  }

  clearStorage(){
    this.storage.clear();
  }
}
