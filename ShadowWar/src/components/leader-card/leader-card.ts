import { Component, Input } from "@angular/core";

import { KillTeamFighter } from "../../models/killteamfighter";

@Component({
    selector: "leader-card",
    templateUrl: "leader-card.html"
})

export class LeaderCardComponent {

    @Input() private leaderNames: string[];
    @Input() private selectedLeaderName: string;

}
