import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AlertController, Alert } from "ionic-angular";
import "rxjs/add/operator/map";

import { Util } from "../../app/util";

const FilePath: string = "json/fighters.json";

@Injectable()
export class FighterProvider {

    private fighters: any = null;

    constructor(
        private http: Http,
        private alertCtrl: AlertController,
        private util: Util) {
    }

    public getFighters() {
        if(this.fighters) {
            return Promise.resolve(this.fighters);
        }

        return new Promise((resolve, reject) => {
            const url: string = this.util.getAssetUrl(FilePath);
            console.log(`Loading fighters from ${url}...`);

            this.http.get(url).map((res) => res.json())
                .subscribe(data => {
                    this.fighters = data.fighters;
                    resolve(this.fighters);
                },
                err => {
                    console.log(err);

                    const alert: Alert = this.alertCtrl.create({
                        title: "Data Error",
                        message: "There was an error loading fighter data!",
                        buttons: [ "Ok" ]
                    });
                    alert.present();

                    reject(err);
                });
        });
    }
}
