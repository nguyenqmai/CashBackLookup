import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { RewardCardService } from '../service/rewardcard.service';
import { NewCard } from '../modal/newcard.modal';
import { RewardCard } from '../model/reward-card.type';
import { Month, MonthlyRewardDetail } from "../model/monthly-reward-detail.type";

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  // private icons = [
  //   'flask',
  //   'wifi',
  //   'beer',
  //   'football',
  //   'basketball',
  //   'paper-plane',
  //   'american-football',
  //   'boat',
  //   'bluetooth',
  //   'build'
  // ];
  
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

  getCurrentMonthReward(card: RewardCard) {
    var currentMonth: Month = <Month>Month[RewardCard.getCurrentMonth()]
    // console.log("current month is " +currentMonth)
    for (let rwDetail of card.rewardDetail) {
        if (rwDetail.month == currentMonth) {
            // console.log("current month reward is " +rwDetail.rewardDetail)
            return rwDetail.rewardDetail;
        }
    }
    return "No reward information"
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

  private newCard() {
    this.displayCardInModal(this.cardInfoService.newBlankCard());
  }

  private updateCard(cardItem: RewardCard) {
    console.log("update current card " + JSON.stringify(cardItem))
    this.displayCardInModal(cardItem);
  }

  private async displayCardInModal(cardItem: RewardCard) {
    console.log("on FAB button clicked...show modal");

    const modal = await this.modalController.create({
      component: NewCard,
      componentProps: { 
        modalTitle: "New Credit Card Screen",
        modalHeader: "Credit Card Info",
        card: cardItem
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

