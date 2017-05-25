import { Component, Input } from "@angular/core";

import { EquipmentList } from "../../models/armory";
import { KillTeamFighter } from "../../models/killteamfighter";

@Component({
    selector: "fighter-card",
    templateUrl: "fighter-card.html"
})

export class FighterCardComponent {

    @Input() private armory: Map<string, EquipmentList>;
    @Input() private fighter: KillTeamFighter;

}
