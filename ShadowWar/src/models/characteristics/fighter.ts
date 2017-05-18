export class FighterCharacteristics {

    public static fromJsonObject(object: any): FighterCharacteristics {

        const characteristics: FighterCharacteristics = new FighterCharacteristics();
        characteristics._movement = object.m;
        characteristics._weaponSkill = object.ws;
        characteristics._ballisticSkill = object.bs;
        characteristics._strength = object.s;
        characteristics._toughness = object.t;
        characteristics._wounds = object.w;
        characteristics._initiative = object.i;
        characteristics._attacks = object.a;
        characteristics._leadership = object.ld;
        return characteristics;
    }

    private _movement: number;

    public get movement(): number {
        return this._movement;
    }

    private _weaponSkill: number;

    public get weaponSkill(): number {
        return this._weaponSkill;
    }

    private _ballisticSkill: number;

    public get ballisticSkill(): number {
        return this._ballisticSkill;
    }

    private _strength: number;

    public get strength(): number {
        return this._strength;
    }

    private _toughness: number;

    public get toughness(): number {
        return this._toughness;
    }

    private _wounds: number;

    public get wounds(): number {
        return this._wounds;
    }

    private _initiative: number;

    public get initiative(): number {
        return this._initiative;
    }

    private _attacks: number;

    public get attacks(): number {
        return this._attacks;
    }

    private _leadership: number;

    public get leadership(): number {
        return this._leadership;
    }
}