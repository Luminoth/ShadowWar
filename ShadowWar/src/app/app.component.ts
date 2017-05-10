import { Component, ViewChild } from "@angular/core";
import { Nav, Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

import { PageKillTeams } from "../pages/killteams/killteams";

@Component({
  templateUrl: "app.html"
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = PageKillTeams;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, private sqlite: SQLite) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: "Kill Teams", component: PageKillTeams }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.sqlite.create({
          name: "data.db",
          location: "default"
        })
        .then((db: SQLiteObject) => {
            db.executeSql("CREATE TABLE killTeams(id INT)", {})
              .then(() => console.log("Execute SQL"))
              .catch(e => console.log(e));
        })
        .catch(e => console.log(e));

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
