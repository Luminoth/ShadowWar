﻿import { WarGearCharacteristics } from "./characteristics/wargear";

export enum WarGearType {
    HandToHandCombatWeapon,
    Pistol,
    BasicWeapon,
    SpecialWeapon,
    HeavyWeapon,
    Grenade,
    Armour,
    Ammo,
    Gunsight,
    Equipment
}

export class WarGear {

    public static fromJsonObjects(objects: any[]): WarGear[] {

        return objects.map(object => this.fromJsonObject(object));
    }

    public static fromJsonObject(object: any): WarGear {

        const wargear: WarGear = new WarGear();
        wargear._name = object.name;
        wargear._baseWarGear = object.baseWarGear;
        wargear._type = WarGearType[object.type as string];
        wargear._characteristics = WarGearCharacteristics.fromJsonObject(object.characteristics);
        wargear._maxAvailable = object.maxAvailable || -1;
        wargear._specialRules = object.specialRules || [];
        return wargear;
    }

    private _name: string;

    public get name(): string {
        return this._name;
    }

    private _baseWarGear: string;

    public get baseWarGear(): string {
        return this._baseWarGear;
    }

    private _type: WarGearType;

    public get type(): WarGearType {
        return this._type;
    }

    private _characteristics: WarGearCharacteristics;

    public get characteristics(): WarGearCharacteristics {
        return this._characteristics;
    }

    private _maxAvailable: number;

    public get maxAvailable(): number {
        return this._maxAvailable;
    }

    private _specialRules: string[];

    public updateFromBaseWarGear(baseWarGear: WarGear): void {
        this._type = baseWarGear._type;
        this._characteristics = baseWarGear._characteristics;
        this._specialRules = baseWarGear._specialRules;
    }
}
