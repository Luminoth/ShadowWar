import { FighterCharacteristics } from "./characteristics/fighter";

export enum FighterType {
    Leader,
    Trooper,
    NewRecruit,
    Specialist
}

export class Fighter {

    public static fromJsonObjects(objects: any[]): Fighter[] {

        const fighters: Fighter[] = [];
        for(let object of objects) {
            fighters.push(this.fromJsonObject(object));
        }
        return fighters;
    }

    public static fromJsonObject(object: any): Fighter {

        const fighter: Fighter = new Fighter();
        fighter._name = object.name;
        fighter._subFactionRestrictions = object.subFactionRestrictions || [];
        fighter._type = FighterType[object.type as string];
        fighter._cost = object.cost;
        fighter._characteristics = FighterCharacteristics.fromJsonObject(object.characteristics);
        fighter._standardWarGear = object.standardWarGear;
        fighter._availableWarGearLists = object.availableWarGearLists;
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

    private _cost: number;

    public get cost(): number {
        return this._cost;
    }

    private _characteristics: FighterCharacteristics;

    public get characteristics(): FighterCharacteristics {
        return this._characteristics;
    }

    private _standardWarGear: string[];

    public get standardWarGear(): string[] {
        return this._standardWarGear;
    }

    private _availableWarGearLists: string[];

    public get availableWarGearLists(): string[] {
        return this._availableWarGearLists;
    }
}
