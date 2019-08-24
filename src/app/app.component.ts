import { Component } from '@angular/core';
import { OverlayEventDetail} from '@ionic/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Credit Cards Cash Back',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertController: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('android')) {
        this.androidSetup();
      } else {
        this.statusBar.styleDefault();
      }
      this.splashScreen.hide();
    });
  }

  private androidSetup() {
    this.statusBar.styleLightContent();
    this.platform.backButton.subscribeWithPriority(0, () => {
      // this.presentToast(`window.location.pathname ${window.location.pathname}`);
      // this.logger.info(`window.location.pathname ${window.location.pathname}`);
      this.presentAlert();
      // if (window.location.pathname === '/home') {
      //   navigator['app'].exitApp();
      // }
    });
  }

  private async presentAlert() {
    const alert = await this.alertController.create({
      message: 'Exit app?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            alert.dismiss();
            return false;
          }
        }, {
          text: 'Yes',
          handler: () => {
            alert.dismiss(true);
            return false;
          }
        }
      ]
    });
    alert.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data) {
        navigator['app'].exitApp();
      }
    });

    await alert.present();

  }
}
