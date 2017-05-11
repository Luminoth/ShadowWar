import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { HockeyApp } from "ionic-hockeyapp";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { SQLite } from "@ionic-native/sqlite";

import { MyApp } from "./app.component";

import { DatabaseProvider } from "../providers/database/database";
import { FactionProvider } from "../providers/factions/faction";

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
        StatusBar,
        SplashScreen,
        SQLite,
        DatabaseProvider,
        FactionProvider,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
    ]
})

export class AppModule {}
