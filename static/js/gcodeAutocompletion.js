/**
 Class to handle automatic suggestions in the GCode editor. 
 When users type, they will be presented with a list
 of commands & descriptions that match what they've been typing.
 This means the user can type in a command or the description of
 a command, and be prompted with relevant suggestions.
 **/
(function (gCodeCompleter, undefined) {

    function getSnippets() {
        var dict = gcodeDictionary.dictionary;
        var snippets = []
        for (var cmd in dict) {
            snippet = {
                content: cmd,
                name: cmd + ': ' + dict[cmd].description.normal
            };
            snippets.push(snippet)
        }
        return snippets;
    }

    function initSnippets(){
        var snippetManager = ace.require("ace/snippets").snippetManager;
        var config = ace.require("ace/config");
    
        ace.config.loadModule("ace/snippets/gcode", function(m) {
            if (m) {
                snippetManager.files.xml = m;
                m.snippets =  getSnippets();
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