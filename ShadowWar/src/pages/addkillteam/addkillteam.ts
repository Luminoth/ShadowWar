import { Component } from "@angular/core";
import { NavController, Platform, AlertController, Alert } from "ionic-angular";

import { DatabaseProvider } from "../../providers/database/database";
import { FactionProvider } from "../../providers/factions/faction";
import { FighterProvider } from "../../providers/fighters/fighter";

import { Faction } from "../../models/faction";
import { Fighter, FighterType } from "../../models/fighter";
import { KillTeam } from "../../models/killteam";

@Component({
    selector: "page-addkillteam",
    templateUrl: "addkillteam.html"
})

export class AddKillTeamPage {

    private factionNames: string[];
    private selectedFactionName: string;

    private fighters: Map<string, Map<string, Fighter>>;

    private killTeam: KillTeam;

    constructor(
        private platform: Platform,
        private navCtrl: NavController,
        private alertCtrl: AlertController,
        private factionProvider: FactionProvider,
        private fighterProvider: FighterProvider,
        private databaseProvider: DatabaseProvider) {

        this.killTeam = new KillTeam();
    }

    private ionViewWillEnter(): void {
        this.loadFactionNames()
            .then(() => {
                this.selectedFactionName = this.factionNames[0];
                this.onFactionSelected();
            });
    }

    private loadFactionNames(): Promise<any> {
        return this.factionProvider.getFactionNames()
            .then((factionNames) => {
                this.factionNames = factionNames;
            });
    }

    private onFactionSelected(): Promise<any> {
        return this.factionProvider.getFaction(this.selectedFactionName)
            .then((faction) => {
                this.fighterProvider.getFighters(faction)
                    .then((fighters) => {
                        let leader: Fighter = null;
                        for(let fighter of fighters) {
                            if(FighterType.Leader === fighter[1].type) {
                                leader = fighter[1];
                                break;
                            }
                        }
                        this.killTeam.setFaction(faction, leader);
                    });
            });
    }

    private onAddFighter(): void {
/*
        const alert: Alert = this.alertCtrl.create({
            title: "Select a Fighter",
            buttons: [
                {
                    text: "Ok",
                    handler: data => {
                        const fighter: Fighter = this.fighters.find(x => x.name === data);
                        this.killTeam.addFighter(fighter);
                    }
                },
                {
                    text: "Cancel",
                    role: "cancel"
                }
            ]
        });

        const fighters: Fighter[] = this.fighters.filter(x => FighterType.Leader !== x.type && this.killTeam.faction.fighters.some(y => y === x.name));
        for(let i: number=0; i<fighters.length; ++i) {
            const fighter: Fighter = fighters[i];
            alert.addInput({type: "radio", name: "fighter", value: fighter.name, label: fighter.name, checked: 0 ===i});
        }

        alert.present();
*/
    }
}
