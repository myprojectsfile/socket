import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private url = 'http://localhost:3000';
  public socket;

  constructor() {
    this.socket = io(this.url);
  }

  on(eventName, callback) {
    this.socket.on(eventName, () => {
      callback();
    })
  }

  emit(eventName,data,callback?){
    this.socket.emit(eventName,data,()=>{
      if(callback) callback();
    })
  }
}
