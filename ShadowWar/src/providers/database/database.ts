import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

const DefaultDatabaseName: string = "data.db";
const TableKillTeams: string = "killTeams";

@Injectable()
export class DatabaseProvider {

    private _databaseName: string = DefaultDatabaseName;

    public get databaseName(): string {
        return this._databaseName;
    }

    public set databaseName(value: string) {
        this._databaseName = !!value ? value : DefaultDatabaseName;
    }

    private database: SQLiteObject;

    constructor(private sqliteService: SQLite) {
    }

    public open(): Promise<any> {
        return this.sqliteService.create({
            name: this.databaseName,
            location: "default"
        }).then((db: SQLiteObject) => {
            this.database = db;
        });
    }

    public initialize(): Promise<any> {
// TODO: have this mirror entity frameworks migration stuff (and rename it to migrate())
        return this.database.transaction((tx: any) => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS ${TableKillTeams} (id INTEGER PRIMARY KEY, name TEXT)`);
        });
    }
}
