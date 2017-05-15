import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AlertController, Alert } from "ionic-angular";
import "rxjs/add/operator/map";

import { Util } from "../../app/util";

const FilePath: string = "json/";
const FileName: string = "armory.json";

@Injectable()
export class ArmoryProvider {

    private armory: any = null;

    constructor(
        private http: Http,
        private alertCtrl: AlertController,
        private util: Util) {
    }

// TODO: clean this up

    public getArmory() {
        if(this.armory) {
            return Promise.resolve(this.armory);
        }

        return new Promise((resolve, reject) => {
            const url: string = this.util.getAssetFileUrl(FilePath, FileName);
            console.log(`Loading armory from ${url}...`);

            this.http.get(url).map((res) => res.json())
                .subscribe(data => {
                    this.armory = data.armory;
                    resolve(this.armory);
                },
                err => {
                    console.log(err);

                    const alert: Alert = this.alertCtrl.create({
                        title: "Data Error",
                        message: "There was an error loading armory data!",
                        buttons: [ "Ok" ]
                    });
                    alert.present();

                    reject(err);
                });
        });
    }
}
