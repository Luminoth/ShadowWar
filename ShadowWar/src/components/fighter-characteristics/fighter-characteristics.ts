import { Component, Input } from "@angular/core";

import { KillTeamFighter } from "../../models/killteamfighter";

@Component({
    selector: "fighter-characteristics",
    templateUrl: "fighter-characteristics.html"
})

export class FighterCharacteristicsComponent {

    @Input() private fighter: KillTeamFighter;

}
