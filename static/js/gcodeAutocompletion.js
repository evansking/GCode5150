(function (gCodeCompleter, undefined) {

    function getRepRapSnippets() {
        return [{
            name: "G0: Rapid Movement",
            content: "G0 ${1:_AxisPosition}",
            tabTrigger: "G0"
        },
        {
            name: "G1: Controlled Movement",
            content: "G1 ${1:_AxisPosition} F${2:_FeedRate}",
            tabTrigger: "G1"
        },
        {
            name: "G4: Dwell/Wait",
            content: "G4 P${1:_Time_ms}",
            tabTrigger: "G4"
        },
        {
            name: "G20: Set units to inches",
            content: "G20",
            tabTrigger: "G20"
        },
        {
            name: "G21: Set units to mm",
            content: "G21",
            tabTrigger: "G21"
        },
        {
            name: "G28: Home Axis",
            content: "G28 ${1:_Axis}",
            tabTrigger: "G28"
        },
        {
            name: "G90: Absolute Positioning",
            content: "G90",
            tabTrigger: "G90"
        },
        {
            name: "G91: Relative Positioning",
            content: "G91",
            tabTrigger: "G91"
        },
        {
            name: "G92: Set Position to Value",
            content: "G92 ${1:_Axis_Value}",
            tabTrigger: "G92"
        }];
    }

    function initSnippets(){
        var snippetManager = ace.require("ace/snippets").snippetManager;
        var config = ace.require("ace/config");
    
        ace.config.loadModule("ace/snippets/gcode", function(m) {
            if (m) {
                snippetManager.files.xml = m;
                m.snippets =  getRepRapSnippets();
                snippetManager.register(m.snippets, m.scope);
            }
        });
    }

    gCodeCompleter.init = function(editor){
        // Remove all autocompleters that are not the snippet autocompleter
        editor.completers = [editor.completers[0]];
        initSnippets();
    }
}(window.gCodeCompleter = window.gCodeCompleter || {}));