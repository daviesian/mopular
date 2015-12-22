System.register(['angular2/core', './directory.component', "angular2/core"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, directory_component_1, core_2;
    var LibraryComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (directory_component_1_1) {
                directory_component_1 = directory_component_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            }],
        execute: function() {
            LibraryComponent = (function () {
                function LibraryComponent() {
                    this.uris = [null, "local:directory", "local:directory?type=artist", "local:artist:md5:ae7fd597de5976bd8c288ae4eb255d47"]; //[null];
                    this.scrollLeft = 0;
                    this.i = 0;
                    this.chooseTrack = new core_2.EventEmitter();
                }
                LibraryComponent.prototype.onChoose = function ($event) {
                    this.uris = this.uris.slice(0, this.uris.indexOf($event.src) + 1);
                    if ($event.entry.type == "track") {
                        console.log("Chose track:", $event.entry);
                        this.chooseTrack.emit($event.entry.uri);
                    }
                    else {
                        this.uris.push($event.entry.uri);
                    }
                };
                LibraryComponent.prototype.onLoaded = function () {
                    this.scrollLeft = 99999 + this.i++;
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], LibraryComponent.prototype, "chooseTrack", void 0);
                LibraryComponent = __decorate([
                    core_1.Component({
                        selector: "library",
                        template: "\n        <div class=\"library\" [scrollLeft]=\"scrollLeft\">\n            <directory *ngFor=\"#uri of uris; #i = index\" [uri]=\"uri\" [selectedChild]=\"uris[i+1]\" (choose)=\"onChoose($event)\" (loaded)=\"onLoaded()\">Loading...</directory>\n        </div>\n    ",
                        styles: ["\n        .library {\n            width:100%;\n            overflow-x:auto;\n            white-space:nowrap;\n            height:30%;\n            overflow-y: hidden;\n        }\n    "],
                        directives: [directory_component_1.DirectoryComponent],
                    }), 
                    __metadata('design:paramtypes', [])
                ], LibraryComponent);
                return LibraryComponent;
            })();
            exports_1("LibraryComponent", LibraryComponent);
        }
    }
});
//# sourceMappingURL=library.component.js.map