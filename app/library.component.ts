import {Component, Renderer, ElementRef, Output} from 'angular2/core';

import {DirectoryComponent} from './directory.component';
import {EventEmitter} from "angular2/core";

@Component({
    selector: "library",
    template: `
        <div class="library" [scrollLeft]="scrollLeft">
            <directory *ngFor="#uri of uris; #i = index" [uri]="uri" [selectedChild]="uris[i+1]" (choose)="onChoose($event)" (loaded)="onLoaded()">Loading...</directory>
        </div>
    `,
    styles: [`
        .library {
            width:100%;
            overflow-x:auto;
            white-space:nowrap;
            height:30%;
            overflow-y: hidden;
        }
    `],
    directives: [DirectoryComponent],
})
export class LibraryComponent {

    private uris = [null, "local:directory", "local:directory?type=artist", "local:artist:md5:ae7fd597de5976bd8c288ae4eb255d47"];//[null];
    private scrollLeft = 0;
    private i = 0;

    @Output() chooseTrack = new EventEmitter();

    private onChoose($event) {
        this.uris = this.uris.slice(0, this.uris.indexOf($event.src)+1);

        if ($event.entry.type == "track") {
            console.log("Chose track:", $event.entry);
            this.chooseTrack.emit($event.entry.uri);

        } else {
            this.uris.push($event.entry.uri);
        }


    }

    private onLoaded() {
        this.scrollLeft = 99999+this.i++;
    }
}