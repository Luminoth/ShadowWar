import { Injectable } from "@angular/core";
import { File } from "@ionic-native/file";

// TODO: move this file to the providers folder

@Injectable()
export class RestrictionValidator {

    constructor(
        private file: File) {
    }

    public validateRestriction(value: string, restrictions: string[]): boolean {

        let hasValue: boolean = false;
        let valid: boolean = false;

        for(let restriction of restrictions) {
            if(restriction.startsWith("~")) {
                if(value === restriction.substring(1)) {
                    return false;
                }
            } else {
                hasValue = true;
                if(value === restriction) {
                    valid = true;
                }
            }
        }

        return hasValue ? valid : true;
    }
}

@Injectable()
export class Util {

    private assetPath: string = "";

    constructor(
        private file: File) {

        this.assetPath = this.file.applicationDirectory + "www/assets/";
    }

    public getAssetPathUrl(path: string): string {
        return this.assetPath + path;
    }

    public getAssetFileUrl(path: string, name: string): string {
        return this.assetPath + path + name;
    }
}
