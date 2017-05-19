(function (codeEditor, undefined) {
    var Range = ace.require('ace/range').Range;

    // GCode text editor
    codeEditor.leftEditor;

    // English translation display
    codeEditor.rightEditor;

    var session1,
        session2,
        doc1,
        doc2;

    codeEditor.count = {};

    codeEditor.init = function () {
        // Initialize the GCode input editor & English translation display
        var editor1, editor2;
        editor1 = ace.edit("left_panel");
        editor1.resize(true);
        editor1.setTheme("ace/theme/cobalt");
        editor1.session.setMode("ace/mode/gcode");
        editor1.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true,
            showPrintMargin: false
        });
        editor1.$blockScrolling = Infinity;

        editor2 = ace.edit("right_panel");
        editor2.resize(true);
        editor2.setValue("");
        editor2.setTheme("ace/theme/cobalt");
        editor2.session.setMode("ace/mode/text");
        editor2.setReadOnly(true);
        editor2.renderer.$cursorLayer.element.style.display = "none";
        editor2.setHighlightActiveLine(true);
        editor2.setShowPrintMargin(false);
        editor2.$blockScrolling = Infinity;

        session1 = editor1.getSession();
        doc1 = session1.getDocument();

        session2 = editor2.getSession();
        doc2 = session2.getDocument();

        // Lock the scrolling if the two text editors together
        session1.on('changeScrollTop', function () {
            session2.setScrollTop(session1.getScrollTop())
        });
        session2.on('changeScrollTop', function () {
            session1.setScrollTop(session2.getScrollTop())
        });

        // Update English translation when GCode changes
        editor1.on("change", function (delta) {
            handleCodeChanges(delta)
        });

        codeEditor.leftEditor = editor1;
        codeEditor.rightEditor = editor2;
    }

    // Update the English translation when GCode changes
    // @param delta: changes to the text in this update
    function handleCodeChanges(delta) {
        if (delta.action == "insert") {
            var startCol = delta.start.column;
            var startRow = delta.start.row;
            var endCol = delta.end.column;
            var endRow = delta.end.row;

            for (var i = 0; i < delta.lines.length; i++) {
                var lineNum = startRow + i;
                var line = delta.lines[i];
                if (i < delta.lines.length - 1 && delta.lines.length > 1) {
                    // This is a new line. Insert a new line in the English translation
                    doc2.insert({
                            row: lineNum, 
                            column: (i == 0 ? startCol : 0)
                        }, 
                        doc2.getNewLineCharacter());
                }

                var updatedLine = doc1.getLine(lineNum);

                // Translate the updated line, then update the displayed translation
                var [translation, command] = codeEditor.interpretLine(updatedLine);
                session2.replace(new Range(lineNum, 0, lineNum, Number.MAX_VALUE), translation);

                if (line.length > 0) {
                    var count = codeEditor.count;

                    // If the updated line contains a command, increment the number of times
                    // that command shows up
                    if (command.length > 0) {
                        count[command] = (command in count) ? count[command] + 1 : 1;
                    }


                    // Figure out what the old line was and translate it.
                    // If it contained a command, decrement the number of times
                    // that command shows up
                    var _startCol = (lineNum > startRow) ? 0 : startCol;
                    var _endCol = (endRow > lineNum) ? updatedLine.length : endCol;
                    var oldLine = updatedLine.slice(0, _startCol) + updatedLine.slice(_endCol);
                    var [_, command] = codeEditor.interpretLine(oldLine);
                    if (command.length > 0) {
                        count[command] -= 1;
                    }
                }
            }
        }
        else if (delta.action == "remove") {
            var startCol = delta.start.column;
            var startRow = delta.start.row;
            var endCol = delta.end.column;
            var endRow = delta.end.row;


            // Translate the updated line, then update the displayed translation
            var updatedLine = doc1.getLine(startRow);
            var [translation, command] = codeEditor.interpretLine(updatedLine);
            doc2.remove(new Range(startRow, 0, endRow, Number.MAX_VALUE));
            session2.replace(new Range(startRow, 0, startRow, Number.MAX_VALUE), translation);

            var count = codeEditor.count;
            if (command.length > 0) {
                count[command] = (command in count) ? count[command] + 1 : 1;
            }

            var startLine = updatedLine.slice(0, startCol);
            var endLine = updatedLine.slice(startCol);

            for (var i = 0; i < delta.lines.length; i++) {
                var lineNum = startRow + i;
                var oldLine = delta.lines[i];
                if (lineNum == startRow) {
                    oldLine = startLine + oldLine;
                }
                if (lineNum == endRow) {
                    oldLine = oldLine + endLine;
                }
                var [_, command] = codeEditor.interpretLine(oldLine);
                if (command.length > 0) {
                    count[command] -= 1;
                }
            }
        }
    }
}(window.codeEditor = window.codeEditor || {}));
