
import { RewardCategoryDetail } from "./reward-category-detail.type";
import { Month, YearlyRewardPerCard } from "./yearly-reward-per-card.type";


export class RewardCard {
    cardName: string;
    notes: string;
    icon: string;
    rewardDetail: YearlyRewardPerCard;

    constructor(cardName?: string, notes?: string, icon?: string, rewardDetail?: YearlyRewardPerCard) {
        this.cardName = cardName ? cardName : "";
        this.notes = notes ? notes : "";
        this.icon = icon ? icon : "";
        this.rewardDetail = rewardDetail ? rewardDetail :  new YearlyRewardPerCard();
    }
}

