import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { RewardCard } from '../model/reward-card.type';


@Injectable({
  providedIn: 'root'
})
export class RewardCardService {
  private cards = new Map<string, RewardCard>();


  constructor(private storage: Storage) { 
    this.storage.get("rewardCards").then((value) => {
      if (value) {
        <RewardCard[]>value.forEach(card => {this.cards.set(card.cardId, card);})
      } else {
        for (let i = 1; i < 2; i++) {
          var cardId = RewardCard.getNextCardId() + i;
          this.saveCard(new RewardCard(cardId, 'CCard ' + i));
        }
      }
    });
  }

  public getCurrentCards() {
    var ret: RewardCard[] = [];
    this.cards.forEach((card, idKey, m) => {
      ret.push(card);
    });

    return ret;
  }

  public newBlankCard() {
    return new RewardCard(RewardCard.getNextCardId());
  }

  public saveCard(rewardCard: RewardCard) {
    this.cards.set(rewardCard.cardId, rewardCard);
    this.storage.set("rewardCards", this.getCurrentCards());
  }
}
