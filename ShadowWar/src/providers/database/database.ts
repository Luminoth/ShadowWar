import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

@Injectable()
export class DatabaseProvider {
    public databaseName: string = "data.db";

    private sqliteService: SQLite = null;
    private database: SQLiteObject = null;

    constructor() {
        this.sqliteService = new SQLite();
    }

    open() {
        return this.sqliteService.create({
            name: this.databaseName,
            location: "default"
        }).then((db: SQLiteObject) => {
            this.database = db;
        });
    }

    createTables() {
        return this.database.transaction((tx) => {
            tx.executeSql("CREATE TABLE IF NOT EXISTS killTeams (id INTEGER PRIMARY KEY, name TEXT)");
        });
    }
}
