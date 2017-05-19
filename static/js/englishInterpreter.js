(function (codeEditor, undefined) {
    /**
     Translates a line of GCode to english.

     @param gCodeLine: line of GCode to translate

     @return: English version of GCode line.
     If this is not a valid line of GCode, this will be an error message.
     **/
    codeEditor.interpretLine = function (gCodeLine) {

        if (gCodeLine == "") {
            return ["", ''];
        }

        var tokens = gCodeLine.split(/ +/);
        var output = "";
        var comment = false;
        var slash = false;
        var dict = gcodeDictionary.dictionary;
        var command = '';
        var i = 0;
        var foundLineNum = false;
        var checksum = false;
        var commandError = false;

        while (tokens.length > 0) {
            token = tokens.shift();
            switch (token.charAt(0)) {
                case 'N':
                    if (!foundLineNum && !checksum) {
                        foundLineNum = true;
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
                        output += "COMMAND NOT FOUND: " + token;
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
                        break;
                    }
                    // no break here- want to fall through to default
                case '/':
                    if (slash == true) {
                        comment = false;
                        slash = false;
                    }
                    else {
                        slash = true;
                        comment = true;
                    }
                    if (token.length > 1) {
                        tokens.unshift(token.slice(1));
                    }
                    break;
                default:
                    if (comment && slash && token.indexOf('/') > -1) {
                        comment = false;
                        slash = false;
                        slashIndex = token.indexOf('/');
                        if (token.length > slashIndex+1) {
                            tokens.unshift(token.slice(slashIndex+1));
                        }
                    }
                    else {
                        commandError = true;
                        output += "Invalid token: " + token;
                    }
            }
            if (commandError) {
                return [output, command];
            }
            else if (command) {
                break;
            }
            else if (comment && !slash) {
                break;
            }
        }

        if (comment) {
            return [output, command];
        }

        if (!command) {
            if (foundLineNum || checksum) {
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
        shortDescription = gcodeDictionary.count[command] > 3;

        var descr = dict[command].description;

        descr = (shortDescription && 'simple' in descr) ? descr.simple : descr.normal;
        output += descr + (expectsParams? ' - ' : ' ');

        while (tokens.length > 0) {
            token = tokens.shift()
            var c0 = token.charAt(0);
            if (comment) {
                if (slash && token.indexOf('/') > -1) {
                    comment = false;
                    slash = false;
                    slashIndex = token.indexOf('/');
                    if (token.length > slashIndex+1) {
                        tokens.unshift(token.slice(slashIndex+1));
                    }
                }
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
                            break;
                        }
                        // no break here- want to fall through to default
                    case '/':
                        slash = true;
                        comment = true;
                        if (token.length > 1) {
                            tokens.unshift(token.slice(1));
                        }
                        break;
                    default:
                        output += "Invalid parameter: " + token;
                        return [output, command];
                }
            }
            if (comment && !slash) {
                break;
            }
        }

        if (expectsParams && !foundParams) {
            output += "Error: Parameters required for " + command + ";";
        }
        
        return [output, command];
    };
}(window.codeEditor = window.codeEditor || {}));
