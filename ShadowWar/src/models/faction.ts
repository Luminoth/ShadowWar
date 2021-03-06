﻿export class Faction {

    public static fromJsonObjects(objects: any[]): Faction[] {

        return objects.map(object => this.fromJsonObject(object));
    }

    public static fromJsonObject(object: any): Faction {

        const faction: Faction = new Faction();
        faction._name = object.name;
        faction._superFactionName = object.superFactionName;
        faction._specialRules = object.specialRules || [];
        faction._minModels = object.minModels || 3;
        faction._maxModels = object.maxModels || 10;
        faction._maxSpecialists = object.maxSpecialists || 2;
        faction._maxDrones = object.maxDrones || 3;
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

    private _minModels: number;

    public get minModels(): number {
        return this._minModels;
    }

    private _maxModels: number;

    public get maxModels(): number {
        return this._maxModels;
    }

    private _maxSpecialists: number;

    public get maxSpecialists(): number {
        return this._maxSpecialists;
    }

    private _maxDrones: number;

    public get maxDrones(): number {
        return this._maxDrones;
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
