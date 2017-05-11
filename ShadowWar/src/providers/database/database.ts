import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

const DefaultDatabaseName: string = "data.db";
const TableKillTeams: string = "killTeams";

@Injectable()
export class DatabaseProvider {
    public databaseName: string = DefaultDatabaseName;

    private sqliteService: SQLite = null;
    private database: SQLiteObject = null;

    constructor() {
        this.sqliteService = new SQLite();
    }

    public open() {
        return this.sqliteService.create({
            name: this.databaseName,
            location: "default"
        }).then((db: SQLiteObject) => {
            this.database = db;
        });
    }

    public initialize() {
        return this.database.transaction((tx: any) => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS ${TableKillTeams} (id INTEGER PRIMARY KEY, name TEXT)`);
        });
    }
}
