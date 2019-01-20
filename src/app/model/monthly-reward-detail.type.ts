
export enum Month {
    January = "January",
    February = "February",
    March = "March",
    April = "April",
    May = "May",
    June = "June",
    July = "July",
    August = "August",
    September = "September",
    October = "October",
    November = "November",
    December = "December"
}

export class MonthlyRewardDetail {
    month: Month;
    rewardDetail: string;

    constructor(month: Month, rewardDetail: string) {
        this.month = month;
        this.rewardDetail = rewardDetail;
    }
}