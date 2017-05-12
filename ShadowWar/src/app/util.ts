import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import { File } from "@ionic-native/file";

@Injectable()
export class Util {

    private assetPath: string = "";

    constructor(
        private platform: Platform,
        private file: File) {

        this.assetPath = this.file.applicationDirectory + "www/assets/";
    }

    public getAssetUrl(path: string): string {
        return this.assetPath + path;
    }
}