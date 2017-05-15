export class Equipment {

    public static fromJsonObjects(objects: any[]): Equipment[] {

        const equipment: Equipment[] = [];
        for(let object of objects) {
            equipment.push(this.fromJsonObject(object));
        }
        return equipment;
    }

    public static fromJsonObject(object: any): Equipment {

        const equipment: Equipment = new Equipment();
        equipment._name = object.name;
        equipment._cost = object.cost;
        equipment._weaponCostPercent = object.weaponCostPercent;
        equipment._weaponRestrictions = object.weaponRestrictions;
        equipment._fighterRestrictions = object.fighterRestrictions;
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

        const equipmentLists: EquipmentList[] = [];
        for(let object of objects) {
            equipmentLists.push(this.fromJsonObject(object));
        }
        return equipmentLists;
    }

    public static fromJsonObject(object: any): EquipmentList {

        const equipmentList: EquipmentList = new EquipmentList();
        equipmentList._name = object.name;
        equipmentList._equipment = Equipment.fromJsonObjects(object.equipment);
        return equipmentList;
    }

    private _name: string;

    private _equipment: Equipment[];
}

export class Armory {

    public static fromJsonObjects(objects: any[]): Armory[] {

        const equipment: Armory[] = [];
        for(let object of objects) {
            equipment.push(this.fromJsonObject(object));
        }
        return equipment;
    }

    public static fromJsonObject(object: any): Armory {

        const equipment: Armory = new Armory();
        equipment._factions = object.factions;
        equipment._equipmentLists = EquipmentList.fromJsonObjects(object.equipmentLists);
        return equipment;
    }

    private _factions: string[];

    private _equipmentLists: EquipmentList[];
}