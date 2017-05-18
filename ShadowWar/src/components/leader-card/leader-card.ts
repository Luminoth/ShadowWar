import { Component, Input } from "@angular/core";

import { KillTeam } from "../../models/killteam";

@Component({
    selector: "leader-card",
    templateUrl: "leader-card.html"
})

export class LeaderCardComponent {

    @Input() private leaderNames: string[];
    @Input() private selectedLeaderName: string;
    @Input() private killTeam: KillTeam;

}
