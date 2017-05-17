import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";

import { LeaderCardComponent } from "./leader-card";

@NgModule({
    declarations: [
        LeaderCardComponent,
    ],
    imports: [
        IonicPageModule.forChild(LeaderCardComponent),
    ],
    exports: [
        LeaderCardComponent
    ]
})

export class LeaderCardComponentModule {}
