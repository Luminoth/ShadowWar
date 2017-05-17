import { Component, Input } from "@angular/core";

import { KillTeamFighter } from "../../models/killteamfighter";

@Component({
    selector: "fighter-card",
    templateUrl: "fighter-card.html"
})

export class FighterCardComponent {

    @Input() private fighter: KillTeamFighter;

}
