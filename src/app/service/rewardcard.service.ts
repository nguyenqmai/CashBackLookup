import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { RewardCard } from '../model/reward-card.type';


@Injectable({
  providedIn: 'root'
})
export class RewardCardService {
  loaded: boolean = false;
  cards = new Map<string, RewardCard>();


  constructor(private storage: Storage) { 
  }

  
  private async f01() {
    return ;
  }

  private async loadFromLocalStorage() {
    try {
        let tmp = await Promise.resolve(this.storage.get("rewardCards"))
        console.log(JSON.stringify(tmp));      
        for (let card of <RewardCard[]>tmp) {
          this.cards.set(card.cardId, card);
        }
      this.loaded = true;
    } catch (error) {
      console.log(error);
    }
  }

  public async getCurrentCards() {
    let ret: RewardCard[] = [];
    if (!this.loaded) {
      console.log("fucking call me 01")
        await Promise.resolve(this.loadFromLocalStorage()) 
        this.cards.forEach((card, idKey, m) => {
          ret.push(card);
        });
      console.log("fucking call me 02")
    } else {
      this.cards.forEach((card, idKey, m) => {
        ret.push(card);
      });  
    }
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


