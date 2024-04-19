import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent,IonButton,IonGrid,IonCol,IonRow } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { SocketService } from '../services/socket.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent,IonButton,IonGrid,IonCol,IonRow],
})
export class Tab1Page implements OnInit  {
  constructor(private socketservice: SocketService, private router: Router) {}
errorMsg: string = ""
ngOnInit(): void {
 this.socketservice.connectSocket();
}

}
