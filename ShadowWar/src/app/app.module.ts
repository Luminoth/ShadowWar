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
import { WargearProvider } from "../providers/wargear/wargear";
import { ArmoryProvider } from "../providers/armory/armory";

import { FighterCardComponent } from "../components/fighter-card/fighter-card";
import { LeaderCardComponent } from "../components/leader-card/leader-card";
import { FighterCharacteristicsComponent } from '../components/fighter-characteristics/fighter-characteristics';
import { WargearCardComponent } from '../components/wargear-card/wargear-card';

import { KillTeamsPage } from "../pages/killteams/killteams";
import { AddKillTeamPage } from "../pages/addkillteam/addkillteam";

@NgModule({
    declarations: [
        MyApp,
        FighterCardComponent,
        LeaderCardComponent,
        FighterCharacteristicsComponent,
        WargearCardComponent,
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
        WargearProvider,
        ArmoryProvider,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})

export class AppModule {}
