export class WarGearCharacteristics {

    public static fromJsonObject(object: any): WarGearCharacteristics {

        const characteristics: WarGearCharacteristics = new WarGearCharacteristics();

        characteristics._shortRangeMin = object.shortRangeMin;
        characteristics._shortRangeMax = object.shortRangeMax;
        characteristics._shortRangeHitModifier = object.shortRangeHitModifier;

        characteristics._longRangeMin = object.longRangeMin;
        characteristics._longRangeMax = object.longRangeMax;
        characteristics._longRangeHitModifier = object.longRangeHitModifier;

        characteristics._strength = object.str;
        characteristics._strengthModifier = object.strMod;

        characteristics._damage = object.dam;
        characteristics._damageDice = object.damDice;
        characteristics._saveModifier = object.saveMod;
        characteristics._ammoRoll = object.ammoRoll;

        characteristics._armorSave = object.armorSave;
        characteristics._armorSaveDice = object.armorSaveDice;
        characteristics._armorInvulnerableSave = object.armorInvulnerableSave;

        return characteristics;
    }

    private _shortRangeMin: number;
    private _shortRangeMax: number;
    private _shortRangeHitModifier: number = 0;

    private _longRangeMin: number;
    private _longRangeMax: number;
    private _longRangeHitModifier: number = 0;

    private _strength: number;
    private _strengthModifier: number = 0;

    private _damage: number;
    private _damageDice: number = 0;

    private _saveModifier: number = 0;
    private _ammoRoll: number;

    private _armorSave: number;
    private _armorSaveDice: number = 1;
    private _armorInvulnerableSave: number;
}