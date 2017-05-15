import { Faction } from "./faction";
import { Fighter, FighterType } from "./fighter";
import { KillTeamFighter } from "./killteamfighter";

export const MinimumModels: number = 3;

export const MaxNewRecruitPercent: number = 0.5;

export const MaximumPoints: number = 1000;

export class KillTeam {

    private _id: number;

    public get id(): number {
        return this._id;
    }

    private _name: string;

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    private _faction: Faction;

    public get faction(): Faction {
        return this._faction;
    }

    private _leader: KillTeamFighter;

    public get leader(): KillTeamFighter {
        return this._leader;
    }

    private _fighters: KillTeamFighter[] = [];

    public get fighters(): KillTeamFighter[] {
        return this._fighters;
    }

    public cost(): number {
        return this._fighters.map(x => x.fighter.cost).reduce((x, y) => x + y);
    }

    public setFaction(value: Faction, leader: Fighter): void {
        this._faction = value;

        if(FighterType.Leader === leader.type) {
            this._leader = new KillTeamFighter(leader);
        }

        this._fighters = [];
    }

    public addFighter(fighter: Fighter): void {
        if(FighterType.Leader === fighter.type) {
            return;
        }

        this._fighters.push(new KillTeamFighter(fighter));
    }
}