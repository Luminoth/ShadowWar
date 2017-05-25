import { Fighter } from "./fighter";
import { KillTeamFighterWargear } from "./killteamfighterwargear";

export class KillTeamFighter {

    public get fighter(): Fighter {
        return this._fighter;
    }

    private _name: string;

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    private _wargear: KillTeamFighterWargear[] = [];

    public get wargear(): KillTeamFighterWargear[] {
        return this._wargear;
    }

    constructor(private _fighter: Fighter) {
    }

    private onWargearSelected(): void {
    }

    private addWargear(): void {
// TODO: add the wargear
        this._wargear.sort((x, y) => x.wargear.compareTo(y.wargear));
    }

    public value(): number {
        // TODO: calculate and add in wargear cost
        return this.fighter.cost;
    }
}
