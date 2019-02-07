
import { Month, MonthlyRewardDetail } from "./monthly-reward-detail.type";
import { DatePipe } from '@angular/common';

export class RewardCard {
    static datePipe = new DatePipe('en-US');
    static getNextCardId() {
        return RewardCard.datePipe.transform(Date.now(), 'yyyyMMdd_HHmmss_SSS');
    }

    static getCurrentMonth() {
        return RewardCard.datePipe.transform(Date.now(), 'LLLL');
    }

    static getAllRewardMonth() {
        return Object.keys(Month).filter(key => isNaN(Number(key)));
    }

    cardId: string;
    cardName: string;
    note: string;
    rewardDetail: MonthlyRewardDetail[];


    constructor(cardId: string, cardName?: string, note?: string, rewardDetail?: MonthlyRewardDetail[]) {
        this.cardId = cardId;
        this.cardName = cardName ? cardName : "";
        this.note = note ? note : "";
        if (rewardDetail) {
            this.rewardDetail = rewardDetail;
            // console.log("new Reward card " + JSON.stringify(this))
        } else {

            this.rewardDetail = [];
            for(let month of RewardCard.getAllRewardMonth()) {
                this.rewardDetail.push(new MonthlyRewardDetail(<Month>Month[month], ""))
            }
            // console.log("new Reward card new YearlyRewardPerCard" + JSON.stringify(this))
        }


    }
}

