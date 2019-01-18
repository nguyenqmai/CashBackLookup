import { Component, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl, Form } from '@angular/forms';
import { RewardCard } from '../model/reward-card.type';


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
    console.log("on modal button clicked...close modal");
    this.modalController.dismiss(this.card);
  }

  buildFormGroup() {
    var form = this.formBuilder.group({
      cardName: [this.card.cardName, Validators.required],
      notes: [this.card.notes],
      rewardDetail: this.formBuilder.array([])
    });

    var rewardDetailFormArray = form.get("rewardDetail") as FormArray;

    this.card.rewardDetail.rewardPerMonth.forEach((value, key, map) => {
      console.log("value=" + value + " key="+ key)
      rewardDetailFormArray.push(this.formBuilder.group({month: key, rewardNote: value}));
    })
    return form;
  }
}

