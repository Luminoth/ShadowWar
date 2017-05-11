import { Component } from "@angular/core";
import { NavController, Platform } from "ionic-angular";

import { DatabaseProvider } from "../../providers/database/database";

import { AddKillTeamPage } from "../addkillteam/addkillteam";

@Component({
    selector: "page-killteams",
    templateUrl: "killteams.html"
})

export class KillTeamsPage {

    constructor(
        private platform: Platform,
        private navCtrl: NavController,
        private databaseProvider: DatabaseProvider) {

        this.loadKillTeams();
    }

    private loadKillTeams() {
    }

    public onAddKillTeam() {
        this.navCtrl.push(AddKillTeamPage);
    }
}
