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

    private _weaponSkill: number;

    private _ballisticSkill: number;

    private _strength: number;

    private _toughness: number;

    private _wounds: number;

    private _initiative: number;

    private _attacks: number;

    private _leadership: number;
}