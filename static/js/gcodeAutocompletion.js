(function (gCodeCompleter, undefined) {

    function getRepRapSnippets() {
        var dict = gcodeDictionary.dictionary;
        var snippets = []
        for (var cmd in dict) {
            snippet = {
                tabTrigger: cmd, 
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