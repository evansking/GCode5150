(function (codeEditor, undefined) {
    /**
     Translates a line of GCode to english.

     @param gCodeLine: line of GCode to translate

     @return: English version of GCode line, and the main command (if any).
     If this is not a valid line of GCode, this will be an error message.
     **/
    codeEditor.interpretLine = function (gCodeLine) {

        if (gCodeLine == "") {
            return ["", ''];
        }

        var tokens = gCodeLine.split(/ +/);
        var output = "";
        var comment = false;
        var dict = gcodeDictionary.dictionary;
        var command = '';
        var lineNum = false;
        var checksum = false;
        var commandError = false;

        /*
         Attempt to find a command in a line of GCode.
         Handles finding comments and secondary commands 
        (checksums and line number commands) as well.
         */
        while (tokens.length > 0) {
            token = tokens.shift();
            switch (token.charAt(0)) {
                case 'N':
                    if (!lineNum && !checksum) {
                        lineNum = true;
                        output += "Line number: " + token.slice(1) + "; ";
                    }
                    else if(checksum) {
                        output += "Error: Cannot have a command after checksum; ";
                        commandError = true;
                    }
                    else {
                        commandError = true;
                        output += "Error: Two line numbers in one line; ";
                    }
                    break;
                case 'G':
                case 'M':
                    if (token in dict && !checksum) {
                        command = token;
                    }
                    else if(checksum) {
                        output += "Error: Cannot have a command after checksum; ";
                        commandError = true;
                    }
                    else {
                        commandError = true;
                    }
                    break;
                case '*':
                    if (!checksum){
                        checksum = true;
                        output += "Checksum (can be used for checking): " + token.slice(1) + "; ";
                    } else {
                        output += "Error: Multiple checksums in one line; "
                    }
                    break;
                case ';':
                    comment = true;
                    break;
                case '-':
                    if (token.length > 1 && token[1] == '>') {
                        comment = true;
                    }
                    else {
                        commandError = true;
                    }
                    break;
                case '/':
                    if (token.length > 1 && token[1] == '/') {
                        comment = true;
                    }
                    else {
                        commandError = true;
                    }
                    break;
                default:
                    commandError = true;
            }
            if (commandError) {
                output += "COMMAND NOT FOUND: " + token;
                return [output, command];
            }
            else if (comment) {
                return [output, command];
            }
            else if (command) {
                break;
            }
        }

        if (!command) {
            if (lineNum || checksum) {
                return [output, command];
            } else {
                return ["COMMAND NOT FOUND", command];
            }
        }

        // TODO: Add to gcodeDictionary.js an optional entry for a command
        // that says it needs its parameters
        var parametersRequired = ('parametersRequired' in dict[command]) && dict[command].parametersRequired;
        var expectsParams = Object.keys(dict[command].parameters).length > 0 && parametersRequired;

        var foundParams = false;

        var shortDescription = false;
        shortDescription = codeEditor.count[command] > 3;

        var descr = dict[command].description;

        descr = (shortDescription && 'simple' in descr) ? descr.simple : descr.normal;
        output += descr + (expectsParams? ' - ' : ' ');

        /*
         Parses parameters to the command, and handles comments
         and the checksum command
         */
        while (tokens.length > 0) {
            token = tokens.shift()
            var c0 = token.charAt(0);
            if (comment) {
                break;
            }
            else if (c0 in dict[command].parameters) {
                foundParams = true
                descr = dict[command].parameters[c0];
                descr = (shortDescription && 'simple' in descr) ? descr.simple : descr.normal;
                output += descr + token.slice(1) + ';';
            }
            else {
                switch (c0) {
                    case '*':
                        if (!checksum){
                            if (expectsParams && !foundParams) {
                                output += "Error: Parameters required for " + command + ";";
                                return [output, command];
                            }
                            checksum = true;
                            output += " Checksum (can be used for checking): " + token.slice(1) + "; ";
                        } else {
                            output += "Error: Multiple checksums in one line; ";
                        }
                        break;
                    case ';':
                        comment = true;
                        break;
                    case '-':
                        if (token.length > 1 && token[1] == '>') {
                            comment = true;
                        }
                        else {
                            commandError = true;
                        }
                        break;
                    case '/':
                        if (token.length > 1 && token[1] == '/') {
                            comment = true;
                            break;
                        }
                        else {
                            commandError = true;
                        }
                        break;
                    default:
                        commandError = true;
                }
                if (commandError) {
                    if (token.length > 0) {
                        output += "Invalid parameter: " + token + token.length;
                    }
                    return [output, command];
                }
            }
        }

        if (expectsParams && !foundParams) {
            output += "Error: Parameters required for " + command + ";";
        }
        
        return [output, command];
    };
}(window.codeEditor = window.codeEditor || {}));
