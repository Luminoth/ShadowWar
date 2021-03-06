﻿export class Equipment {

    public static fromJsonObjects(objects: any[]): Equipment[] {

        return objects.map(object => this.fromJsonObject(object));
    }

    public static fromJsonObject(object: any): Equipment {

        const equipment: Equipment = new Equipment();
        equipment._name = object.name;
        equipment._cost = object.cost;
        equipment._weaponCostPercent = object.weaponCostPercent;
        equipment._weaponRestrictions = object.weaponRestrictions || [];
        equipment._fighterRestrictions = object.fighterRestrictions || [];
        return equipment;
    }

    private _name: string;

    private _cost: number;

    private _weaponCostPercent: number;

    private _weaponRestrictions: string[];

    private _fighterRestrictions: string[];
}

export class EquipmentList {

    public static fromJsonObjects(objects: any[]): EquipmentList[] {

        return objects.map(object => this.fromJsonObject(object));
    }

    public static fromJsonObject(object: any): EquipmentList {

        const equipmentList: EquipmentList = new EquipmentList();
        equipmentList._name = object.name;
        equipmentList._equipment = Equipment.fromJsonObjects(object.equipment);
        return equipmentList;
    }

    private _name: string;

    public get name(): string {
        return this._name;
    }

    private _equipment: Equipment[];
}
