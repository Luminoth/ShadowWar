import { WargearCharacteristics } from "./characteristics/wargear";

// NOTE: these are in sort order
export enum WargearType {
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

export class Wargear {

    public static fromJsonObjects(objects: any[]): Wargear[] {

        return objects.map(object => this.fromJsonObject(object));
    }

    public static fromJsonObject(object: any): Wargear {

        const wargear: Wargear = new Wargear();
        wargear._name = object.name;
        if(object.baseWargear) {
            wargear._baseWargear = object.baseWargear;
        } else {
            wargear._type = WargearType[object.type as string];
            wargear._characteristics = WargearCharacteristics.fromJsonObject(object.characteristics);
            wargear._maxAvailable = object.maxAvailable || -1;
            wargear._specialRules = object.specialRules || [];
        }
        return wargear;
    }

    private _name: string;

    public get name(): string {
        return this._name;
    }

    private _baseWargear: string;

    public get baseWargear(): string {
        return this._baseWargear;
    }

    private _type: WargearType;

    public get type(): WargearType {
        return this._type;
    }

    public get isWeapon(): boolean {
        return WargearType.HandToHandCombatWeapon === this.type
            || WargearType.Pistol === this.type
            || WargearType.BasicWeapon === this.type
            || WargearType.SpecialWeapon === this.type
            || WargearType.HeavyWeapon === this.type
            || WargearType.Grenade === this.type;
    }

    public get isArmour(): boolean {
        return WargearType.Armour === this.type;
    }

    public get isEquipment(): boolean {
        return WargearType.Ammo === this.type
            || WargearType.Gunsight === this.type
            || WargearType.SpecialisedEquipment === this.type;
    }

    private _characteristics: WargearCharacteristics;

    public get characteristics(): WargearCharacteristics {
        return this._characteristics;
    }

    private _maxAvailable: number;

    public get maxAvailable(): number {
        return this._maxAvailable;
    }

    private _specialRules: string[];

    public updateFromBaseWargear(baseWargear: Wargear): void {
        this._type = baseWargear._type;
        this._characteristics = baseWargear._characteristics;
        this._specialRules = baseWargear._specialRules;
    }

    public compareTo(wargear: Wargear): number {
        return this.type - wargear.type;
    }
}
