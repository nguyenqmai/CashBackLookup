import { Component, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';


@Component({
  selector: 'modal-page',
  templateUrl: "newcard.page.html"
})
export class NewCard {
  @Input() modalTitle: string;
  @Input() modalHeader: string;
  // "value" passed in componentProps
  @Input() card: any;

  constructor(navParams: NavParams,
    private modalController: ModalController) {
    // componentProps can also be accessed at construction time using NavParams
  }

  cancel() {
    console.log("on modal button clicked...cancel modal");
    this.modalController.dismiss();
  }

  save() {
    console.log("on modal button clicked...close modal");
    this.modalController.dismiss(this.card);
  }

}