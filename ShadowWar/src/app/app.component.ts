import { Component, ViewChild } from "@angular/core";
import { HockeyApp } from "ionic-hockeyapp";
import { Nav, Platform, AlertController, Alert } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { DatabaseProvider } from "../providers/database/database";

import { KillTeamsPage } from "../pages/killteams/killteams";

@Component({
    templateUrl: "app.html"
})

export class MyApp {

    @ViewChild(Nav) private nav: Nav;

    private rootPage: any = KillTeamsPage;

    private pages: Array<{title: string, component: any}>;

    constructor(
        private platform: Platform,
        private hockeyApp: HockeyApp,
        private statusBar: StatusBar,
        private splashScreen: SplashScreen,
        private alertCtrl: AlertController,
        private databaseProvider: DatabaseProvider) {

        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            { title: "Kill Teams", component: KillTeamsPage }
        ];
    }

    private initializeApp() {
        this.platform.ready().then(() => {
            // TODO: get app IDs
            //this.hockeyApp.start("ANDROID_APP_ID", "IOS_APP_ID", true, false);

            this.databaseProvider.open()
                .then(() => {
                    this.databaseProvider.initialize()
                    .catch(err => {
                        console.log(err);

                        const alert: Alert = this.alertCtrl.create({
                            title: "Database Error",
                            message: "There was an error initializing the database!",
                            buttons: [ "Ok" ]
                        });
                        alert.present();
                    });

                    // Okay, so the platform is ready and our plugins are available.
                    // Here you can do any higher level native things you might need.
                    this.statusBar.styleDefault();
                    this.splashScreen.hide();
                })
                .catch(err => {
                    console.log(err);

                    const alert: Alert = this.alertCtrl.create({
                        title: "Database Error",
                        message: "There was an error opening the database!",
                        buttons: [ "Ok" ]
                    });
                    alert.present();
                });
        });
    }

    private openPage(page: any) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
