import { Observable } from "rxjs/Observable";

export class KillTeam {

    private _changes: any;

    public get changes(): any {
        return this._changes;
    }

    private observer: any;

    private _id: number;

    public get id(): number {
        return this._id;
    }

    private _name: string;

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
        this.observer.next(true);
    }

    constructor() {
        this._changes = Observable.create(observer => {
            this.observer = observer;
        });
    }
}