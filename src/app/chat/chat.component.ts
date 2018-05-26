import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  username = '';
  connectedUsers = [];
  message = '';
  messages = [];

  constructor(private socketService: SocketService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.username = this.route.snapshot.params['username'];

    this.socketService.emit('join', { username: this.username });

    this.socketService.socket.on('all-users', (data) => {
      data = _.filter(data, (userObj) => {
        return userObj.username != this.username;
      });
      this.connectedUsers = data;
    });

    this.socketService.socket.on('message-received', (newMessage) => {
      this.messages.push(newMessage);
    });

  }

  sendMessage() {
    let newMessage = {
      message: this.message,
      from: this.username
    }

    this.socketService.socket.emit('send-message', newMessage);
    this.message = '';
    // this.messages.push(newMessage);
  }

}
