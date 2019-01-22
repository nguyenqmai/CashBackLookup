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
      let tmp = await Promise.resolve(this.storage.get("rewardCards"))
      // console.log(JSON.stringify(tmp));      
      for (let card of <RewardCard[]>tmp) {
        this.cards.set(card.cardId, card);
      }
      this.loaded = true;
      return tmp;
  }

  public async getCurrentCards() {
    if (!this.loaded) {
        return <RewardCard[]>await Promise.resolve(this.loadFromLocalStorage()) 
    } else {
      let ret: RewardCard[] = [];
      this.cards.forEach((card, idKey, m) => {
        ret.push(card);
      });  
      return ret;
    }
  }

  public newBlankCard() {
    return new RewardCard("");
  }

  public async saveCard(rewardCard: RewardCard) {
    if (!this.loaded) {
      await Promise.resolve(this.loadFromLocalStorage()) 
    }
    rewardCard.cardId = RewardCard.getNextCardId();
    this.cards.set(rewardCard.cardId, rewardCard);
    this.storage.set("rewardCards", this.getCurrentCards());
  }

  public async deleteCard(rewardCard: RewardCard) {
    if (!this.loaded) {
      await Promise.resolve(this.loadFromLocalStorage()) 
    }
    // console.log("to-be-deleted " + JSON.stringify(rewardCard))
    // console.log("size before " + this.cards.size)
    this.cards.delete(rewardCard.cardId);
    this.storage.set("rewardCards", this.getCurrentCards());
    // console.log("size after " + this.cards.size)
  }
}


