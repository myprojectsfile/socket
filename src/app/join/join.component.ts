import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {
  username = '';
  constructor(private router: Router) { }

  ngOnInit() {
    
  }

  join(username: string) {
    this.router.navigate(['/chat', { username: username }]);
  }
}
