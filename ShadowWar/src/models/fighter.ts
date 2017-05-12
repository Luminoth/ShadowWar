export enum FighterType {
    Leader,
    Trooper,
    Specialist,
    NewRecruit
}

export class Fighter {

    public static fromJsonObjects(objects: any[]): Fighter[]
    {
        const fighters: Fighter[] = [];
        for(let object of objects) {
            fighters.push(this.fromJsonObject(object));
        }
        return fighters;
    }

    public static fromJsonObject(object: any): Fighter
    {
        const fighter: Fighter = new Fighter();
        fighter._name = object.name;
        fighter._type = object.type;
        fighter._cost = object.cost;
        return fighter;
    }

    private _name: string;

    public get name(): string {
        return this._name;
    }

    private _type: FighterType;

    public get type(): FighterType {
        return this._type;
    }

    private _cost: number;

    public get cost(): number {
        return this._cost;
    }
}
