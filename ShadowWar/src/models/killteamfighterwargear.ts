import { Wargear } from "./wargear";

export const MaxHeavyWeapons: number = 1;

export class KillTeamFighterWargear {

    private _wargear: Wargear;

    public get wargear(): Wargear {
        return this._wargear;
    }
}