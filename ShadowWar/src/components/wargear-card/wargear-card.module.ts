import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";

import { WargearCardComponent } from "./wargear-card";

@NgModule({
    declarations: [
        WargearCardComponent,
    ],
    imports: [
        IonicPageModule.forChild(WargearCardComponent),
    ],
    exports: [
        WargearCardComponent
    ]
})

export class WargearCardComponentModule {}
