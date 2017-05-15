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
        faction._superFactionName = object.superFactionName;
        faction._specialRules = object.specialRules || [];
        faction._maxModels = object.maxModels;
        faction._maxSpecialists = object.maxSpecialists;
        return faction;
    }

    private _name: string;

    public get name(): string {
        return this._name;
    }

    private _superFactionName: string;

    public get superFactionName(): string {
        return this._superFactionName;
    }

    private _superFaction: Faction;

    public get superFaction(): Faction {
        return this._superFaction;
    }

    private _specialRules: string[];

    public get specialRules(): string[] {
        return this._specialRules;
    }

    private _maxModels: number;

    public get maxModels(): number {
        return this._maxModels;
    }

    private _maxSpecialists: number;

    public get maxSpecialists(): number {
        return this._maxSpecialists;
    }

    public getDataFileName(): string {
        return this.name.replace(/\s/g, "").toLowerCase() + ".json";
    }

    public updateFromSuperFaction(superFaction: Faction): void {
        this._superFaction = superFaction;

        this._specialRules.concat(superFaction.specialRules);

        this._maxModels = superFaction.maxModels;
        this._maxSpecialists = superFaction.maxSpecialists;
    }
}
