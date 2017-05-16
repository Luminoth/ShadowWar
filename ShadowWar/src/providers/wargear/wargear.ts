import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AlertController, Alert } from "ionic-angular";
import "rxjs/add/operator/map";

import { Util } from "../../app/util";
import { Faction } from "../../models/faction";
import { WarGear } from "../../models/wargear";

const FilePath: string = "json/wargear/";
const BaseFileName: string = "base.json";

@Injectable()
export class WarGearProvider {

    private baseWarGear: Map<string, WarGear> = new Map<string, WarGear>();
    private baseWarGearLoaded: boolean;

    // { faction name => { wargear name => wargear } }
    private wargear: Map<string, Map<string, WarGear>> = new Map<string, Map<string, WarGear>>();

    constructor(
        private http: Http,
        private alertCtrl: AlertController,
        private util: Util) {
    }

    public getWarGear(faction: Faction): Promise<Map<string, WarGear>> {
        return this.getBaseWarGear()
            .then(() => {
                return this.getFactionWarGear(faction);
            });
    }

    private getBaseWarGear(): Promise<Map<string, WarGear>> {
        return new Promise<Map<string, WarGear>>((resolve, reject) => {
            if(this.baseWarGearLoaded) {
                return resolve(this.baseWarGear);
            }

            const url: string = this.util.getAssetFileUrl(FilePath, BaseFileName);
            console.log(`Loading base wargear from ${url}...`);

            this.http.get(url).map((res) => res.json())
                .subscribe(data => {
                        this.setBaseWarGear(WarGear.fromJsonObjects(data.wargear));
                        return resolve(this.baseWarGear);
                    },
                    err => {
                        console.log(err);

                        const alert: Alert = this.alertCtrl.create({
                            title: "Data Error",
                            message: "There was an error loading base wargear data!",
                            buttons: [ "Ok" ]
                        });
                        alert.present();

                        return reject(err);
                    });
        });
    }

    private getFactionWarGear(faction: Faction): Promise<Map<string, WarGear>> {
        return new Promise<Map<string, WarGear>>((resolve, reject) => {
            if(this.wargear.has(faction.name)) {
                return resolve(this.wargear.get(faction.name));
            }

            const url: string = this.util.getAssetFileUrl(FilePath, faction.getDataFileName());
            console.log(`Loading wargear from ${url}...`);

            this.http.get(url).map((res) => res.json())
                .subscribe(data => {
                    this.setWarGear(faction, WarGear.fromJsonObjects(data.wargear));

                    if(faction.superFaction) {
                        this.resolveSuperFaction(faction)
                            .then(() => {
                                return resolve(this.wargear.get(faction.name));
                            });
                    }
                    return resolve(this.wargear.get(faction.name));
                },
                err => {
                    console.log(err);

                    const alert: Alert = this.alertCtrl.create({
                        title: "Data Error",
                        message: "There was an error loading wargear data!",
                        buttons: [ "Ok" ]
                    });
                    alert.present();

                    return reject(err);
                });
        });
    }

    private setBaseWarGear(wargear: WarGear[]): void {
        for(let gear of wargear) {
            this.baseWarGear.set(gear.name, gear);
        }
        this.resolveBaseWarGear(this.baseWarGear);
    }

    private setWarGear(faction: Faction, wargear: WarGear[]): void {
        const warGearMap: Map<string, WarGear> = new Map<string, WarGear>();
        for(let gear of this.baseWarGear) {
            warGearMap.set(gear[0], gear[1]);
        }

        for(let gear of wargear) {
            warGearMap.set(gear.name, gear);
        }
        this.resolveBaseWarGear(warGearMap);
        this.wargear.set(faction.name, warGearMap);
    }

    private resolveBaseWarGear(wargears: Map<string, WarGear>): void {
        wargears.forEach(wargear => {
            if(wargear.baseWarGear) {
                const baseWarGear: WarGear = this.baseWarGear.get(wargear.baseWarGear);
                wargear.updateFromBaseWarGear(baseWarGear);
            }
        });
    }

    private resolveSuperFaction(faction: Faction): Promise<void> {
        const wargear: Map<string, WarGear> = this.wargear.get(faction.name);

        return this.getWarGear(faction.superFaction)
            .then((superFactionWarGears) => {
                for(let superFactionWarGear of superFactionWarGears) {
                    if(!wargear.has(superFactionWarGear[0])) {
                        wargear.set(superFactionWarGear[0], superFactionWarGear[1]);
                    }
                }
            });
    }
}
