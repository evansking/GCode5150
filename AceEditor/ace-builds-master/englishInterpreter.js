(function( codeEditor, undefined ) {
  /** 
    Translates a line of GCode to english.

    @param gCodeLine: line of GCode to translate

    @return: English version of GCode line.
             If this is not a valid line of GCode, this will be an error message.
  **/
  codeEditor.interpretLine = function(gCodeLine) {

    var common_comm = {"G0":"Move (rapid linear)", "G1":"Move (linear)", "G2":"Move (controlled clockwise arc)",
    "G3":"Move (controlled counter-clockwise arc)", "G4":"Dwell (pause)", "G6":"Move (direct stepper)",
    "G10":"Tool Offset/Retract", "G11":"Unretract", "G20":"Set Units to Inches", "G21":"Set Units to Millimeters",
    "G22":"Firmware controlled Retract", "G23":"Firmware controlled Unretract/Precharge", "G28":"Move to Origin",
    "G29":"Use Probe to level bed", "G29.1":"Set Z probe head offset",
    "G29.2":"Set Z probe head offset (from toolhead position)", "G30":"Probes bed at current XY location",
    "G31":"Set or Report Current Probe status/Dock Z Probe sled", "G32":"Probe Z and calculate Z plane/Undock Z Probe sled",
    "G33":"Measure/List/Adjust Distortion Matrix", "G60":"save current position to slot",
    "G61":"Apply/restore saved coordinates to the active extruder", "G90":"Set to Absolute Positioning",
    "G91":"Set to Relative Positioning", "G92":"Set Position", "G100":"Calibrate floor or rod radius",
    "G130":"Set digital potentiometer value", "G131":"Remove offset", "G132":"Calibrate endstop offsets",
    "G133":"Measure steps to top", "G161":"Home axes to minimum", "G162":"Home axes to maximum",

    "M0":"Stop", "M1":"Sleep", "M2":"Program End", "M6":"Tool change", "M17":"Enable/Power all stepper motors",
    "M18":"Disable all stepper motors", "M20":"List SD card", "M21":"Initialize SD card", "M22":"Release SD card",
    "M23":"Select SD file", "M24":"Start/resume SD print", "M25":"Pause SD print", "M26":"Set SD position",
    "M27":"Report SD print status", "M28":"Begin write to SD card", "M29":"Stop writing to SD card",
    "M30":"Delete a file on the SD card", "M31":"Output time since last M109 or SD card start to serial",
    "M32":"Select file and start SD print",
    "M33":"Get the long name for an SD card file or folder/Stop and Close File and save restart.gcode",
    "M34":"Set SD file sorting options", "M35":"Upload firmware NEXTION from SD", "M36":"Return file information",
    "M37":"Simulation mode", "M38":"Compute SHA1 hash of target file", "M40":"Eject", "M41":"Loop",
    "M42":"Switch I/O pin", "M43":"Stand by on material exhausted/Pin report and debug",
    "M48":"Measure Z-Probe repeatability", "M70":"Display message", "M72":"Play a tone or song",
    "M73":"Set build percentage", "M80":"ATX Power On", "M81":"ATX Power Off", "M82":"Set extruder to absolute mode",
    "M83":"Set extruder to relative mode", "M84":"Stop idle hold", "M85":"Set inactivity shutdown timer",
    "M92":"Set axis_steps_per_unit", "M93":"Send axis_steps_per_unit", "M98":"Call Macro/Subprogram/Get axis_hysteresis_mm",
    "M99":"Return from Macro/Subprogram/Set axis_hysteresis_mm", "M101":"Turn extruder 1 on (Forward), Undo Retraction",
    "M102":"Turn extruder 1 on (Reverse)", "M103":"Turn all extruders off, Extruder Retraction",
    "M104":"Set Extruder Temperature", "M105":"Get Extruder Temperature", "M106":"Fan On",
    "M107":"Fan Off", "M108":"Cancel Heating/Set Extruder Speed", "M109":"Set Extruder Temperature and Wait",
    "M110":"Set Current Line Number", "M111":"Set Debug Level", "M112":"Emergency Stop", "M113":"Set Extruder PWM",
    "M114":"Get Current Position", "M115":"Get Firmware Version and Capabilities", "M116":"Wait",
    "M117":"Get Zero Position", "M118":"Display Message", "M119":"Negotiate Features/Get Endstop Status" ,
    "M120":"Push/Enable endstop detection", "M121":"Pop/Disable endstop detection", "M122":"Diagnose",
    "M123":"Tachometer value", "M124":"Immediate motor stop", "M126":"Open Valve", "M127":"Close Valve",
    "M128":"Extruder Pressure PWM", "M129":"Extruder pressure off", "M130":"Set PID P value", "M131":"Set PID I value",
    "M132":"Set PID D value", "M133":"Set PID I limit value", "M134":"Write PID values to EEPROM",
    "M135":"Set PID sample interval", "M136":"Print PID settings to host", "M140":"Set Bed Temperature (Fast)",
    "M141":"Set Chamber Temperature (Fast)", "M142":"Holding Pressure", "M143":"Max heater temperature",
    "M144":"Bed Standby", "M146":"Set Chamber Humidity", "M149":"Set temperature units", "M150":"Set display color",
    "M155":"Automatically send temperatures", "M160":"Number of mixed materials", "M163":"Set weight of mixed material",
    "M164":"Store weights", "M165":"Set multiple mix weights", "M190":"Wait for bed temp to reach target temp",
    "M191":"Wait for chamber temp to reach target temp", "M200":"Set filament diameter",
    "M201":"Set max printing acceleration", "M202":"Set max travel acceleration", "M203":"Set maximum feedrate",
    "M204":"Set default acceleration", "M205":"Advanced settings", "M206":"Offset axes/Set eeprom value",
    "M207":"Calibrate z axis/Set retract length", "M208":"Set axis max travel/Set unretract length",
    "M209":"Enable automatic retract", "M210":"Set homing feedrates", "M211":"Disable/Enable software endstops",
    "M212":"Set Bed Level Sensor Offset", "M218":"Set Hotend Offset",
    "M220":"Set speed factor override percentage/Turn off AUX V1.0.5",
    "M221":"Set extrude factor override percentage/Turn on AUX V1.0.5", "M222":"Set speed of fast XY moves",
    "M223":"Set speed of fast Z moves", "M224":"Enable extruder during fast moves",
    "M225":"Disable on extruder during fast moves", "M226":"Gcode Initiated Pause/Wait for pin state",
    "M227":"Enable Automatic Reverse and Prime", "M228":"Disable Automatic Reverse and Prime",
    "M229":"Enable Automatic Reverse and Prime", "M230":" Disable/Enable Wait for Temperature Change",
    "M231":"Set OPS parameter", "M232":"Read and reset max. advance values",
    "M240":"Trigger camera/Start conveyor belt motor/Echo off", "M241":"Stop conveyor belt motor/echo on",
    "M245":"Start cooler", "M246":"Stop cooler", "M250":"Set LCD contrast", "M251":"Measure Z steps from homing stop",
    "M260":"i2c Send Data", "M261":"i2c Request Data", "M280":"Set servo position", "M290":"Baby stepping",
    "M300":"Play beep sound", "M301":"Set PID parameters", "M302":"Allow cold extrudes", "M303":"Run PID tuning",
    "M304":"Set PID parameters-Bed", "M305":"Set thermistor and ADC parameters", "M306":"Set home offset calculated",
    "M307":"Set or report heating process parameters", "M320":"Activate autolevel", "M321":"Deactivate autolevel",
    "M322":"Reset autolevel matrix", "M323":"Distortion correction on/off", "M340":"Control the servos",
    "M350":"Set microstepping mode", "M351":"Toggle MS1 MS2 pins directly", "M355":"Turn case lights on/off",
    "M360":"Report firmware configuration/Move to Theta 0 degree pos", "M361":"Move to Theta 90 degree position",
    "M362":"Move to Psi 0 degree position", "M363":"Move to Psi 90 degree position",
    "M364":"Move to Psi + Theta 90 degree position", "M365":"SCARA scaling factor", "M366":"SCARA convert trim",
    "M370":"Morgan manual bed level-clear map", "M371":"Move to next calibration position",
    "M372":"Record calibration value and move to next position", "M373":"End bed level calibration mode",
    "M374":"Save calibration grid", "M375":"Display matrix/Load Matrix", "M376":"Set bed compensation taper",
    "M380":"Activate solenoid", "M381":"Disable all solenoids", "M400":"Wait for current moves to finish",
    "M401":"Lower z-probe", "M402":"Raise z-probe", "M404":"Filament width and nozzle diameter",
    "M405":"Filament Sensor on", "M406":"Filament Sensor off", "M407":"Display filament diameter",
    "M408":"Report JSON-style response", "M420":"Set RGB Colors as PWM/Enable/Disable Mesh Leveling",
    "M421":"Set a Mesh Bed Leveling Z coordinate", "M450":"Report Printer Mode","M451":"Select FFF Printer Mode",
    "M452":"Select Laser Printer Mode", "M453":"Select CNC Printer Mode",
    "M460":" Define temperature range for thermistor controlled fan", "M500":"Store parameters in EEPROM",
    "M501":"Read parameters from EEPROM", "M502":"Revert to the default factory settings", "M503":"Print settings",
    "M530":"Enable printing mode", "M531":"Set print name", "M532":"Set print progress",
    "M540":"Enable/Disable Stop SD Print on Endstop Hit/Set MAC address", "M550":"Set Name", "M551":"Set Password",
    "M552":"Set IP address, enable/disable network interface", "M553":"Set Netmask", "M554":"Set Gateway",
    "M555":"Set compatibility", "M556":"Axis compensation", "M557":"Set Z probe point or define probing grid",
    "M558":"Set Z probe type", "M559":"Upload configuration file", "M560":"Upload web page file",
    "M561":"Set Identity Transform", "M562":"Reset temperature fault", "M563":"", "M564":"", "M565":"", "M566":"", "M567":"",
     "M568":"", "M569":"", "M570":"", "M571":"", "M572":"", "M573":"",
     "M574":"", "M575":"", "M577":"", "M578":"", "M579":"", "M580":"",
     "M581":"", "M582":"", "M583":"", "M584":"", "M585":"", "M586":"",
     "M587":"", "M588":"", "M589":"", "M590":"", "M600":"", "M605":"",
     "M665":"", "M666":"", "M667":"", "M668":"", "M700":"", "M701":"",
     "M702":"", "M703":"", "M710":"", "M750":"", "M751":"", "M752":"",
     "M753":"", "M754":"", "M755":"", "M756":"", "M800":"", "M801":"",
     "M851":"", "M905":"", "M906":"", "M907":"", "M908":"", "M909":"",
     "M910":"", "M911":"", "M912":"", "M913":"", "M928":"", "M997":"",
     "M998":"", "M999":""
     }; //TODO: finish above and below for the corresponding M commands

    var x_comm = {"G0":" to X axis pos: ", "G1":" to X axis pos: ", "G2":" to X axis pos: ",
    "G3":" to X axis pos: ", "G10":" X offset: ", "G28":" flag to go back to the X axis origin ",
    "G29.1":" X offset: ", "G30":" X coordinate: ", "G31":" probe X offset: ", "G33":" X correction: ",
    "G61":" X coordinate: ", "G92":" new X axis pos: ", "G100":" flag to set floor for X axis ",
    "G130":" to X axis pos: ", "G161":" flag to home X axis to min ",
    "G162":" flag to home X axis to max ", "M18":" X axis: ", "M48":" pos on the X axis: ",
    "M92":" X drive: ", "M132":" X axis offset: ", "M201":" acceleration for X axis: ",
    "M202":" travel moves (in units/s^2): ", "M203":" max for X axis: ",
    "M205":" max xy jerk/xy junction deviation: ", "M206":" X axis offset/float: ", "M208":" X axis limit: ",
    "M210":" in mm per minute: ", "M211":" 1=max endstop or 0=min endstop: ", "M218":" offset on X: ",
    "M231":" min distance: ", "M305":" heater ADC channel: ", "M350":" X axis: ", "M365":" X scaling: ",
    "M370":" divisions: ", "M421":" index: ", "M460":" min temp: ", "M532":" print progress: ",
    "M556":" deviation in X: ", "M557":" X coordinate: ", "M558":" If nonzero, use probe for homing X axis: "};

    var y_comm = {"G0":" to Y axis pos: ", "G1":" to Y axis pos: ", "G2":" to Y axis pos: ",
    "G3":" to Y axis pos: ", "G10":" Y offset: ", "G28":" flag to go back to the Y axis origin ",
    "G29.1":" Y offset: ", "G30":" Y coordinate: ", "G31":" probe Y offset: ", "G33":" Y correction: ",
    "G61":" Y coordinate: ", "G92":" new Y axis pos: ", "G100":" flag to set floor for Y axis ",
    "G130":" to Y axis pos: ", "G161":" flag to home Y axis to min ",
    "G162":" flag to home Y axis to max ", "M18":" Y axis: ", "M48":" pos on the Y axis: ",
    "M92":" Y drive: ", "M132":" Y axis offset: ", "M201":" acceleration for Y axis: ",
    "M202":" travel moves (in units/s^2): ", "M203":" max for Y axis: ", "M206":" Y axis offset: ",
    "M208":" Y axis limit: ", "M210":" in mm per minute: ", "M211":" 1=max endstop or 0=min endstop: ",
    "M218":" offset on Y: ", "M231":" retract: ", "M350":" Y axis: ", "M365":" Y scaling: ", "M421":" index: ",
    "M460":" max temp: ", "M556":" deviation in Y: ", "M557":" Y coordinate: ",
    "M558":" If nonzero, use probe for homing Y axis: "};

    var z_comm = {"G0":" to Z axis pos: ", "G1":" to Z axis pos: ",
    "G28":" flag to go back to the Z axis origin ", "G29.1":" Z offset: ", "G29.2":" Z offset: ",
    "G30":" Z coordinate: ", "G31":" trigger Z height: ", "G33":" Z correction: ",
    "G61":" Z coordinate: ", "G92":" new Z axis pos: ", "G100":" flag to set floor for Z axis ",
    "G130":" to Z axis pos: ", "G161":" flag to home Z axis to min ",
    "G162":" flag to home Z axis to max ", "M18":" Z axis: ", "M92":" Z drive: ", "M132":" Z axis offset: ",
    "M201":" acceleration for Z axis: ", "M203":" max for Z axis: ",
    "M205":" max Z jerk/z junction deviation: ", "M206":" Z axis offset: ", "M207":" additional zlift/hop: ",
    "M208":" Z axis limit: ", "M211":" 1=max endstop or 0=min endstop: ", "M212":" Z home: ", "M231":" backslash: ",
    "M350":" Z axis: ", "M365":" Z scaling: ", "M374":" save M206 Z homing offset into the grid file ",
    "M421":" offset (in mm): ", "M556":" deviation in Z: ", "M558":" If nonzero, use probe for homing Z axis: "};

    var e_comm = {"G0":" extrude amount: ", "G1":" extrude amount: ", "G2":" extrude amount: ",
    "G3":" extrude amount: ", "G10":" Z offset: ", "G61":" E coordinate: ", "G92":" new extruder pos: ",
    "M18":" extruder drive(s): ", "M43":" toggle background endstop monitoring: ", "M48":" engage ",
    "M92":" extruder drive(s): ", "M201":" acceleration for extruder drives: ",
    "M203":" max for extruder drives: ", "M205":" max E jerk: ", "M301":" heater #: ", "M350":" extruder 0: ",
    "M420":" green PWM: "};

    var f_comm = {"G0":" feed rate: ", "G1":" feed rate: ", "G2":" feed rate: ", "G3":" feed rate: ",
    "G61":" F set feedrate: ", "G161":" desired feedrate: ", "G162":" desired feedrate: ",
    "M106":" frequency (in Hz): ", "M207":" retraction feedrate (in mm/min): ",
    "M208":" feedrate (in mm/sec): ", "M231":" ReatrctMove: ", "M558":" feed rate: "};

    var s_comm = {"G0":" endstop flag: ", "G1":" endstop flag: ", "G4": " wait time (in s): ",
    "G10":" active temperature(s) or retract length: ", "G11":" retract length: ",
    "G29":" firmware-dependent behavior: ", "G30":" set parameter: ", "G31":" calibration temperature: ",
    "G32":" bed leveling method: ", "G60":" memory slot #: ", "G61":" memory slot #: ",
    "M0":" wait time (in s): ", "M20":" output style: ", "M26":" file pos (in bytes): ",
    "M37":" toggle mode ( S1 enters, S0 leaves) ", "M42":" pin value: ", "M48":" schizoid ",
    "M85":" seconds: ", "M104":" target temperature: ", "M105":" response type: ", "M106":" fan speed: ",
    "M109":" min target temp: ", "M111":" debug on/off: ", "M113":" value to set: ", "M128":" pressure: ",
    "M130":" proportional (Kp): ", "M131":" integral (Ki): ", "M132":" derivative (Kd): ",
    "M133":" integral limit (Ki): ", "M135":" heat sample time (in s): ", "M140":" target temperature: ",
    "M141":" target temperature: ", "M142":" holding pressure of the bed: ", "M143":" max temp: ",
    "M155":" enable(1)/disable(0): ", "M160":" # of materials: ", "M163":" extruder #: ",
    "M164": " virtual extruder#: ", "M190":" min target temperature: ", "M191":" min target temperature: ",
    "M205":" min travel speed/min planner speed: ", "M206":" int (long): ",
    "M207":" positive length to retract (in mm): ",
    "M208":" toggle set the axis min/positive length surplus to the M207: ", "M209":" 1=true or 0=false: ",
    "M211":" 1=enable or 0=disable: ", "M220":" percentage: ", "M221":" percentage: ", "M226":" pin state: ",
    "M227":" steps: ", "M229":" extruder screw rotation: ", "M230":" 1=disable or 0=enable: ",
    "M231":" OPS_MODE: ", "M251":" 0 =Reset, 1=Print, 2=Store to Z length: ", "M260":"  send and reset buffer ",
    "M280":" angle or microseconds: ", "M290":" amount (in mm): ", "M300":" frequency (in Hz) ",
    "M301":" heater #: ", "M302":" min temp: ", "M303":" temperature: ", "M307":" max PWM: ",
    "M320":" >0 activate and store persistently in EEPROM: ", "M321":" >0 deactivate and store persistently in EEPROM: ",
    "M322":" >0 also reset the matrix values saved EEPROM: ", "M323":" 0=disable,1=enable: ", "M340":" pulseInUS: ",
    "M350":" all drivers: ", "M355":" 1=enable,0=disable: ", "M408":" response type: ", "M420":" 1=enable,0=disable: ",
    "M501":" enable auto-save: ", "M530":" 1=started, 0=ended: ", "M540":" 1=enable, 0=disable: ",
    "M552":" disable/enable networking: ", "M556":" height of distances: ", "M558":" extra for experimentation: "};

    var i_comm = {"G2":" distance to maintain from (X space): ", "G3":" distance to maintain from (X space): ",
    "M43":" flag to ignore pin protection: ", "M84":" reset flags: ", "M106":" disable fan: ",
    "M165": " mix factor for extruder stepper 6: ", "M280":" 1=invert polarity: ", "M301":" integral (Ki): ",
    "M304":" integral (Ki): ", "M350":" enable (nn=1) or disable (nn=0) interpolation: ",
    "M558":" invert (I1)/do not invert (I0) reading: "};

    var j_comm = {"G2":" distance to maintain from (Y space): ", "G3":" distance to maintain from (Y space): "};

    var p_comm = {"G4": " wait time (in ms): ", "G10":" tool #: ", "G30":" probe point #: ",
    "G31":" trigger value: ", "G32":" bed correction method: ", "M0":" wait time (in ms): ",
    "M20":" directory to list: ", "M21":" SD card #: ", "M22":" SD card #: ", "M42":" pin #: ",
    "M43":" pin to read or watch: ", "M48":" # of points: ", "M72":" song ID: ", "M73":" percentage: ",
    "M98":" line #: ", "M106":" fan #: ", "M111":" debug module: ", "M115":" electronics type: ",
    "M116":" tool #: ", "M126":" wait (in ms): ", "M127":" wait (in ms): ", "M129":" wait (in ms): ",
    "M130":" heater #: ", "M131":" heater #: ", "M132":" heater #: ", "M133":" heater #/wait time: ",
    "M134":" time limit: ", "M163":" weight: ", "M164": " store to eeprom (P0 = no, P1 = yes): ",
    "M204":" printing moves: ", "M206":" pos: ", "M226":" pin #: ", "M227":" steps: ",
    "M229":" extruder screw rotation: ", "M280":" servo index: ", "M300":" duration (in ms) ",
    "M301":" proportional (Kp): ", "M302":" allow state: ", "M304":" proportional (Kp): ", "M305":" heater #: ",
    "M323":" 1=store correction state persistently in EEPROM: ", "M340":" servoId: ", "M540":" MAC address: ",
    "M550":" machine name: ", "M551":" password: ", "M552":" IP address: ", "M553":" net mask: ", "M554":" gateway: ",
    "M555":" emulation type: ", "M557":" probe point #: ", "M558":" Z probe type: ", "M562":" heater #: "};

    var a_comm = {"G6":" Stepper A pos/angle: ", "G130":" to A axis pos: ", "M132":" A axis offset: ",
    "M165": " mix factor for extruder stepper 1: ", "M260":"  address: ", "M261":"  address: ", "M307":" gAin: "};

    var b_comm = {"G6":" Stepper B pos/angle: ", "G130":" to B axis pos: ", "M106":" blip time: ",
    "M132":" B axis offset: ", "M150":" blue: ", "M165": " mix factor for extruder stepper 2: ",
    "M205":" min segment time: ", "M260":"  add to buffer: ", "M261":"  bytes: ",
    "M305":" beta value: ", "M307":" Bang-bang control: ", "M350":" extruder 1: ", "M420":" blue PWM: "};

    var c_comm = {"G6":" Stepper C pos/angle: ", "G31":" temperature coefficient: ", "M116":" chamber #: ",
    "M149":" Flag to treat temperature as Celsius ", "M165": " mix factor for extruder stepper 3: ",
    "M250":" contrast value: ", "M303":" cycles: ", "M305":" Steinhart-Hart C coefficient: ",
    "M307":" dominant time (in s): "};

    var r_comm = {"G6":" relative move flag: ", "G10":" standby temperature(s): ",
    "G33":" reset distortion matrix(R0): ", "G100":" radius to add: ", "M105":" response sequence #: ",
    "M106":" restore speed: ", "M109":" max/accurate target temp: ", "M146":" relative humidity (in percent): ",
    "M150":" red: ", "M190":" accurate target temperature: ", "M191":" accurate target temperature: ",
    "M207":" positive or negative additional length to un-retract (in mm): ", "M305":" series resistor value: ",
    "M408":" response sequence #: ", "M420":" red PWM: ", "M552":" HTTP port: ", "M558":" recovery time: "};

    var u_comm = {"G10":" U, V and W axis offsets: ", "M150":" green: "};

    var h_comm = {"G30":" height correction: ", "M106":" select heaters: ", "M116":" heater #: ",
    "M140":" heater #: ", "M141":" heater #: ", "M143":" heater #: ",
    "M165": " mix factor for extruder stepper 5: ", "M301":" heater #: ", "M305":" ADC high offset: ",
    "M307":" heater #: ", "M376":" height (in mm): ", "M558":" dive height (in mm): "};

    var t_comm = {"G31":" Z probe type: ", "M106":" set thermostatic mode: ", "M126":" toolhead: ",
    "M127":" toolhead: ", "M133":" extruder to wait for: ", "M134":" platform to wait for: ",
    "M135":" toolhead change: ", "M204":"  travel moves: ", "M205":" travel only ", "M206":" type: ",
    "M207":" feedrate for un-retraction if different from retraction (in mm/min): ", "M218":" extruder #: ",
    "M305":" thermistor resistance at 25C: ", "M558":" travel speed: "};

    var d_comm = {"M165": " mix factor for extruder stepper 4: ", "M200":" filament diameter (in mm): ",
    "M221":" drive #: ", "M301":" derivative (Kd): ", "M304":" derivative (Kd): ", "M307":" dead time (in s): ",
    "M404":" nozzle diameter (in mm): "};

    var l_comm = {"G33":" list distortion matrix(L0): ", "M48":" legs of travel: ",
    "M106":" min fan speed: ", "M305":" ADC low offset: ", "M530":" # of layers: ", "M532":" printed layer: "};

    var w_comm = {"M43":" watch pins: "};

    var v_comm = {"M48":" verbosity: "};

    var k_comm ={"M149":" Flag to treat temperature as Kelvin "};

    var commands = gCodeLine.split(" ");
    var output = "";
    var found=true;
    for (i=0; i<commands.length; i++) {
      if (!(commands[i] in common_comm)) {
        found=false;
        //check if it is valid
        switch ((commands[i]).charAt(0)) {
          case 'N':
            found=true;
            if (commands[0]=="M404") {
              output += " filament width (in mm): "+(commands[i]).slice(1)+";";
            }
            else {
              output += " line number (can be used for checking): "+(commands[i]).slice(1)+";";
            }
            break;
          case 'X':
            if (commands[0] in x_comm) {
              found=true;
              output += x_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'Y':
            if (commands[0] in y_comm) {
              found=true;
              output += y_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'Z':
            if (commands[0] in z_comm) {
              found=true;
              output += z_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'E':
            if (commands[0] in e_comm) {
              found=true;
              output += e_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'F':
            if (commands[0] in f_comm) {
              found=true;
              output += f_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'S':
            if (commands[0] in s_comm) {
              found=true;
              output += s_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'I':
            if (commands[0] in i_comm) {
              found=true;
              output += i_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'J':
            if (commands[0] in j_comm) {
              found=true;
              output += j_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'P':
            if (commands[0] in p_comm) {
              found=true;
              output += p_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'A':
            if (commands[0] in a_comm) {
              found=true;
              output += a_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'B':
            if (commands[0] in b_comm) {
              found=true;
              output += b_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'C':
            if (commands[0] in c_comm) {
              found=true;
              output += c_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'R':
            if (commands[0] in r_comm) {
              found=true;
              output += r_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'U':
            if (commands[0] in u_comm) {
              found=true;
              output += u_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'H':
            if (commands[0] in h_comm) {
              found=true;
              output += h_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'T':
            if (commands[0] in t_comm) {
              found=true;
              output += t_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'D':
            if (commands[0] in d_comm) {
              found=true;
              output += d_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'L':
            if (commands[0] in l_comm) {
              found=true;
              output += l_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'W':
            if (commands[0] in w_comm) {
              found=true;
              output += w_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'V':
            if (commands[0] in v_comm) {
              found=true;
              output += v_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'K':
            if (commands[0] in k_comm) {
              found=true;
              output += k_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case '*':
            found=true;
            output += " checksum (can be used for checking): "+(commands[i]).slice(1)+";";
        }
      }
      else {
        found=true;
        output += common_comm[commands[i]] + " - ";
      }
    }
    if (found==false) {
      return "COMMAND NOT FOUND"
    }
    return output;
  };
}( window.codeEditor = window.codeEditor || {} ));