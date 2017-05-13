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

    private factions: Faction[];
    private selectedFactionName: string;

    private fighters: Fighter[];

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

    private ionViewWillEnter() {
        this.loadFactions()
            .then(() => {
                this.loadFighters()
                    .then(() => {
                        this.selectedFactionName = this.factions[0].name;
                        this.onFactionSelected();
                    });
            });
    }

    private loadFactions() {
        return this.factionProvider.getFactions()
            .then(data => {
                this.factions = Faction.fromJsonObjects(data);
            });
    }

    private loadFighters() {
        return this.fighterProvider.getFighters()
            .then(data => {
                this.fighters = Fighter.fromJsonObjects(data);
            });
    }

    private onFactionSelected() {
        const faction: Faction = this.factions.find(x => x.name === this.selectedFactionName);
        const leader: Fighter = this.fighters.find(x => FighterType.Leader === x.type && faction.fighters.some(y => y === x.name));

        this.killTeam.setFaction(faction, leader);
    }

    private onAddFighter() {
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
    }
}
