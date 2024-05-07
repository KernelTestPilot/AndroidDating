import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid,IonCol,IonRow,IonList,IonItem,IonLabel,IonIcon } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { SocketService } from '../services/socket.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserType } from 'src/types/UserType';
import { User } from 'src/types/UserType';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent,IonGrid,IonCol,IonRow,IonList,IonItem,IonLabel,IonIcon]
})
export class Tab2Page implements OnInit {
  matches: UserType [] = [];
   user: User | null = null;

  constructor(private socketservice: SocketService, private authservice: AuthService) {}

  ngOnInit(): void {
    this.refreshMatches();
    this.getMatches();
    this.authservice.currentUser$.subscribe(currentUser => {
      console.log(currentUser)
      if(currentUser){
        console.log("INNE I IF SATSEN", currentUser.age, currentUser.gender)
        this.user = currentUser;
        console.log(currentUser.gender)

      }
    });
  }
  getMatches():void{
    this.socketservice.getMatches();
  }
  refreshMatches(): Subscription{
    return this.socketservice.refreshMatches().subscribe({
      next: (data: any) => {
        if(data.matches){
          this.matches = data.matches;

        }
        console.log(data);
      },
      error: (error: any) => {
        // Handle errors if any
        console.error('Error occurred:', error);
      }
    });
  }
}
