import { NgModule, ErrorHandler } from "@angular/core";
import { HockeyApp } from "ionic-hockeyapp";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { BrowserModule } from "@angular/platform-browser";

import { MyApp } from "./app.component";
import { DatabaseProvider } from "../providers/database/database";
import { PageKillTeams } from "../pages/killteams/killteams";

@NgModule({
    declarations: [
        MyApp,
        PageKillTeams
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        BrowserModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        PageKillTeams
    ],
    providers: [
        HockeyApp,
        StatusBar,
        SplashScreen,
        DatabaseProvider,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})

export class AppModule {
}
