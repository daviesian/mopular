System.register(['node_modules/mopidy/dist/mopidy.js', "angular2/core"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var MopidyJS, core_1, core_2;
    var Mopidy;
    return {
        setters:[
            function (MopidyJS_1) {
                MopidyJS = MopidyJS_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            }],
        execute: function() {
            Mopidy = (function () {
                function Mopidy(zone) {
                    this.mopidy = new MopidyJS.default({
                        autoConnect: false,
                        webSocketUrl: "ws://192.168.185.200:6680/mopidy/ws",
                        callingConvention: "by-position-or-by-name"
                    });
                    this.connectPromise = null;
                    this.zone = null;
                    this.zone = zone;
                }
                Mopidy.prototype.connect = function () {
                    var self = this;
                    if (!this.connectPromise) {
                        this.connectPromise = new Promise(function (resolve, reject) {
                            self.mopidy.once("state:online", function () {
                                resolve(self.mopidy);
                            });
                            self.mopidy.connect();
                        });
                    }
                    return this.connectPromise;
                };
                Mopidy = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [core_2.NgZone])
                ], Mopidy);
                return Mopidy;
            })();
            exports_1("Mopidy", Mopidy);
        }
    }
});
//# sourceMappingURL=Mopidy.js.map