import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";

import { FighterCardComponent } from "./fighter-card";

@NgModule({
    declarations: [
        FighterCardComponent,
    ],
    imports: [
        IonicPageModule.forChild(FighterCardComponent),
    ],
    exports: [
        FighterCardComponent
    ]
})

export class FighterCardComponentModule {}
