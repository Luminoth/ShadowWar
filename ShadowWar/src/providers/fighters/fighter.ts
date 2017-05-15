import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AlertController, Alert } from "ionic-angular";
import "rxjs/add/operator/map";

import { RestrictionValidator, Util } from "../../app/util";
import { Faction } from "../../models/faction";
import { Fighter } from "../../models/fighter";

const FilePath: string = "json/fighters/";

@Injectable()
export class FighterProvider {

    private fighters: Map<string, Map<string, Fighter>> = new Map<string, Map<string, Fighter>>();

    constructor(
        private http: Http,
        private alertCtrl: AlertController,
        private restrictionValidator: RestrictionValidator,
        private util: Util) {
    }

    public getFighters(faction: Faction): Promise<Map<string, Fighter>> {
        return new Promise<Map<string, Fighter>>((resolve, reject) => {
            if(this.fighters.has(faction.name)) {
                return resolve(this.fighters.get(faction.name));
            }

            const url: string = this.util.getAssetFileUrl(FilePath, faction.getDataFileName());
            console.log(`Loading fighters from ${url}...`);

            this.http.get(url).map((res) => res.json())
                .subscribe(data => {
                    this.setFighters(faction, Fighter.fromJsonObjects(data.fighters));

                    if(faction.superFaction) {
                        return this.resolveSuperFaction(faction)
                            .then(() => {
                                return resolve(this.fighters.get(faction.name));
                            });
                    }
                    return resolve(this.fighters.get(faction.name));
                },
                err => {
                    console.log(err);

                    const alert: Alert = this.alertCtrl.create({
                        title: "Data Error",
                        message: "There was an error loading fighter data!",
                        buttons: [ "Ok" ]
                    });
                    alert.present();

                    return reject(err);
                });
        });
    }

    public getFighter(faction: Faction, name: string): Promise<Fighter> {
        return new Promise<Fighter>((resolve, reject) => {
            if(this.fighters.has(faction.name)) {
                const fighters: Map<string, Fighter> = this.fighters.get(faction.name);
                return resolve(fighters.get(name));
            }

            return this.getFighters(faction)
                .then(fighters => {
                    return resolve(fighters.get(name));
                })
                .catch((err) => {
                    return reject(err);
                });
        });
    }

    private setFighters(faction: Faction, fighters: Fighter[]): void {
        const fighterMap: Map<string, Fighter> = new Map<string, Fighter>();
        for(let fighter of fighters) {
            fighterMap.set(fighter.name, fighter);
        }
        this.fighters.set(faction.name, fighterMap);
    }

    private resolveSuperFaction(faction: Faction): Promise<void> {
        const fighters: Map<string, Fighter> = this.fighters.get(faction.name);

        return this.getFighters(faction.superFaction)
            .then((superFactionFighters) => {
                for(let superFactionFighter of superFactionFighters) {
                    if(!this.restrictionValidator.validateRestriction(faction.name, superFactionFighter[1].subFactionRestrictions)) {
                        continue;
                    }

                    if(!fighters.has(superFactionFighter[0])) {
                        fighters.set(superFactionFighter[0], superFactionFighter[1]);
                    }
                }
            });
    }
}
