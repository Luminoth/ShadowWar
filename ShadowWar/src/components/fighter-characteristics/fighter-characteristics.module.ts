import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";

import { FighterCharacteristicsComponent } from "./fighter-characteristics";

@NgModule({
    declarations: [
        FighterCharacteristicsComponent,
    ],
    imports: [
        IonicPageModule.forChild(FighterCharacteristicsComponent),
    ],
    exports: [
        FighterCharacteristicsComponent
    ]
})

export class FighterCharacteristicsComponentModule {}
