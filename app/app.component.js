System.register(['angular2/core', './Mopidy', "./library.component", "./slider.component", "angular2/core"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Mopidy_1, library_component_1, slider_component_1, core_2;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Mopidy_1_1) {
                Mopidy_1 = Mopidy_1_1;
            },
            function (library_component_1_1) {
                library_component_1 = library_component_1_1;
            },
            function (slider_component_1_1) {
                slider_component_1 = slider_component_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(mopidy, cd) {
                    var _this = this;
                    this.currentTrack = null;
                    this.updateCurrentTrack = function () {
                        _this.mopidyJS.playback.getCurrentTlTrack().then(function (t) {
                            _this.currentTrack = t;
                            _this.changeDetector.detectChanges();
                        });
                    };
                    this.updateTracklist = function () {
                        _this.mopidyJS.tracklist.getTlTracks().then(function (ts) {
                            _this.tracks = ts;
                            _this.changeDetector.detectChanges();
                        });
                    };
                    this.updateVolume = function () {
                        return _this.mopidyJS.mixer.getVolume().then(function (v) {
                            _this.volume = v / 100.0;
                            _this.changeDetector.detectChanges();
                        });
                    };
                    this.foo = new Promise(function (r) {
                        r([1, 2, 3, 4, 5]);
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
                        'state:online': function () {
                            _this.updateCurrentTrack();
                            _this.updateTracklist();
                            _this.updateVolume();
                        },
                        'event:tracklistChanged': this.updateTracklist,
                        'event:trackPlaybackEnded': function () { _this.currentTrack = null; cd.detectChanges(); },
                        'event:trackPlaybackStarted': this.updateCurrentTrack,
                        'event:volumeChanged': this.updateVolume,
                    });
                    mopidy.mopidy.on(function (e) {
                        if (e.indexOf("websocket:") != 0) {
                            console.debug("MOPIDY:", e);
                        }
                    });
                }
                AppComponent.prototype.onLibraryChooseTrack = function (uri) {
                    var _this = this;
                    this.mopidyJS.tracklist.add({ uris: [uri] }).then(function (ts) {
                        _this.mopidyJS.playback.play({ tl_track: ts[0] });
                    });
                };
                AppComponent.prototype.onVolumeChanged = function (newVol) {
                    this.mopidyJS.mixer.setVolume({ volume: Math.round(newVol * 100) });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "<h1>Mopular</h1>\n                <h2>{{currentTrack?.track?.name}}</h2>\n                <slider style=\"display:block;\" [value]=\"volume\" (valueChanged)=\"onVolumeChanged($event)\"></slider>\n                <library (chooseTrack)=\"onLibraryChooseTrack($event)\">Loading...</library>\n                <ul class=\"heroes\">\n                    <li *ngFor=\"#track of tracks\"\n                        [class.selected]=\"currentTrack?.tlid == track.tlid\">\n                        <span class=\"badge\">{{track.track.artists[0].name}}</span> {{track.track.name}}\n                    </li>\n                </ul>\n\n\n\n\n                ",
                        styles: ["\n      .heroes {list-style-type: none; margin-left: 1em; padding: 0; width: 50em;}\n      .heroes li { cursor: pointer; position: relative; left: 0; transition: all 0.2s ease; }\n      .heroes li:hover {color: #369; background-color: #EEE; left: .2em;}\n      .heroes .badge {\n        font-size: small;\n        color: white;\n        padding: 0.1em 0.7em;\n        background-color: #369;\n        line-height: 1em;\n        position: relative;\n        left: -1px;\n        top: -1px;\n      }\n      .selected { background-color: #EEE; color: #369; }\n\n      library { display: block; border-top: 1px solid black; border-bottom: 1px solid black; }\n\n      * { font-family: sans-serif; }\n    "],
                        directives: [library_component_1.LibraryComponent, slider_component_1.SliderComponent],
                    }), 
                    __metadata('design:paramtypes', [Mopidy_1.Mopidy, core_2.ChangeDetectorRef])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map