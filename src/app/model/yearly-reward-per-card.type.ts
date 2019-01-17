
import { RewardCategoryDetail } from "./reward-category-detail.type";

export enum Month {
    January = 1,
    February,
    March,
    April,
    Map,
    June,
    July,
    August,
    September,
    October,
    November,
    December
}

export class YearlyRewardPerCard {
    rewardPerMonth: Map<Month, string[]>;

    constructor() {
        this.rewardPerMonth = new Map<Month, string[]>();
        Object.keys(Month).filter(key => isNaN(Number(key))).forEach(month => {
            this.rewardPerMonth.set(Month[month], [])
        })
    }
}

