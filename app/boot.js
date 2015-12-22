System.register(['angular2/platform/browser', './app.component', './Mopidy'], function(exports_1) {
    var browser_1, app_component_1, Mopidy_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (Mopidy_1_1) {
                Mopidy_1 = Mopidy_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [Mopidy_1.Mopidy]);
        }
    }
});
//# sourceMappingURL=boot.js.map