/**
 * This file maps GCode to their english transalations
 */


var common_comm = {
    "G0": "Move (rapid linear)",
    "G1": "Move (linear)",
    "G2": "Move (controlled clockwise arc)",
    "G3": "Move (controlled counter-clockwise arc)",
    "G4": "Dwell (pause)",
    "G6": "Move (direct stepper)",
    "G10": "Tool Offset/Retract",
    "G11": "Unretract",
    "G20": "Set Units to Inches",
    "G21": "Set Units to Millimeters",
    "G22": "Firmware controlled Retract",
    "G23": "Firmware controlled Unretract/Precharge",
    "G28": "Move to Origin",
    "G29": "Use Probe to level bed",
    "G29.1": "Set Z probe head offset",
    "G29.2": "Set Z probe head offset (from toolhead position)",
    "G30": "Probes bed at current XY location",
    "G31": "Set or Report Current Probe status/Dock Z Probe sled",
    "G32": "Probe Z and calculate Z plane/Undock Z Probe sled",
    "G33": "Measure/List/Adjust Distortion Matrix",
    "G60": "save current position to slot",
    "G61": "Apply/restore saved coordinates to the active extruder",
    "G90": "Set to Absolute Positioning",
    "G91": "Set to Relative Positioning",
    "G92": "Set Position",
    "G100": "Calibrate floor or rod radius",
    "G130": "Set digital potentiometer value",
    "G131": "Remove offset",
    "G132": "Calibrate endstop offsets",
    "G133": "Measure steps to top",
    "G161": "Home axes to minimum",
    "G162": "Home axes to maximum",

    "M0": "Stop",
    "M1": "Sleep",
    "M2": "Program End",
    "M6": "Tool change",
    "M17": "Enable/Power all stepper motors",
    "M18": "Disable all stepper motors",
    "M20": "List SD card",
    "M21": "Initialize SD card",
    "M22": "Release SD card",
    "M23": "Select SD file",
    "M24": "Start/resume SD print",
    "M25": "Pause SD print",
    "M26": "Set SD position",
    "M27": "Report SD print status",
    "M28": "Begin write to SD card",
    "M29": "Stop writing to SD card",
    "M30": "Delete a file on the SD card",
    "M31": "Output time since last M109 or SD card start to serial",
    "M32": "Select file and start SD print",
    "M33": "Get the long name for an SD card file or folder/Stop and Close File and save restart.gcode",
    "M34": "Set SD file sorting options",
    "M35": "Upload firmware NEXTION from SD",
    "M36": "Return file information",
    "M37": "Simulation mode",
    "M38": "Compute SHA1 hash of target file",
    "M40": "Eject",
    "M41": "Loop",
    "M42": "Switch I/O pin",
    "M43": "Stand by on material exhausted/Pin report and debug",
    "M48": "Measure Z-Probe repeatability",
    "M70": "Display message",
    "M72": "Play a tone or song",
    "M73": "Set build percentage",
    "M80": "ATX Power On",
    "M81": "ATX Power Off",
    "M82": "Set extruder to absolute mode",
    "M83": "Set extruder to relative mode",
    "M84": "Stop idle hold",
    "M85": "Set inactivity shutdown timer",
    "M92": "Set axis_steps_per_unit",
    "M93": "Send axis_steps_per_unit",
    "M98": "Call Macro/Subprogram/Get axis_hysteresis_mm",
    "M99": "Return from Macro/Subprogram/Set axis_hysteresis_mm",
    "M101": "Turn extruder 1 on (Forward), Undo Retraction",
    "M102": "Turn extruder 1 on (Reverse)",
    "M103": "Turn all extruders off, Extruder Retraction",
    "M104": "Set Extruder Temperature",
    "M105": "Get Extruder Temperature",
    "M106": "Fan On",
    "M107": "Fan Off",
    "M108": "Cancel Heating/Set Extruder Speed",
    "M109": "Set Extruder Temperature and Wait",
    "M110": "Set Current Line Number",
    "M111": "Set Debug Level",
    "M112": "Emergency Stop",
    "M113": "Set Extruder PWM",
    "M114": "Get Current Position",
    "M115": "Get Firmware Version and Capabilities",
    "M116": "Wait",
    "M117": "Get Zero Position",
    "M118": "Display Message",
    "M119": "Negotiate Features/Get Endstop Status",
    "M120": "Push/Enable endstop detection",
    "M121": "Pop/Disable endstop detection",
    "M122": "Diagnose",
    "M123": "Tachometer value",
    "M124": "Immediate motor stop",
    "M126": "Open Valve",
    "M127": "Close Valve",
    "M128": "Extruder Pressure PWM",
    "M129": "Extruder pressure off",
    "M130": "Set PID P value",
    "M131": "Set PID I value",
    "M132": "Set PID D value",
    "M133": "Set PID I limit value",
    "M134": "Write PID values to EEPROM",
    "M135": "Set PID sample interval",
    "M136": "Print PID settings to host",
    "M140": "Set Bed Temperature (Fast)",
    "M141": "Set Chamber Temperature (Fast)",
    "M142": "Holding Pressure",
    "M143": "Max heater temperature",
    "M144": "Bed Standby",
    "M146": "Set Chamber Humidity",
    "M149": "Set temperature units",
    "M150": "Set display color",
    "M155": "Automatically send temperatures",
    "M160": "Number of mixed materials",
    "M163": "Set weight of mixed material",
    "M164": "Store weights",
    "M165": "Set multiple mix weights",
    "M190": "Wait for bed temp to reach target temp",
    "M191": "Wait for chamber temp to reach target temp",
    "M200": "Set filament diameter",
    "M201": "Set max printing acceleration",
    "M202": "Set max travel acceleration",
    "M203": "Set maximum feedrate",
    "M204": "Set default acceleration",
    "M205": "Advanced settings",
    "M206": "Offset axes/Set eeprom value",
    "M207": "Calibrate z axis/Set retract length",
    "M208": "Set axis max travel/Set unretract length",
    "M209": "Enable automatic retract",
    "M210": "Set homing feedrates",
    "M211": "Disable/Enable software endstops",
    "M212": "Set Bed Level Sensor Offset",
    "M218": "Set Hotend Offset",
    "M220": "Set speed factor override percentage/Turn off AUX V1.0.5",
    "M221": "Set extrude factor override percentage/Turn on AUX V1.0.5",
    "M222": "Set speed of fast XY moves",
    "M223": "Set speed of fast Z moves",
    "M224": "Enable extruder during fast moves",
    "M225": "Disable on extruder during fast moves",
    "M226": "Gcode Initiated Pause/Wait for pin state",
    "M227": "Enable Automatic Reverse and Prime",
    "M228": "Disable Automatic Reverse and Prime",
    "M229": "Enable Automatic Reverse and Prime",
    "M230": " Disable/Enable Wait for Temperature Change",
    "M231": "Set OPS parameter",
    "M232": "Read and reset max. advance values",
    "M240": "Trigger camera/Start conveyor belt motor/Echo off",
    "M241": "Stop conveyor belt motor/echo on",
    "M245": "Start cooler",
    "M246": "Stop cooler",
    "M250": "Set LCD contrast",
    "M251": "Measure Z steps from homing stop",
    "M260": "i2c Send Data",
    "M261": "i2c Request Data",
    "M280": "Set servo position",
    "M290": "Baby stepping",
    "M300": "Play beep sound",
    "M301": "Set PID parameters",
    "M302": "Allow cold extrudes",
    "M303": "Run PID tuning",
    "M304": "Set PID parameters-Bed",
    "M305": "Set thermistor and ADC parameters",
    "M306": "Set home offset calculated",
    "M307": "Set or report heating process parameters",
    "M320": "Activate autolevel",
    "M321": "Deactivate autolevel",
    "M322": "Reset autolevel matrix",
    "M323": "Distortion correction on/off",
    "M340": "Control the servos",
    "M350": "Set microstepping mode",
    "M351": "Toggle MS1 MS2 pins directly",
    "M355": "Turn case lights on/off",
    "M360": "Report firmware configuration/Move to Theta 0 degree pos",
    "M361": "Move to Theta 90 degree position",
    "M362": "Move to Psi 0 degree position",
    "M363": "Move to Psi 90 degree position",
    "M364": "Move to Psi + Theta 90 degree position",
    "M365": "SCARA scaling factor",
    "M366": "SCARA convert trim",
    "M370": "Morgan manual bed level-clear map",
    "M371": "Move to next calibration position",
    "M372": "Record calibration value and move to next position",
    "M373": "End bed level calibration mode",
    "M374": "Save calibration grid",
    "M375": "Display matrix/Load Matrix",
    "M376": "Set bed compensation taper",
    "M380": "Activate solenoid",
    "M381": "Disable all solenoids",
    "M400": "Wait for current moves to finish",
    "M401": "Lower z-probe",
    "M402": "Raise z-probe",
    "M404": "Filament width and nozzle diameter",
    "M405": "Filament Sensor on",
    "M406": "Filament Sensor off",
    "M407": "Display filament diameter",
    "M408": "Report JSON-style response",
    "M420": "Set RGB Colors as PWM/Enable/Disable Mesh Leveling",
    "M421": "Set a Mesh Bed Leveling Z coordinate",
    "M450": "Report Printer Mode",
    "M451": "Select FFF Printer Mode",
    "M452": "Select Laser Printer Mode",
    "M453": "Select CNC Printer Mode",
    "M460": " Define temperature range for thermistor controlled fan",
    "M500": "Store parameters in EEPROM",
    "M501": "Read parameters from EEPROM",
    "M502": "Revert to the default factory settings",
    "M503": "Print settings",
    "M530": "Enable printing mode",
    "M531": "Set print name",
    "M532": "Set print progress",
    "M540": "Enable/Disable Stop SD Print on Endstop Hit/Set MAC address",
    "M550": "Set Name",
    "M551": "Set Password",
    "M552": "Set IP address, enable/disable network interface",
    "M553": "Set Netmask",
    "M554": "Set Gateway",
    "M555": "Set compatibility",
    "M556": "Axis compensation",
    "M557": "Set Z probe point or define probing grid",
    "M558": "Set Z probe type",
    "M559": "Upload configuration file",
    "M560": "Upload web page file",
    "M561": "Set Identity Transform",
    "M562": "Reset temperature fault",
    "M563": "Define or remove a tool",
    "M564": "Limit axes",
    "M565": "Set Z probe offset",
    "M566": "Set allowable instantaneous speed change",
    "M567": "Set tool mix ratios",
    "M568": "Turn off/on tool mix ratios",
    "M569": "Set axis direction and enable values",
    "M570": "Configure heater fault detection",
    "M571": "Set output on extrude",
    "M572": "Set or report extruder pressure advance",
    "M573": "Report heater PWM",
    "M574": "Set endstop configuration",
    "M575": "Set serial comms parameters",
    "M577": "Wait until endstop is triggered",
    "M578": "Fire inkjet bits",
    "M579": "Scale Cartesian axes",
    "M580": "Select Roland",
    "M581": "Configure external trigger",
    "M582": "Check external trigger",
    "M583": "Wait for pin",
    "M584": "Set drive mapping",
    "M585": "Probe Tool",
    "M586": "Configure network protocols",
    "M587": "Store WiFi host network in list, or list stored networks",
    "M588": "Forget WiFi host network",
    "M589": "Configure access point parameters",
    "M590": "Report current tool type and index",
    "M600": "Set line cross section/Filament change pause",
    "M605": "Set dual x-carriage movement mode",
    "M665": " Set delta configuration",
    "M666": "Set delta endstop adjustment",
    "M667": "Select CoreXY mode",
    "M668": "Set Z-offset compensations polynomial",
    "M669": "Set SCARA mode and arm parameters",
    "M700": "Level plate",
    "M701": "Load filament",
    "M702": "Unload filament",
    "M703": "Get Board Type",
    "M710": "Erase the EEPROM and reset the board",
    "M750": "Enable 3D scanner extension",
    "M751": "Register 3D scanner extension over USB",
    "M752": "Start 3D scan",
    "M753": "Cancel current 3D scanner action",
    "M754": "Calibrate 3D scanner",
    "M755": "Set alignment mode for 3D scanner",
    "M756": "Shutdown 3D scanner",
    "M800": "Fire start print procedure",
    "M801": "Fire end print procedure",
    "M851": "Set Z-Probe Offset",
    "M900": "Set Linear Advance Scaling Factors",
    "M905": "Set local date and time",
    "M906": "Set motor currents",
    "M907": "Set digital trimpot motor",
    "M908": "Control digital trimpot directly",
    "M909": "Set microstepping",
    "M910": "Set decay mode",
    "M911": "Set power monitor threshold voltages",
    "M912": "Set electronics temperature monitor adjustment",
    "M913": "Set motor percentage of normal current",
    "M928": "Start SD logging",
    "M997": "Perform in-application firmware update",
    "M998": "Request resend of line",
    "M999": "Restart after being stopped by error"
};

var x_comm = {
    "G0": " to X axis pos: ",
    "G1": " to X axis pos: ",
    "G2": " to X axis pos: ",
    "G3": " to X axis pos: ",
    "G10": " X offset: ",
    "G28": " flag to go back to the X axis origin ",
    "G29.1": " X offset: ",
    "G30": " X coordinate: ",
    "G31": " probe X offset: ",
    "G33": " X correction: ",
    "G61": " X coordinate: ",
    "G92": " new X axis pos: ",
    "G100": " flag to set floor for X axis ",
    "G130": " to X axis pos: ",
    "G161": " flag to home X axis to min ",
    "G162": " flag to home X axis to max ",
    "M18": " X axis: ",
    "M48": " pos on the X axis: ",
    "M92": " X drive: ",
    "M132": " X axis offset: ",
    "M201": " acceleration for X axis: ",
    "M202": " travel moves (in units/s^2): ",
    "M203": " max for X axis: ",
    "M205": " max xy jerk/xy junction deviation: ",
    "M206": " X axis offset/float: ",
    "M208": " X axis limit: ",
    "M210": " in mm per minute: ",
    "M211": " 1=max endstop or 0=min endstop: ",
    "M218": " offset on X: ",
    "M231": " min distance: ",
    "M305": " heater ADC channel: ",
    "M350": " X axis: ",
    "M365": " X scaling: ",
    "M370": " divisions: ",
    "M421": " index: ",
    "M460": " min temp: ",
    "M532": " print progress: ",
    "M556": " deviation in X: ",
    "M557": " X coordinate: ",
    "M558": " If nonzero, use probe for homing X axis: ",
    "M563": " axis: ",
    "M565": " X offset: ",
    "M566": " X axis (mm/min) : ",
    "M574": " X axis: ",
    "M577": " X axis: ",
    "M579": " X axis: ",
    "M581": " endstop input(s) to monitor: ",
    "M584": " driver number(s) for X motor(s): ",
    "M585": " X offset: ",
    "M600": " X pos: ",
    "M605": " duplication x-offset: ",
    "M665": " X tower pos correction: ",
    "M666": " X axis: ",
    "M667": " X axis scale factor: ",
    "M906": " X drive: ",
    "M907": " axis code (in % or amps): ",
    "M909": " X stepper: ",
    "M910": " X stepper: ",
    "M913": " % current for X motor: "
};

var y_comm = 

    "G0": " to Y axis pos: ", "G1": " to Y axis pos: ", "G2": " to Y axis pos: ",
    "G3": " to Y axis pos: ", "G10": " Y offset: ", "G28": " flag to go back to the Y axis origin ",
    "G29.1": " Y offset: ", "G30": " Y coordinate: ", "G31": " probe Y offset: ", "G33": " Y correction: ",
    "G61": " Y coordinate: ", "G92": " new Y axis pos: ", "G100": " flag to set floor for Y axis ",
    "G130": " to Y axis pos: ", "G161": " flag to home Y axis to min ",
    "G162": " flag to home Y axis to max ", "M18": " Y axis: ", "M48": " pos on the Y axis: ",
    "M92": " Y drive: ", "M132": " Y axis offset: ", "M201": " acceleration for Y axis: ",
    "M202": " travel moves (in units/s^2): ", "M203": " max for Y axis: ", "M206": " Y axis offset: ",
    "M208": " Y axis limit: ", "M210": " in mm per minute: ", "M211": " 1=max endstop or 0=min endstop: ",
    "M218": " offset on Y: ", "M231": " retract: ", "M350": " Y axis: ", "M365": " Y scaling: ", "M421": " index: ",
    "M460": " max temp: ", "M556": " deviation in Y: ", "M557": " Y coordinate: ",
    "M558": " If nonzero, use probe for homing Y axis: ", "M565": " Y offset: ", "M566": " Y axis : ",
    "M574": " Y axis: ", "M577": " Y axis: ", "M579": " Y axis: ", "M581": " endstop input(s) to monitor: ",
    "M584": " Y motor(s): ", "M585": " Y offset: ", "M600": " Y pos: ", "M665": " Y tower pos correction: ",
    "M666": " Y axis: ", "M667": " Y axis scale factor: ", "M906": " Y drive: ", "M907": " axis code (in % or amps): ",
    "M909": " Y stepper: ", "M910": " Y stepper: ", "M913": " % current for Y motor: "
};

var z_comm = {
    "G0": " to Z axis pos: ",
    "G1": " to Z axis pos: ",
    "G28": " flag to go back to the Z axis origin ",
    "G29.1": " Z offset: ",
    "G29.2": " Z offset: ",
    "G30": " Z coordinate: ",
    "G31": " trigger Z height: ",
    "G33": " Z correction: ",
    "G61": " Z coordinate: ",
    "G92": " new Z axis pos: ",
    "G100": " flag to set floor for Z axis ",
    "G130": " to Z axis pos: ",
    "G161": " flag to home Z axis to min ",
    "G162": " flag to home Z axis to max ",
    "M18": " Z axis: ",
    "M92": " Z drive: ",
    "M132": " Z axis offset: ",
    "M201": " acceleration for Z axis: ",
    "M203": " max for Z axis: ",
    "M205": " max Z jerk/z junction deviation: ",
    "M206": " Z axis offset: ",
    "M207": " additional zlift/hop: ",
    "M208": " Z axis limit: ",
    "M211": " 1=max endstop or 0=min endstop: ",
    "M212": " Z home: ",
    "M231": " backslash: ",
    "M350": " Z axis: ",
    "M365": " Z scaling: ",
    "M374": " save M206 Z homing offset into the grid file ",
    "M421": " offset (in mm): ",
    "M556": " deviation in Z: ",
    "M558": " If nonzero, use probe for homing Z axis: ",
    "M565": " Z offset: ",
    "M566": " Z axis : ",
    "M574": " Z axis: ",
    "M577": " Z axis: ",
    "M579": " Z axis: ",
    "M581": " endstop input(s) to monitor: ",
    "M584": " Z motor(s): ",
    "M585": " Z offset: ",
    "M600": " relative lift: ",
    "M665": " Z tower pos correction: ",
    "M666": " Z axis: ",
    "M667": " Z axis scale factor: ",
    "M851": " offset: ",
    "M906": " Z drive: ",
    "M907": " axis code (in % or amps): ",
    "M909": " Z stepper: ",
    "M910": " Z stepper: ",
    "M913": " % current for Z motor: "
};

var e_comm = {
    "G0": " extrude amount: ",
    "G1": " extrude amount: ",
    "G2": " extrude amount: ",
    "G3": " extrude amount: ",
    "G10": " Z offset: ",
    "G61": " E coordinate: ",
    "G92": " new extruder pos: ",
    "M18": " extruder drive(s): ",
    "M43": " toggle background endstop monitoring: ",
    "M48": " engage ",
    "M92": " extruder drive(s): ",
    "M201": " acceleration for extruder drives: ",
    "M203": " max for extruder drives: ",
    "M205": " max E jerk: ",
    "M301": " heater #: ",
    "M350": " extruder 0: ",
    "M420": " green PWM: ",
    "M566": " extruder drives : ",
    "M567": " mix ratios: ",
    "M574": " extruder endstops (low/high): ",
    "M577": " extruder drive: ",
    "M581": " endstop input(s) to monitor: ",
    "M584": " E motor(s): ",
    "M600": " initial retract: ",
    "M906": " E drive(s): ",
    "M907": " axis code (in % or amps): ",
    "M909": " E stepper: ",
    "M910": " E stepper: ",
    "M913": " % current for extruders: "
};

var f_comm = 

    "G0": " feed rate: ", "G1": " feed rate: ", "G2": " feed rate: ", "G3": " feed rate: ",
    "G61": " F set feedrate: ", "G161": " desired feedrate: ", "G162": " desired feedrate: ",
    "M106": " frequency (in Hz): ", "M207": " retraction feedrate (in mm/min): ",
    "M208": " feedrate (in mm/sec): ", "M231": " ReatrctMove: ", "M558": " feed rate: ", "M563": " fan(s): ",
    "M571": " output PWM frequency: "
};

var s_comm = {
    "G0": " endstop flag: ",
    "G1": " endstop flag: ",
    "G4": " wait time (in s): ",
    "G10": " active temperature(s) or retract length: ",
    "G11": " retract length: ",
    "G29": " firmware-dependent behavior: ",
    "G30": " set parameter: ",
    "G31": " calibration temperature: ",
    "G32": " bed leveling method: ",
    "G60": " memory slot #: ",
    "G61": " memory slot #: ",
    "M0": " wait time (in s): ",
    "M20": " output style: ",
    "M26": " file pos (in bytes): ",
    "M37": " toggle mode ( S1 enters, S0 leaves) ",
    "M42": " pin value: ",
    "M48": " schizoid ",
    "M85": " seconds: ",
    "M104": " target temperature: ",
    "M105": " response type: ",
    "M106": " fan speed: ",
    "M109": " min target temp: ",
    "M111": " debug on/off: ",
    "M113": " value to set: ",
    "M128": " pressure: ",
    "M130": " proportional (Kp): ",
    "M131": " integral (Ki): ",
    "M132": " derivative (Kd): ",
    "M133": " integral limit (Ki): ",
    "M135": " heat sample time (in s): ",
    "M140": " target temperature: ",
    "M141": " target temperature: ",
    "M142": " holding pressure of the bed: ",
    "M143": " max temp: ",
    "M155": " enable(1)/disable(0): ",
    "M160": " # of materials: ",
    "M163": " extruder #: ",
    "M164": " virtual extruder#: ",
    "M190": " min target temperature: ",
    "M191": " min target temperature: ",
    "M205": " min travel speed/min planner speed: ",
    "M206": " int (long): ",
    "M207": " positive length to retract (in mm): ",
    "M208": " toggle set the axis min/positive length surplus to the M207: ",
    "M209": " 1=true or 0=false: ",
    "M211": " 1=enable or 0=disable: ",
    "M220": " percentage: ",
    "M221": " percentage: ",
    "M226": " pin state: ",
    "M227": " steps: ",
    "M229": " extruder screw rotation: ",
    "M230": " 1=disable or 0=enable: ",
    "M231": " OPS_MODE: ",
    "M251": " 0 =Reset, 1=Print, 2=Store to Z length: ",
    "M260": "  send and reset buffer ",
    "M280": " angle or microseconds: ",
    "M290": " amount (in mm): ",
    "M300": " frequency (in Hz) ",
    "M301": " heater #: ",
    "M302": " min temp: ",
    "M303": " temperature: ",
    "M307": " max PWM: ",
    "M320": " >0 activate and store persistently in EEPROM: ",
    "M321": " >0 deactivate and store persistently in EEPROM: ",
    "M322": " >0 also reset the matrix values saved EEPROM: ",
    "M323": " 0=disable,1=enable: ",
    "M340": " pulseInUS: ",
    "M350": " all drivers: ",
    "M355": " 1=enable,0=disable: ",
    "M408": " response type: ",
    "M420": " 1=enable,0=disable: ",
    "M501": " enable auto-save: ",
    "M530": " 1=started, 0=ended: ",
    "M540": " 1=enable, 0=disable: ",
    "M552": " disable/enable networking: ",
    "M556": " height of distances: ",
    "M558": " extra for experimentation: ",
    "M564": " axis boundaries: ",
    "M568": " 0=off,non-zero=on: ",
    "M569": " direction- 0=backwards,1=forwards: ",
    "M570": " heater timeout (in s): ",
    "M571": " output value: ",
    "M572": " pressure advance amount (in s): ",
    "M574": " logic level: ",
    "M575": " checksums: ",
    "M577": " endstop level: ",
    "M578": " bit pattern: ",
    "M581": " rising/falling edge: ",
    "M583": " state: ",
    "M584": " special functions: ",
    "M586": " 0=disable,1=enable: ",
    "M587": " network SSID: ",
    "M588": " SSID to remove: ",
    "M589": " SSID: ",
    "M605": " mode: ",
    "M665": " segments per second: ",
    "M667": " coreXY mode: ",
    "M669": " segments per second: ",
    "M752": " length/degrees: ",
    "M905": " time: ",
    "M907": " axis code (in % or amps): ",
    "M908": " current: ",
    "M911": " undervoltage threshold: ",
    "M912": " value to add to temp (in C): ",
    "M997": " firmware module number(s): "
};

var i_comm = 

    "G2": " distance to maintain from (X space): ", "G3": " distance to maintain from (X space): ",
    "M43": " flag to ignore pin protection: ", "M84": " reset flags: ", "M106": " disable fan: ",
    "M165": " mix factor for extruder stepper 6: ", "M280": " 1=invert polarity: ", "M301": " integral (Ki): ",
    "M304": " integral (Ki): ", "M350": " enable (nn=1) or disable (nn=0) interpolation: ",
    "M558": " invert (I1)/do not invert (I0) reading: ", "M587": " IP address: ", "M589": " IP address: ",
    "M906": " idle factor: "
};

var j_comm = 

    "G2": " distance to maintain from (Y space): ", "G3": " distance to maintain from (Y space): ",
    "M587": " Gateway IP address: "
};

var p_comm = {
    "G4": " wait time (in ms): ",
    "G10": " tool #: ",
    "G30": " probe point #: ",
    "G31": " trigger value: ",
    "G32": " bed correction method: ",
    "M0": " wait time (in ms): ",
    "M20": " directory to list: ",
    "M21": " SD card #: ",
    "M22": " SD card #: ",
    "M42": " pin #: ",
    "M43": " pin to read or watch: ",
    "M48": " # of points: ",
    "M72": " song ID: ",
    "M73": " percentage: ",
    "M98": " line #: ",
    "M106": " fan #: ",
    "M111": " debug module: ",
    "M115": " electronics type: ",
    "M116": " tool #: ",
    "M126": " wait (in ms): ",
    "M127": " wait (in ms): ",
    "M129": " wait (in ms): ",
    "M130": " heater #: ",
    "M131": " heater #: ",
    "M132": " heater #: ",
    "M133": " heater #/wait time: ",
    "M134": " time limit: ",
    "M163": " weight: ",
    "M164": " store to eeprom (P0 = no, P1 = yes): ",
    "M204": " printing moves: ",
    "M206": " pos: ",
    "M226": " pin #: ",
    "M227": " steps: ",
    "M229": " extruder screw rotation: ",
    "M280": " servo index: ",
    "M300": " duration (in ms) ",
    "M301": " proportional (Kp): ",
    "M302": " allow state: ",
    "M304": " proportional (Kp): ",
    "M305": " heater #: ",
    "M323": " 1=store correction state persistently in EEPROM: ",
    "M340": " servoId: ",
    "M540": " MAC address: ",
    "M550": " machine name: ",
    "M551": " password: ",
    "M552": " IP address: ",
    "M553": " net mask: ",
    "M554": " gateway: ",
    "M555": " emulation type: ",
    "M557": " probe point #: ",
    "M558": " Z probe type: ",
    "M562": " heater #: ",
    "M563": " tool #: ",
    "M567": " tool #: ",
    "M568": " tool #: ",
    "M569": " motor driver #: ",
    "M570": " time (in s): ",
    "M571": " logical pin #: ",
    "M573": " heater #: ",
    "M575": " serial channel #: ",
    "M578": " inkjet head #: ",
    "M580": " initial text: ",
    "M581": " reserved: ",
    "M583": " pin #: ",
    "M586": " protocol: ",
    "M587": " network password: ",
    "M589": " WiFi password: ",
    "M669": " proximal arm length (mm): ",
    "M752": " filename: ",
    "M755": " turn on (> 0) or off (<= 0): ",
    "M905": " date: ",
    "M908": " pin: ",
    "M911": " power monitor channel: ",
    "M912": " temp monitor channel: ",
    "M998": " line #: ",
    "M999": " reset flags: "
};

var a_comm = {
    "G6": " Stepper A pos/angle: ",
    "G130": " to A axis pos: ",
    "M132": " A axis offset: ",
    "M165": " mix factor for extruder stepper 1: ",
    "M260": "  address: ",
    "M261": "  address: ",
    "M307": " gAin: ",
    "M666": " X bed tilt %: ",
    "M669": " proximal arm joint min/max angles: "
};

var b_comm = {
    "G6": " Stepper B pos/angle: ",
    "G130": " to B axis pos: ",
    "M106": " blip time: ",
    "M132": " B axis offset: ",
    "M150": " blue: ",
    "M165": " mix factor for extruder stepper 2: ",
    "M205": " min segment time: ",
    "M260": "  add to buffer: ",
    "M261": "  bytes: ",
    "M305": " beta value: ",
    "M307": " Bang-bang control: ",
    "M350": " extruder 1: ",
    "M420": " blue PWM: ",
    "M575": " baud rate: ",
    "M665": " safe probing radius: ",
    "M666": " Y bed tilt %: ",
    "M669": " proximal-to-distal arm joint min/max angles: ",
    "M907": " axis code (in % or amps): "
};

var c_comm = {
    "G6": " Stepper C pos/angle: ",
    "G31": " temperature coefficient: ",
    "M116": " chamber #: ",
    "M149": " Flag to treat temperature as Celsius ",
    "M165": " mix factor for extruder stepper 3: ",
    "M250": " contrast value: ",
    "M303": " cycles: ",
    "M305": " Steinhart-Hart C coefficient: ",
    "M307": " dominant time (in s): ",
    "M581": " condition: ",
    "M669": " proximal-to-distal crosstalk factor: "
};

var r_comm = {
    "G6": " relative move flag: ",
    "G10": " standby temperature(s): ",
    "G33": " reset distortion matrix(R0): ",
    "G100": " radius to add: ",
    "M105": " response sequence #: ",
    "M106": " restore speed: ",
    "M109": " max/accurate target temp: ",
    "M146": " relative humidity (in percent): ",
    "M150": " red: ",
    "M190": " accurate target temperature: ",
    "M191": " accurate target temperature: ",
    "M207": " positive or negative additional length to un-retract (in mm): ",
    "M305": " series resistor value: ",
    "M408": " response sequence #: ",
    "M420": " red PWM: ",
    "M552": " HTTP port: ",
    "M558": " recovery time: ",
    "M569": " driver enable polarity- 0=active low,1=active high: ",
    "M580": " toggle activation: ",
    "M583": " analog value: ",
    "M586": " TCP port #: ",
    "M605": " duplication temp offset: ",
    "M665": " delta radius: ",
    "M900": " ratio: "
};

var u_comm = {
    "G10": " U, V and W axis offsets: ",
    "M150": " green: ",
    "M584": " U axes: "
};

var h_comm = {
    "G30": " height correction: ",
    "M106": " select heaters: ",
    "M116": " heater #: ",
    "M140": " heater #: ",
    "M141": " heater #: ",
    "M143": " heater #: ",
    "M165": " mix factor for extruder stepper 5: ",
    "M301": " heater #: ",
    "M305": " ADC high offset: ",
    "M307": " heater #: ",
    "M376": " height (in mm): ",
    "M558": " dive height (in mm): ",
    "M563": " heater(s): ",
    "M570": " heater #: ",
    "M665": " delta height: ",
    "M900": " height: ",
    "M906": " set/get motor currents for the downward Z-probe homing: "
};

var t_comm = {
    "G31": " Z probe type: ",
    "M106": " set thermostatic mode: ",
    "M126": " toolhead: ",
    "M127": " toolhead: ",
    "M133": " extruder to wait for: ",
    "M134": " platform to wait for: ",
    "M135": " toolhead change: ",
    "M204": "  travel moves: ",
    "M205": " travel only ",
    "M206": " type: ",
    "M207": " feedrate for un-retraction if different from retraction (in mm/min): ",
    "M218": " extruder #: ",
    "M305": " thermistor resistance at 25C: ",
    "M558": " travel speed: ",
    "M569": " min driver step pulse width & interval (in micro s): ",
    "M570": " temp: ",
    "M581": " logical trigger #: ",
    "M582": " trigger #: ",
    "M586": " 0=don't use,1=use TLS: ",
    "M911": " overvoltage threshold: "
};

var d_comm = {
    "M165": " mix factor for extruder stepper 4: ",
    "M200": " filament diameter (in mm): ",
    "M221": " drive #: ",
    "M301": " derivative (Kd): ",
    "M304": " derivative (Kd): ",
    "M307": " dead time (in s): ",
    "M404": " nozzle diameter (in mm): ",
    "M563": " extruder drive(s): ",
    "M572": " extruder #: ",
    "M669": " distal arm length (mm): ",
    "M900": " diam: "
};

var l_comm = {
    "G33": " list distortion matrix(L0): ",
    "M48": " legs of travel: ",
    "M106": " min fan speed: ",
    "M305": " ADC low offset: ",
    "M530": " # of layers: ",
    "M532": " printed layer: ",
    "M600": " later retract distance for removal: ",
    "M665": " diagonal rod length: ",
    "M669": " min segment length (mm): "
};

var w_comm = {
    "M43": " watch pins: ",
    "M584": " W axes: ",
    "M900": " width: "
};

var v_comm = {
    "M48": " verbosity: ",
    "M584": " V axes: "
};

var k_comm = {
    "M149": " Flag to treat temperature as Kelvin ",
    "M587": " Netmask: ",
    "M900": " factor: "
};

var count = {
    "G0": 0,
    "G1": 0,
    "G2": 0,
    "G3": 0,
    "G4": "Dwell (pause)",
    "G6": 0,
    "G10": 0,
    "G11": 0,
    "G20": 0,
    "G21": 0,
    "G22": 0,
    "G23": 0,
    "G28": 0,
    "G29": 0,
    "G29.1": 0,
    "G29.2": 0,
    "G30": 0,
    "G31": 0,
    "G32": 0,
    "G33": 0,
    "G60": 0,
    "G61": 0,
    "G90": 0,
    "G91": 0,
    "G92": 0,
    "G100": 0,
    "G130": 0,
    "G131": 0,
    "G132": 0,
    "G133": 0,
    "G161": 0,
    "G162": 0
};

var simp_comm = {
    "G0": "Move",
    "G1": "Move",
    "G2": "Move",
    "G3": "Move",
    "G4": "Dwell",
    "G6": "Move",
    "G10": "Tool Offset/Retract",
    "G11": "Unretract",
    "G20": "Units to Inches",
    "G21": "Units to mm",
    "G22": "Retract",
    "G23": "Unretract/Precharge",
    "G28": "Move to Origin",
    "G29": "Level bed",
    "G29.1": "Set Z probe head offset",
    "G29.2": "Set Z probe head offset",
    "G30": "Probes bed",
    "G31": "Set or Report Current Probe status/Dock Z Probe sled",
    "G32": "Probe Z and calculate Z plane/Undock Z Probe sled",
    "G33": "Measure/List/Adjust Distortion Matrix",
    "G60": "save current position to slot",
    "G61": "Apply/restore saved coordinates to the active extruder",
    "G90": "Set to Absolute Positioning",
    "G91": "Set to Relative Positioning",
    "G92": "Set Position",
    "G100": "Calibrate floor or rod radius",
    "G130": "Set digital potentiometer value",
    "G131": "Remove offset",
    "G132": "Calibrate endstop offsets",
    "G133": "Measure steps to top",
    "G161": "Home axes to min",
    "G162": "Home axes to max"
};

var s_x_comm = {
    "G0": " X: ",
    "G1": " X: ",
    "G2": " X: ",
    "G3": " X: ",
    "G10": " X: ",
    "G28": " flag ",
    "G29.1": " X: ",
    "G30": " X: ",
    "G31": " X: ",
    "G33": " X: ",
    "G61": " X: ",
    "G92": " new X: ",
    "G100": " flag ",
    "G130": " X: ",
    "G161": " flag ",
    "G162": " flag "
};

var s_y_comm = {
    "G0": " Y: ",
    "G1": " Y: ",
    "G2": " Y: ",
    "G3": " Y: ",
    "G10": " Y: ",
    "G28": " flag ",
    "G29.1": " Y: ",
    "G30": " Y: ",
    "G31": " Y: ",
    "G33": " Y: ",
    "G61": " Y: ",
    "G92": " new Y: ",
    "G100": " flag ",
    "G130": " Y: ",
    "G161": " flag ",
    "G162": " flag "
};

var s_z_comm = {
    "G0": " Z: ",
    "G1": " Z: ",
    "G28": " flag ",
    "G29.1": " Z offset: ",
    "G29.2": " Z: ",
    "G30": " Z: ",
    "G31": " trigger Z height: ",
    "G33": " Z: ",
    "G61": " Z: ",
    "G92": " new Z: ",
    "G100": " flag ",
    "G130": " Z: ",
    "G161": " flag ",
    "G162": " flag "
};

var s_e_comm = {
    "G0": " extrude: ",
    "G1": " extrude: ",
    "G2": " extrude: ",
    "G3": " extrude: ",
    "G10": " Z: ",
    "G61": " E: ",
    "G92": " new extruder: "
};

var s_f_comm = {
    "G0": " feed: ",
    "G1": " feed: ",
    "G2": " feed: ",
    "G3": " feed: ",
    "G61": " feed: ",
    "G161": " feed: ",
    "G162": " feed: "
};

var s_s_comm = {
    "G0": " flag: ",
    "G1": " flag: ",
    "G4": " wait: ",
    "G10": " temp or length: ",
    "G11": " length: ",
    "G29": " firmware-dependent behavior: ",
    "G30": " set parameter: ",
    "G31": " temp: ",
    "G32": " method: ",
    "G60": " memory slot #: ",
    "G61": " memory slot #: "
};

var s_i_comm = {
    "G2": " X dist: ",
    "G3": " X dist: "
};

var s_j_comm = {
    "G2": " Y dist: ",
    "G3": " Y dist: "
};

var s_p_comm = {
    "G4": " wait: ",
    "G10": " tool #: ",
    "G30": " probe point #: ",
    "G31": " trigger value: ",
    "G32": " method: "
};

var s_a_comm = {
    "G6": " A: ",
    "G130": " A: "
};

var s_b_comm = {
    "G6": " B: ",
    "G130": " B: "
};

var s_c_comm = {
    "G6": " C: ",
    "G31": " temp co: "
};

var s_r_comm = {
    "G6": " flag: ",
    "G10": " temp: ",
    "G33": " reset R0: ",
    "G100": " radius: "
};

var s_u_comm = {
    "G10": " U, V and W: "
};

var s_h_comm = {
    "G30": " height: "
};

var s_t_comm = {
    "G31": " type: "
};

var s_l_comm = {
    "G33": " list L0: "
};

(function (codeEditor, undefined) {
    /**
     Translates a line of GCode to english.

     @param gCodeLine: line of GCode to translate

     @return: English version of GCode line.
     If this is not a valid line of GCode, this will be an error message.
     **/
    codeEditor.interpretLine = function (gCodeLine) {

        if (gCodeLine == "") {
            return "";
        }

        var commands = gCodeLine.split(/ +/);
        var output = "";
        var found = true;
        var comment = false;
        var slash = false;
        var comments = "";
        for (i = 0; i < commands.length; i++) {
            if (!(commands[i] in common_comm)) {
                found = false;
                //check if it is valid
                switch ((commands[i]).charAt(0)) {
                    case 'N':
                        found = true;
                        comment = false;
                        if (commands[0] == "M404") {
                            output += " filament width (in mm): " + (commands[i]).slice(1) + ";";
                        }
                        else {
                            output += " line number (can be used for checking): " + (commands[i]).slice(1) + ";";
                        }
                        break;
                    case 'X':
                        if (commands[0] in x_comm) {
                            found = true;
                            comment = false;
                            if ((commands[0] in count) && (commands[0] in s_x_comm)) {
                                if (count[commands[0]] > 3) {
                                    output += s_x_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                                else {
                                    output += x_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                            }
                            else {
                                output += x_comm[commands[0]] + (commands[i]).slice(1) + ";";
                            }
                        }
                        break;
                    case 'Y':
                        if (commands[0] in y_comm) {
                            found = true;
                            comment = false;
                            if ((commands[0] in count) && (commands[0] in s_y_comm)) {
                                if (count[commands[0]] > 3) {
                                    output += s_y_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                                else {
                                    output += y_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                            }
                            else {
                                output += y_comm[commands[0]] + (commands[i]).slice(1) + ";";
                            }
                        }
                        break;
                    case 'Z':
                        if (commands[0] in z_comm) {
                            found = true;
                            comment = false;
                            if ((commands[0] in count) && (commands[0] in s_z_comm)) {
                                if (count[commands[0]] > 3) {
                                    output += s_z_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                                else {
                                    output += z_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                            }
                            else {
                                output += z_comm[commands[0]] + (commands[i]).slice(1) + ";";
                            }
                        }
                        break;
                    case 'E':
                        if (commands[0] in e_comm) {
                            found = true;
                            comment = false;
                            if ((commands[0] in count) && (commands[0] in s_e_comm)) {
                                if (count[commands[0]] > 3) {
                                    output += s_e_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                                else {
                                    output += e_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                            }
                            else {
                                output += e_comm[commands[0]] + (commands[i]).slice(1) + ";";
                            }
                        }
                        break;
                    case 'F':
                        if (commands[0] in f_comm) {
                            found = true;
                            comment = false;
                            if ((commands[0] in count) && (commands[0] in s_f_comm)) {
                                if (count[commands[0]] > 3) {
                                    output += s_f_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                                else {
                                    output += f_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                            }
                            else {
                                output += f_comm[commands[0]] + (commands[i]).slice(1) + ";";
                            }
                        }
                        break;
                    case 'S':
                        if (commands[0] in s_comm) {
                            found = true;
                            comment = false;
                            if ((commands[0] in count) && (commands[0] in s_s_comm)) {
                                if (count[commands[0]] > 3) {
                                    output += s_s_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                                else {
                                    output += s_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                            }
                            else {
                                output += s_comm[commands[0]] + (commands[i]).slice(1) + ";";
                            }
                        }
                        break;
                    case 'I':
                        if (commands[0] in i_comm) {
                            found = true;
                            comment = false;
                            if ((commands[0] in count) && (commands[0] in s_i_comm)) {
                                if (count[commands[0]] > 3) {
                                    output += s_i_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                                else {
                                    output += i_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                            }
                            else {
                                output += i_comm[commands[0]] + (commands[i]).slice(1) + ";";
                            }
                        }
                        break;
                    case 'J':
                        if (commands[0] in j_comm) {
                            found = true;
                            comment = false;
                            if ((commands[0] in count) && (commands[0] in s_j_comm)) {
                                if (count[commands[0]] > 3) {
                                    output += s_j_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                                else {
                                    output += j_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                            }
                            else {
                                output += j_comm[commands[0]] + (commands[i]).slice(1) + ";";
                            }
                        }
                        break;
                    case 'P':
                        if (commands[0] in p_comm) {
                            found = true;
                            comment = false;
                            if ((commands[0] in count) && (commands[0] in s_p_comm)) {
                                if (count[commands[0]] > 3) {
                                    output += s_p_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                                else {
                                    output += p_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                            }
                            else {
                                output += p_comm[commands[0]] + (commands[i]).slice(1) + ";";
                            }
                        }
                        break;
                    case 'A':
                        if (commands[0] in a_comm) {
                            found = true;
                            comment = false;
                            if ((commands[0] in count) && (commands[0] in s_a_comm)) {
                                if (count[commands[0]] > 3) {
                                    output += s_a_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                                else {
                                    output += a_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                            }
                            else {
                                output += a_comm[commands[0]] + (commands[i]).slice(1) + ";";
                            }
                        }
                        break;
                    case 'B':
                        if (commands[0] in b_comm) {
                            found = true;
                            comment = false;
                            if ((commands[0] in count) && (commands[0] in s_b_comm)) {
                                if (count[commands[0]] > 3) {
                                    output += s_b_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                                else {
                                    output += b_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                            }
                            else {
                                output += b_comm[commands[0]] + (commands[i]).slice(1) + ";";
                            }
                        }
                        break;
                    case 'C':
                        if (commands[0] in c_comm) {
                            found = true;
                            comment = false;
                            if ((commands[0] in count) && (commands[0] in s_c_comm)) {
                                if (count[commands[0]] > 3) {
                                    output += s_c_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                                else {
                                    output += c_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                            }
                            else {
                                output += c_comm[commands[0]] + (commands[i]).slice(1) + ";";
                            }
                        }
                        break;
                    case 'R':
                        if (commands[0] in r_comm) {
                            found = true;
                            comment = false;
                            if ((commands[0] in count) && (commands[0] in s_r_comm)) {
                                if (count[commands[0]] > 3) {
                                    output += s_r_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                                else {
                                    output += r_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                            }
                            else {
                                output += r_comm[commands[0]] + (commands[i]).slice(1) + ";";
                            }
                        }
                        break;
                    case 'U':
                        if (commands[0] in u_comm) {
                            found = true;
                            comment = false;
                            if ((commands[0] in count) && (commands[0] in s_u_comm)) {
                                if (count[commands[0]] > 3) {
                                    output += s_u_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                                else {
                                    output += u_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                            }
                            else {
                                output += u_comm[commands[0]] + (commands[i]).slice(1) + ";";
                            }
                        }
                        break;
                    case 'H':
                        if (commands[0] in h_comm) {
                            found = true;
                            comment = false;
                            if ((commands[0] in count) && (commands[0] in s_h_comm)) {
                                if (count[commands[0]] > 3) {
                                    output += s_h_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                                else {
                                    output += h_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                            }
                            else {
                                output += h_comm[commands[0]] + (commands[i]).slice(1) + ";";
                            }
                        }
                        break;
                    case 'T':
                        if (commands[0] in t_comm) {
                            found = true;
                            comment = false;
                            if ((commands[0] in count) && (commands[0] in s_t_comm)) {
                                if (count[commands[0]] > 3) {
                                    output += s_t_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                                else {
                                    output += t_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                            }
                            else {
                                output += t_comm[commands[0]] + (commands[i]).slice(1) + ";";
                            }
                        }
                        break;
                    case 'D':
                        if (commands[0] in d_comm) {
                            found = true;
                            comment = false;
                            output += d_comm[commands[0]] + (commands[i]).slice(1) + ";";
                        }
                        break;
                    case 'L':
                        if (commands[0] in l_comm) {
                            found = true;
                            comment = false;
                            if ((commands[0] in count) && (commands[0] in s_l_comm)) {
                                if (count[commands[0]] > 3) {
                                    output += s_l_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                                else {
                                    output += l_comm[commands[0]] + (commands[i]).slice(1) + ";";
                                }
                            }
                            else {
                                output += l_comm[commands[0]] + (commands[i]).slice(1) + ";";
                            }
                        }
                        break;
                    case 'W':
                        if (commands[0] in w_comm) {
                            found = true;
                            comment = false;
                            output += w_comm[commands[0]] + (commands[i]).slice(1) + ";";
                        }
                        break;
                    case 'V':
                        if (commands[0] in v_comm) {
                            found = true;
                            comment = false;
                            output += v_comm[commands[0]] + (commands[i]).slice(1) + ";";
                        }
                        break;
                    case 'K':
                        if (commands[0] in k_comm) {
                            found = true;
                            comment = false;
                            output += k_comm[commands[0]] + (commands[i]).slice(1) + ";";
                        }
                        break;
                    case '*':
                        found = true;
                        comment = false;
                        output += " checksum (can be used for checking): " + (commands[i]).slice(1) + ";";
                        break;
                    case ';':
                        found = true;
                        comment = true;
                        break;
                    case '/':
                        if (slash == true) {
                            found = true;
                            comment = true;
                            slash = false;
                        }
                        else {
                            found = true;
                            slash = true;
                            comment = true;
                        }
                        break;
                    case ';*':
                        found = true;
                        comment = true;
                        break;
                    case '->':
                        found = true;
                        comment = true;
                        break;
                    default:
                        if (comment == true) {
                            found = true;
                            comments += (commands[i]) + " ";
                        }
                }
            }
            else {
                found = true;
                if (commands[i] in count) {
                    count[commands[i]] = count[commands[i]] + 1;
                    if (count[commands[i]] > 3) {
                        output += simp_comm[commands[i]] + " - ";
                    }
                    else {
                        output += common_comm[commands[i]] + " - ";
                    }
                }
                else {
                    output += common_comm[commands[i]] + " - ";
                }
            }
        }
        if (found == false) {
            return "COMMAND NOT FOUND"
        }
        
        return output;
    };
}(window.codeEditor = window.codeEditor || {}));