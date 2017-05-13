export class Faction {

    public static fromJsonObjects(objects: any[]): Faction[] {

        const factions: Faction[] = [];
        for(let object of objects) {
            factions.push(this.fromJsonObject(object));
        }
        return factions;
    }

    public static fromJsonObject(object: any): Faction {

        const faction: Faction = new Faction();
        faction._name = object.name;
        faction._specialRules = object.specialRules;
        faction._fighters = object.fighters;
        faction._maxModels = object.maxModels;
        faction._maxSpecialists = object.maxSpecialists;
        return faction;
    }

    private _name: string;

    public get name(): string {
        return this._name;
    }

    private _specialRules: string[];

    public get special(): string[] {
        return this._specialRules;
    }

    private _fighters: string[];

    public get fighters(): string[] {
        return this._fighters;
    }

    private _maxModels: number;

    public get maxModels(): number {
        return this._maxModels;
    }

    private _maxSpecialists: number;

    public get maxSpecialists(): number {
        return this._maxSpecialists;
    }
}
