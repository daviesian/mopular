System.register(["angular2/core"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, core_2, core_3, core_4;
    var SliderComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
                core_3 = core_1_1;
                core_4 = core_1_1;
            }],
        execute: function() {
            SliderComponent = (function () {
                function SliderComponent() {
                    this.valueChanged = new core_4.EventEmitter();
                }
                SliderComponent.prototype.onMouseMove = function (e, outer) {
                    if (e.which > 0) {
                        var f = e.layerX / outer.clientWidth;
                        this.value = Math.round(f * 100) / 100.0;
                        this.valueChanged.emit(f);
                    }
                };
                __decorate([
                    core_2.Input(), 
                    __metadata('design:type', Object)
                ], SliderComponent.prototype, "value", void 0);
                __decorate([
                    core_3.Output(), 
                    __metadata('design:type', Object)
                ], SliderComponent.prototype, "valueChanged", void 0);
                SliderComponent = __decorate([
                    core_1.Component({
                        selector: "slider",
                        template: "\n        <div #outer class=\"outer\" (mousemove)=\"onMouseMove($event, outer)\" (mousedown)=\"onMouseMove($event, outer)\">\n            <div class=\"inner\" [style.width.%]=\"value*100\"></div>\n            <div class=\"dot\" [style.left.%]=\"value*100\"></div>\n        </div>\n    ",
                        styles: ["\n        .outer {\n            height: 20px;\n            background: #e0efff;\n            position: relative;\n            cursor: pointer;\n            border: 1px solid black;\n            border-bottom:none;\n        }\n\n        .inner {\n            position: absolute;\n            left: 0;\n            width: 0%;\n            top: 9px;\n            height: 2px;\n            background: black;\n        }\n        .dot {\n            position: absolute;\n            margin-left: -5px;\n            border-radius: 8px;\n            top: 3px;\n            width: 10px;\n            height: 10px;\n            border: 2px solid black;\n            background: white;\n        }\n    "],
                    }), 
                    __metadata('design:paramtypes', [])
                ], SliderComponent);
                return SliderComponent;
            })();
            exports_1("SliderComponent", SliderComponent);
        }
    }
});
//# sourceMappingURL=slider.component.js.map