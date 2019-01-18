import { Injectable } from '@angular/core';
import { RewardCard } from '../model/reward-card.type';

@Injectable({
  providedIn: 'root'
})
export class RewardCardService {
  private cards: Array<RewardCard> = [];

  constructor() { 
    for (let i = 1; i < 11; i++) {
      this.cards.push(
        new RewardCard('CCard ' + i,
          'Notes for card #' + i, 
        )
      );
    }
  }

  public getCurrentCards() {
    return this.cards;
  }

  public newBlankCard() {
    return new RewardCard();
  }

  public saveCard(item: RewardCard) {
    this.cards.push(item);
  }
}
