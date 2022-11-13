import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data=[];

  constructor() { }

  setData(id, data) {
    this.data[id] = data;
    // console.log('set data', this.data);

  }

  getData(id) {
    // this.storage.setItem('home', this.data);
    // console.log('get data', this.data);
    return this.data[id];
  }
}
