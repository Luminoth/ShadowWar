import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";

import { AddKillTeamPage } from "./addkillteam";

@NgModule({
    declarations: [
        AddKillTeamPage,
    ],
    imports: [
        IonicPageModule.forChild(AddKillTeamPage),
    ],
    exports: [
        AddKillTeamPage
    ]
})

export class AddKillTeamPageModule {}
