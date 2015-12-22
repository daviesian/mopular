import {Component, Input, Output, EventEmitter, ElementRef} from 'angular2/core';
import {Mopidy} from './Mopidy'
import {ChangeDetectorRef} from "angular2/core";

@Component({
    selector: "directory",
    template: `

        <div class="directory">
            <div #scroll class="scroller" (mousemove)="onMouseMove($event, scroll, entriesElement)" (mousedown)="onMouseMove($event, scroll, entriesElement)">
                <!--<a style="display:block; border-top: 1px solid #888;" *ngFor="#letter of letters" href="#{{letter.anchor}}">{{letter.letter}}</a>-->
            </div>
            <div #entriesElement class="entries" [scrollTop]="scrollTop">
                <div *ngFor="#entry of entries">
                    <a [class.selected]="entry.uri == selectedChild" id="{{entry.anchor}}" href="javascript:void(null)" (click)="choose.emit({src: uri, entry: entry})">{{entry.name}}</a>

                </div>
            </div>
        </div>

    `,
    styles: [`
        .directory {

            display: inline-block;
        }

        .entries {
            padding: 0px 5px;
            height: 100%;
            overflow-y:auto;
            font-size: 0.9rem;
        }

        .entries a {
            text-decoration: none;
            color: #333;
            display: block;
        }

        .entries a:hover {
            background: #eee;
        }

        .scroller {
            cursor:pointer;
            float:left;
            height:100%;
            width:20px;
            text-align: center;
            overflow: hidden;
            background: #eee;
        }

        .entries a.selected {
            background-color: #369;
            color: #fff;
        }

    `],
})
export class DirectoryComponent {
    @Input() private uri;
    @Input() private selectedChild;
    @Output() private choose = new EventEmitter();
    @Output() private loaded = new EventEmitter();

    private entries;
    private letters;

    private scrollTop;
    private element;

    constructor(mopidy: Mopidy, element: ElementRef, cd: ChangeDetectorRef) {

        this.element = element;

        mopidy.connect().then(m => {
            return m.library.browse({uri: this.uri})
        }).then(es => {
            var anchors = {};
            for (var e of es) {
                let letter = e.name[0].toUpperCase();
                if (!(letter in anchors)) {
                    anchors[letter] = this.uri + "-first-" + letter;;
                    e.anchor = anchors[letter];
                }
            }

            this.letters = [];
            for(var a in anchors) {
                this.letters.push({
                    letter: a,
                    anchor: anchors[a],
                });
            }

            this.entries = es;
            cd.detectChanges();
        }).then(() => {
            this.loaded.emit(this.uri); }
        );
    }

    onMouseMove($event: MouseEvent, element, entries) {
        if ($event.which > 0) {
            var f = $event.offsetY / element.clientHeight;
            this.scrollTop = entries.scrollHeight * f;
        }
    }
}