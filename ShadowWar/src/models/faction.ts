import { Fighter } from "./fighter";

export class Faction {

    public static fromJsonObjects(objects: any[]): Faction[]
    {
        const factions: Faction[] = [];
        for(let object of objects) {
            factions.push(this.fromJsonObject(object));
        }
        return factions;
    }

    public static fromJsonObject(object: any): Faction
    {
        const faction: Faction = new Faction();
        faction._name = object.name;
        faction._fighters = Fighter.fromJsonObjects(object.fighters);
        return faction;
    }

    private _name: string;

    public get name(): string {
        return this._name;
    }

    private _fighters: Fighter[];

    public get fighters(): Fighter[] {
        return this._fighters;
    }
}
