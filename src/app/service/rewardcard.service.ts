import { Injectable } from '@angular/core';
import { RewardCard } from '../model/reward-card.type';

@Injectable({
  providedIn: 'root'
})
export class RewardCardService {
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  private cards: Array<RewardCard> = [];

  constructor() { 
    for (let i = 1; i < 11; i++) {
      this.cards.push(
        new RewardCard('CCard ' + i,
          'Notes for card #' + i, 
          this.icons[Math.floor(Math.random() * this.icons.length)]
        )
      );
    }
  }

  public getCurrentCards() {
    return this.cards;
  }

  public newBlankCard() {
    return new RewardCard('', '', this.icons[Math.floor(Math.random() * this.icons.length)]);
  }

  public saveCard(item: RewardCard) {
    this.cards.push(item);
  }
}
