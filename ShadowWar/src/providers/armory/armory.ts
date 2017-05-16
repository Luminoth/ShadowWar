import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AlertController, Alert } from "ionic-angular";
import "rxjs/add/operator/map";

import { Util } from "../../app/util";
import { Faction } from "../../models/faction";
import { EquipmentList } from "../../models/armory";

const FilePath: string = "json/armory/";

@Injectable()
export class ArmoryProvider {

    // { faction name => { equipment list name => equipment list } }
    private armory: Map<string, Map<string, EquipmentList>>;

    constructor(
        private http: Http,
        private alertCtrl: AlertController,
        private util: Util) {
    }

    public getArmory(faction: Faction): Promise<Map<string, EquipmentList>> {
        return new Promise<Map<string, EquipmentList>>((resolve, reject) => {
            if(this.armory.has(faction.name)) {
                return resolve(this.armory.get(faction.name));
            }

            const url: string = this.util.getAssetFileUrl(FilePath, faction.getDataFileName());
            console.log(`Loading armory from ${url}...`);

            this.http.get(url).map((res) => res.json())
                .subscribe(data => {
                    this.setArmory(faction, EquipmentList.fromJsonObjects(data.equipmentList));

                    if(faction.superFaction) {
                        this.resolveSuperFaction(faction)
                            .then(() => {
                                return resolve(this.armory.get(faction.name));
                            });
                    }
                    return resolve(this.armory.get(faction.name));
                },
                err => {
                    console.log(err);

                    const alert: Alert = this.alertCtrl.create({
                        title: "Data Error",
                        message: "There was an error loading armory data!",
                        buttons: [ "Ok" ]
                    });
                    alert.present();

                    return reject(err);
                });
        });
    }

    private getEquipmentList(faction: Faction, name: string): Promise<EquipmentList> {
        return new Promise<EquipmentList>((resolve, reject) => {
            if(this.armory.has(faction.name)) {
                const armory: Map<string, EquipmentList> = this.armory.get(faction.name);
                return resolve(armory.get(name));
            }

            return this.getArmory(faction)
                .then((armory) => {
                    return resolve(armory.get(name));
                })
                .catch((err) => {
                    return reject(err);
                });
        });
    }

    private setArmory(faction: Faction, armory: EquipmentList[]): void {
        const equipmentMap: Map<string, EquipmentList> = new Map<string, EquipmentList>();
        for(let equipmentList of armory) {
            equipmentMap.set(equipmentList.name, equipmentList);
        }
        this.armory.set(faction.name, equipmentMap);
    }

    private resolveSuperFaction(faction: Faction): Promise<void> {
        const armory: Map<string, EquipmentList> = this.armory.get(faction.name);

        return this.getArmory(faction.superFaction)
            .then((superFactionArmory) => {
                for(let superFactionEquipmentList of superFactionArmory) {
                    if(!armory.has(superFactionEquipmentList[0])) {
                        armory.set(superFactionEquipmentList[0], superFactionEquipmentList[1]);
                    }
                }
            });
    }
}
