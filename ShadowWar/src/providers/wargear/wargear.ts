import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AlertController, Alert } from "ionic-angular";
import "rxjs/add/operator/map";

import { Util } from "../../app/util";

const FilePath: string = "json/wargear.json";
const FileName: string = "wargear.json";

@Injectable()
export class WarGearProvider {

    private wargear: any = null;

    constructor(
        private http: Http,
        private alertCtrl: AlertController,
        private util: Util) {
    }

// TODO: clean this up

    public getWarGear() {
        if(this.wargear) {
            return Promise.resolve(this.wargear);
        }

        return new Promise((resolve, reject) => {
            const url: string = this.util.getAssetFileUrl(FilePath, FileName);
            console.log(`Loading wargear from ${url}...`);

            this.http.get(url).map((res) => res.json())
                .subscribe(data => {
                    this.wargear = data.wargear;
                    resolve(this.wargear);
                },
                err => {
                    console.log(err);

                    const alert: Alert = this.alertCtrl.create({
                        title: "Data Error",
                        message: "There was an error loading wargear data!",
                        buttons: [ "Ok" ]
                    });
                    alert.present();

                    reject(err);
                });
        });
    }
}
