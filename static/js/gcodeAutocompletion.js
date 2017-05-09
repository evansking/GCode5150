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
        },
        {
            name: "M0: Stop All on Empty Buffer",
            content: "M0",
            tabTrigger: "M0"
        },
        {
            name: "M17: Enable All Stepper Motors",
            content: "M17",
            tabTrigger: "M17"
        },
        {
            name: "M18: Disable All Stepper Motors",
            content: "M18",
            tabTrigger: "M18"
        },
        {
            name: "M20: List Files at SD Root",
            content: "M20",
            tabTrigger: "M20"
        },
        {
            name: "M21: Mount SD Card",
            content: "M21",
            tabTrigger: "M21"
        },
        {
            name: "M22: Unmount SD Card",
            content: "M22",
            tabTrigger: "M22"
        },
        {
            name: "M23: Select File for Printing",
            content: "M23 ${1:_FileName}",
            tabTrigger: "M23"
        },
        {
            name: "M24: Start/Resume SD Card Print",
            content: "M24",
            tabTrigger: "M24"
        },
        {
            name: "M25: Pause SD Card Print",
            content: "M25",
            tabTrigger: "M25"
        },
        {
            name: "M26: Set SD Position in bytes",
            content: "M26 S${1:_Bytes}",
            tabTrigger: "M26"
        },
        {
            name: "M27: Report SD Print Status",
            content: "M27",
            tabTrigger: "M27"
        },
        {
            name: "M28: Write Program to SD Card",
            content: "M28 ${1:_FileName}",
            tabTrigger: "M28"
        },
        {
            name: "M29: Stop Writing Program to SD Card",
            content: "M29 ${1:_FileName}",
            tabTrigger: "M29"
        },
        {
            name: "M40: Eject Part",
            content: "M40",
            tabTrigger: "M40"
        },
        {
            name: "M41: Loop Program",
            content: "M41",
            tabTrigger: "M41"
        },
        {
            name: "M42: Stop if Out of Material",
            content: "M42",
            tabTrigger: "M42"
        },
        {
            name: "M43: Stop if Out of Material and Leave Heated Bed On",
            content: "M43",
            tabTrigger: "M43"
        },
        {
            name: "M80: Turn On ATX Power",
            content: "M80",
            tabTrigger: "M80"
        },
        {
            name: "M81: Turn Off ATX Power",
            content: "M81",
            tabTrigger: "M81"
        },
        {
            name: "M84: Stop Idle Hold",
            content: "M84",
            tabTrigger: "M84"
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