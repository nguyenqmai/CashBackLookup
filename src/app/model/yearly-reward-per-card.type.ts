
import { RewardCategoryDetail } from "./reward-category-detail.type";
import { isNumber } from "util";

export enum Month {
    January,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December
}

export class YearlyRewardPerCard {
    rewardPerMonth: Map<Month, string>;

    constructor() {
        this.rewardPerMonth = new Map<Month, string>();
        var tmp = Object.keys(Month).filter(key => !isNaN(Number(key)));
        // console.log("YearlyRewardPerCard constructor " + JSON.stringify(tmp));

        // console.log("YearlyRewardPerCard constructor " + Month[tmp[1]]);
        tmp.forEach(month => {
            this.rewardPerMonth.set(Month[month], '')
        })
    }
}

