import { WarGearCharacteristics } from "./characteristics/wargear";

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

        const wargear: WarGear[] = [];
        for(let object of objects) {
            wargear.push(this.fromJsonObject(object));
        }
        return wargear;
    }

    public static fromJsonObject(object: any): WarGear {

        const wargear: WarGear = new WarGear();
        wargear._name = object.name;
        wargear._baseWarGear = object.baseWarGear;
        wargear._type = WarGearType[object.type as string];
        wargear._characteristics = WarGearCharacteristics.fromJsonObject(object.characteristics);
        wargear._specialRules = object.specialRules;
        return wargear;
    }

    private _name: string;

    public get name(): string {
        return this._name;
    }

    private _baseWarGear: string;

    private _type: WarGearType;

    public get type(): WarGearType {
        return this._type;
    }

    private _characteristics: WarGearCharacteristics;

    public get characteristics(): WarGearCharacteristics {
        return this._characteristics;
    }

    private _specialRules: string[];
}
