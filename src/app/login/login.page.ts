import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonProgressBar } from '@ionic/angular/standalone';
import {Camera,CameraResultType, CameraSource } from '@capacitor/camera';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonProgressBar]
})
export class LoginPage implements OnInit {
  image = '';
  isLoading: boolean = false;
  constructor(private socketservice: SocketService, private router: Router) { }

  ngOnInit() {
    this.captureimage();
  }


  async captureimage(){
    const image = await Camera.getPhoto({
      quality: 90,
      source: CameraSource.Camera,
      resultType: CameraResultType.Base64
    });
    if(image){
      console.log("got the image", image)
      //this.image = `data:image/jpeg;base64,${image.base64String}`
      //Send the image to the backend for analyzeing if user can login..
      const imageData = image.base64String;
      //We can make this observable in the future to check login status..
      this.socketservice.setSession({ user: "oskar", image: imageData })
      //this.router.navigate(['/tabs/tab2'])
      this.isLoading = true;
      this.socketservice.loginStatus().subscribe((response) => {
        if (response.success) {
          // Set auth guard here
          this.isLoading = false;
          this.router.navigate(['/tabs/tab2']);
        } else {
          this.isLoading = false;
          this.router.navigate(['/tabs/tab1']);
        }
      });
    }

  }

}
