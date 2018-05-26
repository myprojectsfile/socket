import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SocketService } from './socket.service';
import { ChatComponent } from './chat/chat.component';
import { JoinComponent } from './join/join.component';

const routes = [
  { path: 'join', component: JoinComponent },
  { path: 'chat', component: ChatComponent },
  {
    path: '', redirectTo: '/join',
    pathMatch: 'full'
  },
  {
    path: '**', redirectTo: '/join',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    JoinComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
