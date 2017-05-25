import { Component, Input } from "@angular/core";

import { EquipmentList } from "../../models/armory";
import { KillTeam } from "../../models/killteam";

@Component({
    selector: "leader-card",
    templateUrl: "leader-card.html"
})

export class LeaderCardComponent {

    @Input() private leaderNames: string[];
    @Input() private selectedLeaderName: string;
    @Input() private armory: Map<string, EquipmentList>;
    @Input() private killTeam: KillTeam;

}
