System.register(['angular2/core', './Mopidy', "angular2/core"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Mopidy_1, core_2;
    var DirectoryComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Mopidy_1_1) {
                Mopidy_1 = Mopidy_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            }],
        execute: function() {
            DirectoryComponent = (function () {
                function DirectoryComponent(mopidy, element, cd) {
                    var _this = this;
                    this.choose = new core_1.EventEmitter();
                    this.loaded = new core_1.EventEmitter();
                    this.element = element;
                    mopidy.connect().then(function (m) {
                        return m.library.browse({ uri: _this.uri });
                    }).then(function (es) {
                        var anchors = {};
                        for (var _i = 0; _i < es.length; _i++) {
                            var e = es[_i];
                            var letter = e.name[0].toUpperCase();
                            if (!(letter in anchors)) {
                                anchors[letter] = _this.uri + "-first-" + letter;
                                ;
                                e.anchor = anchors[letter];
                            }
                        }
                        _this.letters = [];
                        for (var a in anchors) {
                            _this.letters.push({
                                letter: a,
                                anchor: anchors[a],
                            });
                        }
                        _this.entries = es;
                        cd.detectChanges();
                    }).then(function () {
                        _this.loaded.emit(_this.uri);
                    });
                }
                DirectoryComponent.prototype.onMouseMove = function ($event, element, entries) {
                    if ($event.which > 0) {
                        var f = $event.offsetY / element.clientHeight;
                        this.scrollTop = entries.scrollHeight * f;
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], DirectoryComponent.prototype, "uri", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], DirectoryComponent.prototype, "selectedChild", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], DirectoryComponent.prototype, "choose", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], DirectoryComponent.prototype, "loaded", void 0);
                DirectoryComponent = __decorate([
                    core_1.Component({
                        selector: "directory",
                        template: "\n\n        <div class=\"directory\">\n            <div #scroll class=\"scroller\" (mousemove)=\"onMouseMove($event, scroll, entriesElement)\" (mousedown)=\"onMouseMove($event, scroll, entriesElement)\">\n                <!--<a style=\"display:block; border-top: 1px solid #888;\" *ngFor=\"#letter of letters\" href=\"#{{letter.anchor}}\">{{letter.letter}}</a>-->\n            </div>\n            <div #entriesElement class=\"entries\" [scrollTop]=\"scrollTop\">\n                <div *ngFor=\"#entry of entries\">\n                    <a [class.selected]=\"entry.uri == selectedChild\" id=\"{{entry.anchor}}\" href=\"javascript:void(null)\" (click)=\"choose.emit({src: uri, entry: entry})\">{{entry.name}}</a>\n\n                </div>\n            </div>\n        </div>\n\n    ",
                        styles: ["\n        .directory {\n\n            display: inline-block;\n        }\n\n        .entries {\n            padding: 0px 5px;\n            height: 100%;\n            overflow-y:auto;\n            font-size: 0.9rem;\n        }\n\n        .entries a {\n            text-decoration: none;\n            color: #333;\n            display: block;\n        }\n\n        .entries a:hover {\n            background: #eee;\n        }\n\n        .scroller {\n            cursor:pointer;\n            float:left;\n            height:100%;\n            width:20px;\n            text-align: center;\n            overflow: hidden;\n            background: #eee;\n        }\n\n        .entries a.selected {\n            background-color: #369;\n            color: #fff;\n        }\n\n    "],
                    }), 
                    __metadata('design:paramtypes', [Mopidy_1.Mopidy, core_1.ElementRef, core_2.ChangeDetectorRef])
                ], DirectoryComponent);
                return DirectoryComponent;
            })();
            exports_1("DirectoryComponent", DirectoryComponent);
        }
    }
});
//# sourceMappingURL=directory.component.js.map