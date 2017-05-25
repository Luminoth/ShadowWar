import { Component, Input } from "@angular/core";

import { EquipmentList } from "../../models/armory";
import { KillTeamFighter } from "../../models/killteamfighter";

@Component({
    selector: "wargear-card",
    templateUrl: "wargear-card.html"
})

export class WargearCardComponent {

    @Input() private fighter: KillTeamFighter;
    @Input() private armory: Map<string, EquipmentList>;

    private onWargearSelected(): void {
    }

}
