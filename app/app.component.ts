
import {Component, NgZone} from 'angular2/core';
import {Mopidy} from './Mopidy'

import {LibraryComponent} from "./library.component";
import {SliderComponent} from "./slider.component";
import {ChangeDetectorRef} from "angular2/core";

@Component({
    selector: 'my-app',
    template:  `<h1>Mopular</h1>
                <h2>{{currentTrack?.track?.name}}</h2>
                <slider style="display:block;" [value]="volume" (valueChanged)="onVolumeChanged($event)"></slider>
                <library (chooseTrack)="onLibraryChooseTrack($event)">Loading...</library>
                <ul class="heroes">
                    <li *ngFor="#track of tracks"
                        [class.selected]="currentTrack?.tlid == track.tlid">
                        <span class="badge">{{track.track.artists[0].name}}</span> {{track.track.name}}
                    </li>
                </ul>




                `,
    styles:[`
      .heroes {list-style-type: none; margin-left: 1em; padding: 0; width: 50em;}
      .heroes li { cursor: pointer; position: relative; left: 0; transition: all 0.2s ease; }
      .heroes li:hover {color: #369; background-color: #EEE; left: .2em;}
      .heroes .badge {
        font-size: small;
        color: white;
        padding: 0.1em 0.7em;
        background-color: #369;
        line-height: 1em;
        position: relative;
        left: -1px;
        top: -1px;
      }
      .selected { background-color: #EEE; color: #369; }

      library { display: block; border-top: 1px solid black; border-bottom: 1px solid black; }

      * { font-family: sans-serif; }
    `],
    directives: [LibraryComponent, SliderComponent],
})
export class AppComponent {
    public tracks;
    public currentTrack = null;
    private mopidyJS;
    private foo;

    private volume;

    private changeDetector: ChangeDetectorRef;

    constructor(mopidy: Mopidy, cd: ChangeDetectorRef) {

        this.foo = new Promise(r => {
            r([1,2,3,4,5]);
        });
/*
        this.tracks = new Promise(r => {
           r([])
        });
*/
        this.mopidyJS = mopidy.mopidy;
        this.changeDetector = cd;

        mopidy.connect();

        mopidy.mopidy.bind({
            'state:online': () => {
                this.updateCurrentTrack()
                this.updateTracklist();
                this.updateVolume();
            },
            'event:tracklistChanged': this.updateTracklist,
            'event:trackPlaybackEnded': () => { this.currentTrack = null; cd.detectChanges(); },
            'event:trackPlaybackStarted': this.updateCurrentTrack,
            'event:volumeChanged': this.updateVolume,

        });

        mopidy.mopidy.on((e) => {
            if (e.indexOf("websocket:") != 0) {
                console.debug("MOPIDY:", e);
            }
        })
    }

    updateCurrentTrack = () => {
        this.mopidyJS.playback.getCurrentTlTrack().then(t => {
            this.currentTrack = t;
            this.changeDetector.detectChanges();
        });
    }

    updateTracklist = () => {
        this.mopidyJS.tracklist.getTlTracks().then(ts => {
            this.tracks = ts;
            this.changeDetector.detectChanges();
        });
    }

    onLibraryChooseTrack(uri) {

        this.mopidyJS.tracklist.add({uris: [uri]}).then(ts => {
           this.mopidyJS.playback.play({tl_track: ts[0]});
        });

    }

    onVolumeChanged(newVol) {

        this.mopidyJS.mixer.setVolume({volume: Math.round(newVol*100)});
    }

    updateVolume = () => {
        return this.mopidyJS.mixer.getVolume().then(v => {
            this.volume = v/100.0;
            this.changeDetector.detectChanges();
        });
    }

}
