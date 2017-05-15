import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AlertController, Alert } from "ionic-angular";
import "rxjs/add/operator/map";

import { Util } from "../../app/util";
import { Faction } from "../../models/faction";

const FilePath: string = "json/factions/";
const FileName: string = "factions.json";

@Injectable()
export class FactionProvider {

    // { faction name => faction }
    private factions: Map<string, Faction> = new Map<string, Faction>();

    private factionsLoaded: boolean;

    constructor(
        private http: Http,
        private alertCtrl: AlertController,
        private util: Util) {
    }

    public getFactionNames(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            if(this.factionsLoaded) {
                return resolve(Array.from(this.factions.keys()));
            }

            return this.getFactions()
                .then(() => {
                    return resolve(Array.from(this.factions.keys()));
                })
                .catch((err) => {
                    return reject(err);
                });
        });
    }

    public getFaction(faction: string): Promise<Faction> {
        return new Promise<Faction>((resolve, reject) => {
            if(this.factionsLoaded) {
                return resolve(this.factions.get(faction));
            }

            return this.getFactions()
                .then(() => {
                    return resolve(this.factions.get(faction));
                })
                .catch((err) => {
                    return reject(err);
                });
        });
    }

    private getFactions(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if(this.factionsLoaded) {
                return resolve();
            }

            const url: string = this.util.getAssetFileUrl(FilePath, FileName);
            console.log(`Loading factions from ${url}...`);

            this.http.get(url).map((res) => res.json())
                .subscribe(data => {
                    this.setFactions(Faction.fromJsonObjects(data.factions));
                    return resolve();
                },
                err => {
                    console.log(err);

                    const alert: Alert = this.alertCtrl.create({
                        title: "Data Error",
                        message: "There was an error loading faction data!",
                        buttons: [ "Ok" ]
                    });
                    alert.present();

                    return reject(err);
                });
        });
    }

    private setFactions(factions: Faction[]): void {
        for(let faction of factions) {
            this.factions.set(faction.name, faction);
        }

        this.resolveSuperFactions();

        this.factionsLoaded = true;
    }

    private resolveSuperFactions(): void {
        this.factions.forEach(faction => {
            if(faction.superFactionName) {
                const superFaction: Faction = this.factions.get(faction.superFactionName);
                faction.updateFromSuperFaction(superFaction);
            }
        });
    }
}
