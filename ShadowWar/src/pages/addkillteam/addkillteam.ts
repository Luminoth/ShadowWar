import { Component } from "@angular/core";
import { NavController, Platform } from "ionic-angular";

import { DatabaseProvider } from "../../providers/database/database";
import { FactionProvider } from "../../providers/factions/faction";

@Component({
    selector: "page-addkillteam",
    templateUrl: "addkillteam.html"
})

export class AddKillTeamPage {

    private factions: any;

    public faction: string = "";

    constructor(
        private platform: Platform,
        private navCtrl: NavController,
        private factionProvider: FactionProvider,
        private databaseProvider: DatabaseProvider) {

        this.loadFactions();
    }

    private loadFactions() {
        this.factionProvider.getFactions()
            .then(factions => {
                this.factions = factions;
                this.faction = this.factions[0].name;
            });
    }
}
