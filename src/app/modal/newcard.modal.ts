import { Component, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl, Form } from '@angular/forms';
import { RewardCard } from '../model/reward-card.type';
import { MonthlyRewardDetail } from "../model/monthly-reward-detail.type";


@Component({
  selector: 'modal-page',
  templateUrl: "newcard.page.html"
})
export class NewCard {
  @Input() modalTitle: string;
  @Input() modalHeader: string;
  // "value" passed in componentProps
  @Input() card: RewardCard;
  cardInputForm: FormGroup;

  constructor(navParams: NavParams,
    private formBuilder: FormBuilder,
    private modalController: ModalController) {
    // componentProps can also be accessed at construction time using NavParams
  }

  ngOnInit() {
    this.cardInputForm = this.buildFormGroup()
  }

  cancel() {
    console.log("on modal button clicked...cancel modal");
    this.modalController.dismiss();
  }

  save() {
    console.log("on modal button clicked...save " + JSON.stringify(this.cardInputForm.value));
    this.card.cardName = this.cardInputForm.value.cardName
    this.card.rewardDetail = []
    this.cardInputForm.value.rewardDetail.forEach(pair => {
      this.card.rewardDetail.push(new MonthlyRewardDetail(pair.month, pair.rewardDetail))
    })

    this.modalController.dismiss(this.card, "save");
  }

  delete() {
    console.log("on modal button clicked...delete");
    this.modalController.dismiss(this.card, "delete");
  }

  buildFormGroup() {
    var form = this.formBuilder.group({
      cardId: [this.card.cardId],
      cardName: [this.card.cardName, Validators.required],
      rewardDetail: this.formBuilder.array([])
    });

    var rewardDetailFormArray = form.get("rewardDetail") as FormArray;

    this.card.rewardDetail.forEach((item) => {
      // console.log("item " + JSON.stringify(item))
      rewardDetailFormArray.push(this.formBuilder.group({month: item.month, rewardDetail: item.rewardDetail}));
    })
    return form;
  }
}

