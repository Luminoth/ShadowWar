import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AlertController, Alert } from "ionic-angular";
import "rxjs/add/operator/map";

import { Util } from "../../app/util";

const FilePath: string = "json/factions.json";

@Injectable()
export class FactionProvider {

    private factions: any = null;

    constructor(
        private http: Http,
        private alertCtrl: AlertController,
        private util: Util) {
    }

    public getFactions() {
        if(this.factions) {
            return Promise.resolve(this.factions);
        }

        return new Promise((resolve, reject) =>
        {
            const url: string = this.util.getAssetUrl(FilePath);
            console.log(`Loading factions from ${url}...`);

            this.http.get(url).map((res) => res.json())
                .subscribe(data => {
                    this.factions = data.factions;
                    resolve(this.factions);
                },
                err => {
                    console.log(err);

                    const alert: Alert = this.alertCtrl.create({
                        title: "Data Error",
                        message: "There was an error loading faction data!",
                        buttons: [ "Ok" ]
                    });
                    alert.present();

                    reject(err);
                });
        });
    }
}
