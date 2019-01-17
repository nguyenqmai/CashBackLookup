import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { RewardCardService } from '../service/rewardcard.service';
import { NewCard } from '../modal/newcard.modal';
import { RewardCard } from '../model/reward-card.type';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedCard: RewardCard;
  private currentCards: RewardCard[];

  constructor(private cardInfoService: RewardCardService,
      private toastController: ToastController,
      private modalController: ModalController) {

  }

  ngOnInit() {
    this.updateCurrentCards();
  }


  updateCurrentCards() {
    this.currentCards = this.cardInfoService.getCurrentCards();
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      position: "top",
      showCloseButton: true,
      duration: 3000
    });
    toast.present();
  }

  public fabClickFunction() {
    console.log("on FAB button clicked...show toast");
    this.presentToast("FAB button clicked");
  }

  private async presentModal() {
    console.log("on FAB button clicked...show modal");

    const modal = await this.modalController.create({
      component: NewCard,
      componentProps: { 
        modalTitle: "New Credit Card Screen",
        modalHeader: "Credit Card Info",
        card: this.cardInfoService.newBlankCard() 
      }
    });
    // return await modal.present();
    modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) {
      console.log("parent page got data " + JSON.stringify(data));
      this.cardInfoService.saveCard(data);
      this.updateCurrentCards();
    } else {
      console.log("modal cancelled ...no data ");
    }
  }
}

