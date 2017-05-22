export class WarGearCharacteristics {

    public static fromJsonObject(object: any): WarGearCharacteristics {

        const characteristics: WarGearCharacteristics = new WarGearCharacteristics();

        characteristics._shortRangeMin = object.shortRangeMin;
        characteristics._shortRangeMax = object.shortRangeMax;
        characteristics._shortRangeHitModifier = object.shortRangeHitModifier || 0;

        characteristics._longRangeMin = object.longRangeMin;
        characteristics._longRangeMax = object.longRangeMax;
        characteristics._longRangeHitModifier = object.longRangeHitModifier || 0;

        characteristics._strength = object.str;
        characteristics._strengthModifier = object.strMod || 0;

        characteristics._damage = object.dam;
        characteristics._damageDice = object.damDice || 0;
        characteristics._saveModifier = object.saveMod || 0;
        characteristics._ammoRoll = object.ammoRoll;

        characteristics._armorSave = object.armorSave;
        characteristics._armorSaveDice = object.armorSaveDice || 1;
        characteristics._armorInvulnerableSave = object.armorInvulnerableSave;

        return characteristics;
    }

    private _shortRangeMin: number;
    private _shortRangeMax: number;
    private _shortRangeHitModifier: number;

    private _longRangeMin: number;
    private _longRangeMax: number;
    private _longRangeHitModifier: number;

    private _strength: number;
    private _strengthModifier: number;

    private _damage: number;
    private _damageDice: number;

    private _saveModifier: number;
    private _ammoRoll: number;

    private _armorSave: number;
    private _armorSaveDice: number;
    private _armorInvulnerableSave: number;
}