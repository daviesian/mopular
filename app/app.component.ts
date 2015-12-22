
import {Component, NgZone, OnInit} from 'angular2/core';
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
                        <span class="badge">{{track.track.artists ? track.track.artists[0]?.name : ""}}</span> {{track.track.name}}
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
export class AppComponent implements OnInit {
    public tracks;
    public currentTrack = null;

    private volume;


    constructor(private mopidy: Mopidy, private changeDetector: ChangeDetectorRef) { }

    ngOnInit() {
        this.mopidy.connect();

        this.mopidy.mopidy.bind({
            'state:online': () => {
                this.updateCurrentTrack()
                this.updateTracklist();
                this.updateVolume();
            },
            'event:tracklistChanged': this.updateTracklist,
            'event:trackPlaybackEnded': () => { this.currentTrack = null; this.changeDetector.detectChanges(); },
            'event:trackPlaybackStarted': this.updateCurrentTrack,
            'event:volumeChanged': this.updateVolume,

        });

        this.mopidy.mopidy.on((e) => {
            if (e.indexOf("websocket:") != 0) {
                console.debug("MOPIDY:", e);
            }
        })
    }

    updateCurrentTrack = () => {
        this.mopidy.mopidy.playback.getCurrentTlTrack().then(t => {
            this.currentTrack = t;
            this.changeDetector.detectChanges();
        });
    }

    updateTracklist = () => {
        this.mopidy.mopidy.tracklist.getTlTracks().then(ts => {
            this.tracks = ts;
            this.changeDetector.detectChanges();
        });
    }

    onLibraryChooseTrack(uri) {

        this.mopidy.mopidy.tracklist.add({uris: [uri]}).then(ts => {
           this.mopidy.mopidy.playback.play({tl_track: ts[0]});
        });

    }

    onVolumeChanged(newVol) {

        this.mopidy.mopidy.mixer.setVolume({volume: Math.round(newVol*100)});
    }

    updateVolume = () => {
        return this.mopidy.mopidy.mixer.getVolume().then(v => {
            this.volume = v/100.0;
            this.changeDetector.detectChanges();
        });
    }

}
