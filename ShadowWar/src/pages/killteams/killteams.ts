import { Component } from "@angular/core";
import { NavController, Platform } from "ionic-angular";

import { DatabaseProvider } from "../../providers/database/database";

@Component({
    selector: "page-killteams",
    templateUrl: "killteams.html"
})

export class PageKillTeams {
    constructor(private platform: Platform, private navCtrl: NavController, private databaseProvider: DatabaseProvider) {
        this.platform.ready().then(() => {
        });
    }

    onAddKillTeam() {
    }
}
