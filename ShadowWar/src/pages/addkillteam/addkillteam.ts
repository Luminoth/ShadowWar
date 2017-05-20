import { Component, ViewChild } from "@angular/core";
import { NavController, Platform, AlertController, Alert, Content } from "ionic-angular";

import { DatabaseProvider } from "../../providers/database/database";
import { FactionProvider } from "../../providers/factions/faction";
import { FighterProvider } from "../../providers/fighters/fighter";

import { Faction } from "../../models/faction";
import { Fighter, FighterType } from "../../models/fighter";
import { KillTeam } from "../../models/killteam";
import { KillTeamFighter } from "../../models/killteamfighter";

@Component({
    selector: "page-addkillteam",
    templateUrl: "addkillteam.html"
})

export class AddKillTeamPage {

    @ViewChild(Content) private content: Content;

    private factionNames: string[];

    private lastSelectedFactionName: string;
    private selectedFactionName: string;

    private leaderNames: string[];
    private selectedLeaderName: string;

    private fighters: Map<string, Fighter>;
    private fighterList: Fighter[];

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

// TODO: handle more promise errors!

    private onFactionSelected(): Promise<any> {
        return this.factionProvider.getFaction(this.selectedFactionName)
            .then((faction) => {
                this.loadFighters(faction)
                    .then(() => {
                        this.lastSelectedFactionName = this.selectedFactionName;
                        this.setFaction(faction);
                    }).catch(() => {
                        this.selectedFactionName = this.lastSelectedFactionName;
                        this.onFactionSelected();
                    });
            }).catch(() => {
                this.selectedFactionName = this.lastSelectedFactionName;
                this.onFactionSelected();
            });
    }

    private loadFighters(faction: Faction): Promise<any> {
        return this.fighterProvider.getFighters(faction)
            .then((fighters) => {
                this.fighters = fighters;

                this.leaderNames = [];
                this.fighterList = [];

                for(let fighter of this.fighters) {
                    if(FighterType.Leader === fighter[1].type) {
                        this.leaderNames.push(fighter[0]);
                    } else {
                        this.fighterList.push(fighter[1]);
                    }
                }

                this.selectedLeaderName = this.leaderNames[0];
                this.fighterList.sort((x, y) => x.type - y.type);
            });
    }

    private setFaction(faction: Faction): void {
        this.killTeam.setFaction(faction, this.fighters.get(this.selectedLeaderName));

        // fixes toolbar overlapping content when using *ngIf
        this.content.resize();
    }

    private onAddFighter(): void {
        const alert: Alert = this.alertCtrl.create({
            title: "Select a Fighter",
            buttons: [
                {
                    text: "Ok",
                    handler: data => {
                        const fighter: Fighter = this.fighters.get(data);
                        this.killTeam.addFighter(fighter);
                    }
                },
                {
                    text: "Cancel",
                    role: "cancel"
                }
            ]
        });

        for(let i: number=0; i<this.fighterList.length; ++i) {
            const fighter: Fighter = this.fighterList[i];
            alert.addInput({
                type: "radio",
                name: "fighter",
                value: fighter.name,
                label: fighter.name,
                checked: 0 === i
            });
        }

        alert.present();
    }

    private onReorderFighters(indexes: any): void {
        this.killTeam.reorderFighters(indexes);
    }

    private onDeleteFighter(fighter: KillTeamFighter) {
        this.killTeam.removeFighter(fighter);
    }

    private onDuplicateFighter(fighter: KillTeamFighter) {
        // TODO: dupliate
    }

    private onSave(): Promise<any> {
        // TODO: save

        return this.navCtrl.pop();
    }

    private onReset(): void {
        // TODO: reset
    }
}
