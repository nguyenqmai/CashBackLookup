import { Component, Input } from '@angular/core';
import { NavParams, ModalController, AlertController } from '@ionic/angular';
import { FormBuilder, Validators, FormArray, FormGroup, } from '@angular/forms';
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
    private modalController: ModalController,
    private alertController: AlertController) {
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
    this.card.note = this.cardInputForm.value.note
    this.card.rewardDetail = []
    this.cardInputForm.value.rewardDetail.forEach(pair => {
      this.card.rewardDetail.push(new MonthlyRewardDetail(pair.month, pair.rewardDetail))
    })

    this.modalController.dismiss(this.card, "save");
  }

  delete() {
    console.log("on modal button clicked...delete");
    this.confirmDeletion().then(data => {
      console.log("on modal button clicked...delete ... confirm data " + JSON.stringify(data));
      if (data.role == 'delete') {
        this.modalController.dismiss(this.card, "delete");  
      }
    })
  }

  async confirmDeletion() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Deleting card <strong>' + this.card.cardName + '</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Delete',
          role: 'delete',
        }
      ]
    });
    await alert.present();
    return await alert.onDidDismiss();
  }

  buildFormGroup() {
    var form = this.formBuilder.group({
      cardId: [this.card.cardId],
      cardName: [this.card.cardName, Validators.required],
      note: [this.card.note],
      rewardDetail: this.formBuilder.array([])
    });

    var rewardDetailFormArray = form.get("rewardDetail") as FormArray;

    this.card.rewardDetail.forEach((item) => {
      rewardDetailFormArray.push(this.formBuilder.group({month: item.month, rewardDetail: item.rewardDetail}));
    })
    return form;
  }
}

