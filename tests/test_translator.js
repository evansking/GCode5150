var lines = ['M127', 'M104 S200 T0 ; set temperature', 'G28 ; home all axes', 
'G0 Z5 F5000 ; lift nozzle', 'G0 X109.460 Y109.270', 'G1 F1800.000 E1.00000']

var expected_translations = ['Close Valve', 'Set Extruder Temperature  target temperature: 200;Invalid parameter: T02',
'Move to Origin', 'Move (rapid linear)  to Z axis pos: 5; feed rate: 5000;', 'Move (rapid linear)  to X axis pos: 109.460; to Y axis pos: 109.270;',
'Move (linear)  feed rate: 1800.000; extrude amount: 1.00000;']

var expected_commands = ['M127', 'M104', 'G28', 'G0', 'G0', 'G1']

// test english translation and command parsing
function testTranslation(){
  for (var i = 0; i < lines.length; i++){
    var [translation, command] = codeEditor.interpretLine(lines[i]);
    console.assert(translation == expected_translations[i], "error in translating: " + lines[i]);
    console.assert(command == expected_command[i], "error in parsing command from: " + lines[i]);
  }
}
