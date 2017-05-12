import { Component } from "@angular/core";
import { NavController, Platform } from "ionic-angular";

import { DatabaseProvider } from "../../providers/database/database";
import { FactionProvider } from "../../providers/factions/faction";

import { Faction } from "../../models/faction";

@Component({
    selector: "page-addkillteam",
    templateUrl: "addkillteam.html"
})

export class AddKillTeamPage {

    private factions: Faction[];

    private selectedFaction: string;

    constructor(
        private platform: Platform,
        private navCtrl: NavController,
        private factionProvider: FactionProvider,
        private databaseProvider: DatabaseProvider) {
    }

    private ionViewWillEnter() {
        this.loadFactions();
    }

    private loadFactions() {
        this.factionProvider.getFactions()
            .then(data => {
                this.factions = Faction.fromJsonObjects(data);

                this.selectedFaction = this.factions[0].name;
                this.onFactionSelected();
            });
    }

    private onFactionSelected() {
    }
}
