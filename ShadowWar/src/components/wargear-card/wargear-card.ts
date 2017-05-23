import { Component, Input } from "@angular/core";

import { KillTeamFighter } from "../../models/killteamfighter";

@Component({
    selector: "wargear-card",
    templateUrl: "wargear-card.html"
})

export class WargearCardComponent {

    @Input() private fighter: KillTeamFighter;

}
