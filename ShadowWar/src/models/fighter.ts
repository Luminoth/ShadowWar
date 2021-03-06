﻿import { FighterCharacteristics } from "./characteristics/fighter";

export enum FighterType {
    Leader,
    Trooper,
    NewRecruit,
    Specialist,
    Drone
}

export class Fighter {

    public static fromJsonObjects(objects: any[]): Fighter[] {

        return objects.map(object => this.fromJsonObject(object));
    }

    public static fromJsonObject(object: any): Fighter {

        const fighter: Fighter = new Fighter();
        fighter._name = object.name;
        fighter._subFactionRestrictions = object.subFactionRestrictions || [];
        fighter._type = FighterType[object.type as string];
        fighter._cost = object.cost;
        fighter._characteristics = FighterCharacteristics.fromJsonObject(object.characteristics);
        fighter._specialRules = object.specialRules || [];
        fighter._standardWargear = object.standardWargear || [];
        fighter._requiredWargear = object.requiredWargear || [];
        fighter._availableWargearLists = object.availableWargearLists || [];
        fighter._psychicAbilities = object.psychicAbilities || [];
        return fighter;
    }

    private _name: string;

    public get name(): string {
        return this._name;
    }

    private _subFactionRestrictions: string[];

    public get subFactionRestrictions(): string[] {
        return this._subFactionRestrictions;
    }

    private _type: FighterType;

    public get type(): FighterType {
        return this._type;
    }

    public getTypeString(): string {
        if(this._type === FighterType.NewRecruit) {
            return "New Recruit";
        }
        return FighterType[this._type];
    }

    private _cost: number;

    public get cost(): number {
        return this._cost;
    }

    private _characteristics: FighterCharacteristics;

    public get characteristics(): FighterCharacteristics {
        return this._characteristics;
    }

    private _specialRules: string[];

    public get specialRules(): string[] {
        return this._specialRules;
    }

    private _standardWargear: string[];

    public get standardWargear(): string[] {
        return this._standardWargear;
    }

    private _requiredWargear: [string, number][];

    public get requiredWargear(): [string, number][] {
        return this._requiredWargear;
    }

    private _availableWargearLists: string[];

    public get availableWargearLists(): string[] {
        return this._availableWargearLists;
    }

    private _psychicAbilities: string[];

    public get psychicAbilities(): string[] {
        return this._psychicAbilities;
    }
}
