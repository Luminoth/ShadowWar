import { Component, ViewChild } from "@angular/core";
import { Nav, Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { DatabaseProvider } from "../providers/database/database";
import { PageKillTeams } from "../pages/killteams/killteams";

@Component({
    templateUrl: "app.html"
})

export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = PageKillTeams;

    pages: Array<{title: string, component: any}>;

    constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, private databaseProvider: DatabaseProvider) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            { title: "Kill Teams", component: PageKillTeams }
        ];
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.databaseProvider.open()
                .then(() => {
                    this.databaseProvider.createTables()
                    .catch(e => {
                        // TODO: alert the user!
                        console.log(e);
                    });

                    // Okay, so the platform is ready and our plugins are available.
                    // Here you can do any higher level native things you might need.
                    this.statusBar.styleDefault();
                    this.splashScreen.hide();
                })
                .catch(e => {
                    // TODO: alert the user!
                    console.log(e);
                });
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
