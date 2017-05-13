import { Fighter } from "./fighter";
import { KillTeamFighterWarGear } from "./killteamfighterwargear";

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

    private _isDead: boolean = false;

    public get isDead(): boolean {
        return this._isDead;
    }

    public set isDead(value: boolean) {
        this._isDead = value;
    }

    private _wargear: KillTeamFighterWarGear[] = [];

    constructor(private _fighter: Fighter) {
    }
}