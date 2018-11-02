

import { Injectable } from "@angular/core";

@Injectable()
export class IconsService {
    icons: string[] = [];
    constructor(){
        this.icons = this.returnIcons();
    }

    returnIcons(){
        return ["build", "bookmarks", "cached", "donut_large", "favorite", "extension", "pets", "thumb_up", 
        "today", "update", "warning", "error", "call", "vpn_key", "create", "sort", "undo", "weekend",
        "highlight", "access_time", "vertical_align_center", "done_outline"];
    }
}