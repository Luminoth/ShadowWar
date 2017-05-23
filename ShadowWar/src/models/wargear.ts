import { WarGearCharacteristics } from "./characteristics/wargear";

// NOTE: these are in sort order
export enum WarGearType {
    Armour,
    SpecialisedEquipment,
    Ammo,
    Gunsight,
    Grenade,
    HandToHandCombatWeapon,
    Pistol,
    BasicWeapon,
    SpecialWeapon,
    HeavyWeapon
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

    public get isWeapon(): boolean {
        return WarGearType.HandToHandCombatWeapon === this.type
            || WarGearType.Pistol === this.type
            || WarGearType.BasicWeapon === this.type
            || WarGearType.SpecialWeapon === this.type
            || WarGearType.HeavyWeapon === this.type
            || WarGearType.Grenade === this.type;
    }

    public get isArmour(): boolean {
        return WarGearType.Armour === this.type;
    }

    public get isEquipment(): boolean {
        return WarGearType.Ammo === this.type
            || WarGearType.Gunsight === this.type
            || WarGearType.SpecialisedEquipment === this.type;
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

    public compareTo(wargear: WarGear): number {
        return this.type - wargear.type;
    }
}
