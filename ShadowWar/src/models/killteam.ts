import { reorderArray } from "ionic-angular";

import { Faction } from "./faction";
import { Fighter, FighterType } from "./fighter";
import { KillTeamFighter } from "./killteamfighter";

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

    // TODO: this is *ordered* (important for building SQL)
    private _fighters: KillTeamFighter[] = [];

    public get fighters(): KillTeamFighter[] {
        return this._fighters;
    }

    public get fighterCount(): number {
        return 1 + this.fighters.length;
    }

    public get newRecruitCount(): number {
        return this.fighters.filter(fighter => FighterType.NewRecruit === fighter.fighter.type).length;
    }

    public get specialistCount(): number {
        return this.fighters.filter(fighter => FighterType.Specialist === fighter.fighter.type).length;
    }

    public get maxNewRecruitPercent(): number {
        return 0.5;
    }

    public get maximumPoints(): number {
        return 1000;
    }

    public get isValid(): boolean {
        return this.fighterCount >= this.faction.minModels && this.fighterCount <= this.faction.maxModels;
    }

    public value(): number {
        const value: number = null === this._leader ? 0 : this._leader.value();
        if(0 === this._fighters.length) {
            return value;
        }
        return value + this._fighters.map(x => x.value()).reduce((x, y) => x + y);
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

// TODO: make sure we don't add too many new recruits
// or too many specialists or straight up too many models
// not sure if going over points is useful or not

        this._fighters.push(new KillTeamFighter(fighter));
    }

    public removeFighter(fighter: KillTeamFighter): void {
        if(FighterType.Leader === fighter.fighter.type) {
            return;
        }

        const idx: number = this.fighters.indexOf(fighter);
        this.fighters.splice(idx, 1);
    }

    public reorderFighters(indexes: any): void {
        this._fighters = reorderArray(this._fighters, indexes);
    }
}