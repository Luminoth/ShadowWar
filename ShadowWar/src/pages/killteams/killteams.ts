import { Component } from "@angular/core";
import { NavController, Platform } from "ionic-angular";

import { DatabaseProvider } from "../../providers/database/database";

import { KillTeam } from "../../models/killteam";

import { AddKillTeamPage } from "../addkillteam/addkillteam";

@Component({
    selector: "page-killteams",
    templateUrl: "killteams.html"
})

export class KillTeamsPage {

    private killTeams: KillTeam[];

    constructor(
        private platform: Platform,
        private navCtrl: NavController,
        private databaseProvider: DatabaseProvider) {
    }

    public ionViewWillEnter(): void {
        this.loadKillTeams();
    }

    private loadKillTeams(): Promise<void> {
        return new Promise<void>(() => {
        });
    }

    public onAddKillTeam(): Promise<void> {
        return this.navCtrl.push(AddKillTeamPage);
    }
}
