import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AlertController, Alert } from "ionic-angular";
import "rxjs/add/operator/map";

import { Util } from "../../app/util";
import { Faction } from "../../models/faction";
import { Wargear } from "../../models/wargear";

const FilePath: string = "json/wargear/";
const BaseFileName: string = "base.json";

@Injectable()
export class WargearProvider {

    private baseWargear: Map<string, Wargear> = new Map<string, Wargear>();
    private baseWargearLoaded: boolean;

    // { faction name => { wargear name => wargear } }
    private wargear: Map<string, Map<string, Wargear>> = new Map<string, Map<string, Wargear>>();

    constructor(
        private http: Http,
        private alertCtrl: AlertController,
        private util: Util) {
    }

    public getWargear(faction: Faction): Promise<Map<string, Wargear>> {
        return this.getBaseWargear()
            .then(() => {
                return this.getFactionWargear(faction);
            });
    }

    private getBaseWargear(): Promise<Map<string, Wargear>> {
        return new Promise<Map<string, Wargear>>((resolve, reject) => {
            if(this.baseWargearLoaded) {
                return resolve(this.baseWargear);
            }

            const url: string = this.util.getAssetFileUrl(FilePath, BaseFileName);
            console.log(`Loading base wargear from ${url}...`);

            this.http.get(url).map((res) => res.json())
                .subscribe(data => {
                        this.setBaseWargear(Wargear.fromJsonObjects(data.wargear));
                        return resolve(this.baseWargear);
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

    private getFactionWargear(faction: Faction): Promise<Map<string, Wargear>> {
        return new Promise<Map<string, Wargear>>((resolve, reject) => {
            if(this.wargear.has(faction.name)) {
                return resolve(this.wargear.get(faction.name));
            }

            const url: string = this.util.getAssetFileUrl(FilePath, faction.getDataFileName());
            console.log(`Loading wargear from ${url}...`);

            this.http.get(url).map((res) => res.json())
                .subscribe(data => {
                    this.setWargear(faction, Wargear.fromJsonObjects(data.wargear));

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

    private setBaseWargear(wargear: Wargear[]): void {
        wargear.forEach(gear => this.baseWargear.set(gear.name, gear));
        this.resolveBaseWargear(this.baseWargear);
    }

    private setWargear(faction: Faction, wargear: Wargear[]): void {
        const warGearMap: Map<string, Wargear> = new Map<string, Wargear>();
        this.baseWargear.forEach(gear => warGearMap.set(gear[0], gear[1]));
        wargear.forEach(gear => warGearMap.set(gear.name, gear));

        this.resolveBaseWargear(warGearMap);
        this.wargear.set(faction.name, warGearMap);
    }

    private resolveBaseWargear(wargears: Map<string, Wargear>): void {
        wargears.forEach(wargear => {
            if(wargear.baseWargear) {
                const baseWargear: Wargear = this.baseWargear.get(wargear.baseWargear);
                wargear.updateFromBaseWargear(baseWargear);
            }
        });
    }

    private resolveSuperFaction(faction: Faction): Promise<void> {
        const wargear: Map<string, Wargear> = this.wargear.get(faction.name);

        return this.getWargear(faction.superFaction)
            .then((superFactionWargears) => {
                [...superFactionWargears]
                    .filter(superFactionWargear => !wargear.has(superFactionWargear[0]))
                    .forEach(superFactionWargear => wargear.set(superFactionWargear[0], superFactionWargear[1]));
            });
    }
}
