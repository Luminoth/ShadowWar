import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";

import { KillTeamsPage } from "./killteams";

@NgModule({
    declarations: [
        KillTeamsPage,
    ],
    imports: [
        IonicPageModule.forChild(KillTeamsPage)
    ],
    exports: [
        KillTeamsPage
    ]
})

export class KillTeamsPageModule {}
