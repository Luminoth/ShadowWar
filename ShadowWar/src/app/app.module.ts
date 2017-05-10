import { NgModule, ErrorHandler } from "@angular/core";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { SQLite } from "@ionic-native/sqlite";
import { BrowserModule } from "@angular/platform-browser";
import { MyApp } from "./app.component";
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
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StatusBar,
    SplashScreen,
    SQLite]
})

export class AppModule {
}
