import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

const FilePath: string = "../assets/json/factions.json";

@Injectable()
export class FactionProvider {

    private factions: any = null;

    constructor(private http: Http) {
    }

    public getFactions() {
        if(this.factions) {
            return Promise.resolve(this.factions);
        }

        return new Promise(resolve =>
        {
            this.http.get(FilePath).map((res) => res.json())
                .subscribe(data => {
                    this.factions = data.factions;
                    resolve(this.factions);
                });
        });
    }
}
