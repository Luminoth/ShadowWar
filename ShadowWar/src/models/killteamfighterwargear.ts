import { WarGear } from "./wargear";

export const MaxHeavyWeapons: number = 1;

export class KillTeamFighterWarGear {

    private _wargear: WarGear;

    public get wargear(): WarGear {
        return this._wargear;
    }
}