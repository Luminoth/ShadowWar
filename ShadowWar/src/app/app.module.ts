import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { HockeyApp } from "ionic-hockeyapp";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { File } from "@ionic-native/file";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { SQLite } from "@ionic-native/sqlite";

import { MyApp } from "./app.component";
import { RestrictionValidator, Util } from "./util";

import { DatabaseProvider } from "../providers/database/database";
import { FactionProvider } from "../providers/factions/faction";
import { FighterProvider } from "../providers/fighters/fighter";
import { WarGearProvider } from "../providers/wargear/wargear";
import { ArmoryProvider } from "../providers/armory/armory";

import { KillTeamsPage } from "../pages/killteams/killteams";
import { AddKillTeamPage } from "../pages/addkillteam/addkillteam";

@NgModule({
    declarations: [
        MyApp,
        KillTeamsPage,
        AddKillTeamPage
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        BrowserModule,
        HttpModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        KillTeamsPage,
        AddKillTeamPage
    ],
    providers: [
        HockeyApp,
        File,
        StatusBar,
        SplashScreen,
        SQLite,
        RestrictionValidator,
        Util,
        DatabaseProvider,
        FactionProvider,
        FighterProvider,
        WarGearProvider,
        ArmoryProvider,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})

export class AppModule {}
