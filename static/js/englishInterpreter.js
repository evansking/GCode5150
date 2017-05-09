(function( codeEditor, undefined ) {
  /** 
    Translates a line of GCode to english.

    @param gCodeLine: line of GCode to translate

    @return: English version of GCode line.
             If this is not a valid line of GCode, this will be an error message.
  **/
//xyzefsijpabcruhtdlwvk
  var commandSpecs = {
        'G0': {
            'content': 'G0',
            'description': 'Move (rapid linear)',
            'parameters': {
                'E': ' extrude amount: $val',
                'F': ' feed rate: $val',
                'S': ' endstop flag: $val',
                'Y': ' to Y axis pos: $val',
                'X': ' to X axis pos: $val',
                'Z': ' to Z axis pos: $val'
            }
        },
        'G1': {
            'content': 'G1',
            'description': 'Move (linear)',
            'parameters': {
                'E': ' extrude amount: $val',
                'F': ' feed rate: $val',
                'S': ' endstop flag: $val',
                'Y': ' to Y axis pos: $val',
                'X': ' to X axis pos: $val',
                'Z': ' to Z axis pos: $val'
            }
        },
        'G2': {
            'content': 'G2',
            'description': 'Move (controlled clockwise arc)',
            'parameters': {
                'E': ' extrude amount: $val',
                'F': ' feed rate: $val',
                'I': ' distance to maintain from (X space): $val',
                'J': ' distance to maintain from (Y space): $val',
                'Y': ' to Y axis pos: $val',
                'X': ' to X axis pos: $val'
            }
        },
        'G3': {
            'content': 'G3',
            'description': 'Move (controlled counter-clockwise arc)',
            'parameters': {
                'E': ' extrude amount: $val',
                'F': ' feed rate: $val',
                'I': ' distance to maintain from (X space): $val',
                'J': ' distance to maintain from (Y space): $val',
                'Y': ' to Y axis pos: $val',
                'X': ' to X axis pos: $val'
            }
        },
        'G4': {
            'content': 'G4',
            'description': 'Dwell (pause)',
            'parameters': {
                'P': ' wait time (in ms): $val',
                'S': ' wait time (in s): $val'
            }
        },
        'G6': {
            'content': 'G6',
            'description': 'Move (direct stepper)',
            'parameters': {
                'A': ' Stepper A pos/angle: ',
                'C': ' Stepper C pos/angle: ',
                'B': ' Stepper B pos/angle: ',
                'R': ' relative move flag: '
            }
        },
        'G10': {
            'content': 'G10',
            'description': 'Tool Offset/Retract',
            'parameters': {
                'E': ' Z offset: ',
                'P': ' tool #: ',
                'S': ' active temperature(s) or retract length: ',
                'R': ' standby temperature(s): ',
                'U': ' U, V and W axis offsets: ',
                'Y': ' Y offset: ',
                'X': ' X offset: '
            }
        },
        'G11': {
            'content': 'G11',
            'description': 'Unretract',
            'parameters': {
                'S': ' retract length: '
            }
        },
        'G20': {
            'content': 'G20',
            'description': 'Set Units to Inches',
            'parameters': {}
        },
        'G21': {
            'content': 'G21',
            'description': 'Set Units to Millimeters',
            'parameters': {}
        },
        'G22': {
            'content': 'G22',
            'description': 'Firmware controlled Retract',
            'parameters': {}
        },
        'G23': {
            'content': 'G23',
            'description': 'Firmware controlled Unretract/Precharge',
            'parameters': {}
        },
        'G28': {
            'content': 'G28',
            'description': 'Move to Origin',
            'parameters': {
                'Y': ' flag to go back to the Y axis origin ',
                'X': ' flag to go back to the X axis origin ',
                'Z': ' flag to go back to the Z axis origin '
            }
        },
        'G29': {
            'content': 'G29',
            'description': 'Use Probe to level bed',
            'parameters': {
                'S': ' firmware-dependent behavior: '
            }
        },
        'G29.1': {
            'content': 'G29.1',
            'description': 'Set Z probe head offset',
            'parameters': {
                'Y': ' Y offset: ',
                'X': ' X offset: ',
                'Z': ' Z offset: '
            }
        },
        'G29.2': {
            'content': 'G29.2',
            'description': 'Set Z probe head offset (from toolhead position)',
            'parameters': {
                'Z': ' Z offset: '
            }
        },
        'G30': {
            'content': 'G30',
            'description': 'Probes bed at current XY location',
            'parameters': {
                'H': ' height correction: ',
                'P': ' probe point #: ',
                'S': ' set parameter: ',
                'Y': ' Y coordinate: ',
                'X': ' X coordinate: ',
                'Z': ' Z coordinate: '
            }
        },
        'G31': {
            'content': 'G31',
            'description': 'Set or Report Current Probe status/Dock Z Probe sled',
            'parameters': {
                'C': ' temperature coefficient: ',
                'P': ' trigger value: ',
                'S': ' calibration temperature: ',
                'T': ' Z probe type: ',
                'Y': ' probe Y offset: ',
                'X': ' probe X offset: ',
                'Z': ' trigger Z height: '
            }
        },
        'G32': {
            'content': 'G32',
            'description': 'Probe Z and calculate Z plane/Undock Z Probe sled',
            'parameters': {
                'P': ' bed correction method: ',
                'S': ' bed leveling method: '
            }
        },
        'G33': {
            'content': 'G33',
            'description': 'Measure/List/Adjust Distortion Matrix',
            'parameters': {
                'Y': ' Y correction: ',
                'X': ' X correction: ',
                'R': ' reset distortion matrix(R0): ',
                'L': ' list distortion matrix(L0): ',
                'Z': ' Z correction: '
            }
        },
        'G60': {
            'content': 'G60',
            'description': 'save current position to slot',
            'parameters': {
                'S': ' memory slot #: '
            }
        },
        'G61': {
            'content': 'G61',
            'description': 'Apply/restore saved coordinates to the active extruder',
            'parameters': {
                'E': ' E coordinate: ',
                'F': ' F set feedrate: ',
                'S': ' memory slot #: ',
                'Y': ' Y coordinate: ',
                'X': ' X coordinate: ',
                'Z': ' Z coordinate: '
            }
        },
        'G90': {
            'content': 'G90',
            'description': 'Set to Absolute Positioning',
            'parameters': {}
        },
        'G91': {
            'content': 'G91',
            'description': 'Set to Relative Positioning',
            'parameters': {}
        },
        'G92': {
            'content': 'G92',
            'description': 'Set Position',
            'parameters': {
                'Y': ' new Y axis pos: ',
                'X': ' new X axis pos: ',
                'Z': ' new Z axis pos: ',
                'E': ' new extruder pos: '
            }
        },
        'G100': {
            'content': 'G100',
            'description': 'Calibrate floor or rod radius',
            'parameters': {
                'Y': ' flag to set floor for Y axis ',
                'X': ' flag to set floor for X axis ',
                'R': ' radius to add: ',
                'Z': ' flag to set floor for Z axis '
            }
        },
        'G130': {
            'content': 'G130',
            'description': 'Set digital potentiometer value',
            'parameters': {
                'A': ' to A axis pos: ',
                'Y': ' to Y axis pos: $val',
                'B': ' to B axis pos: ',
                'Z': ' to Z axis pos: $val',
                'X': ' to X axis pos: $val'
            }
        },
        'G131': {
            'content': 'G131',
            'description': 'Remove offset',
            'parameters': {}
        },
        'G132': {
            'content': 'G132',
            'description': 'Calibrate endstop offsets',
            'parameters': {}
        },
        'G133': {
            'content': 'G133',
            'description': 'Measure steps to top',
            'parameters': {}
        },
        'G161': {
            'content': 'G161',
            'description': 'Home axes to minimum',
            'parameters': {
                'Y': ' flag to home Y axis to min ',
                'X': ' flag to home X axis to min ',
                'Z': ' flag to home Z axis to min ',
                'F': ' desired feedrate: '
            }
        },
        'G162': {
            'content': 'G162',
            'description': 'Home axes to maximum',
            'parameters': {
                'Y': ' flag to home Y axis to max ',
                'X': ' flag to home X axis to max ',
                'Z': ' flag to home Z axis to max ',
                'F': ' desired feedrate: '
            }
        },
        'M0': {
            'content': 'M0',
            'description': 'Stop',
            'parameters': {
                'P': ' wait time (in ms): $val',
                'S': ' wait time (in s): $val'
            }
        },
        'M1': {
            'content': 'M1',
            'description': 'Sleep',
            'parameters': {}
        },
        'M2': {
            'content': 'M2',
            'description': 'Program End',
            'parameters': {}
        },
        'M6': {
            'content': 'M6',
            'description': 'Tool change',
            'parameters': {}
        },
        'M17': {
            'content': 'M17',
            'description': 'Enable/Power all stepper motors',
            'parameters': {}
        },
        'M18': {
            'content': 'M18',
            'description': 'Disable all stepper motors',
            'parameters': {
                'Y': ' Y axis: ',
                'X': ' X axis: ',
                'Z': ' Z axis: ',
                'E': ' extruder drive(s): '
            }
        },
        'M20': {
            'content': 'M20',
            'description': 'List SD card',
            'parameters': {
                'P': ' directory to list: ',
                'S': ' output style: '
            }
        },
        'M21': {
            'content': 'M21',
            'description': 'Initialize SD card',
            'parameters': {
                'P': ' SD card #: '
            }
        },
        'M22': {
            'content': 'M22',
            'description': 'Release SD card',
            'parameters': {
                'P': ' SD card #: '
            }
        },
        'M23': {
            'content': 'M23',
            'description': 'Select SD file',
            'parameters': {}
        },
        'M24': {
            'content': 'M24',
            'description': 'Start/resume SD print',
            'parameters': {}
        },
        'M25': {
            'content': 'M25',
            'description': 'Pause SD print',
            'parameters': {}
        },
        'M26': {
            'content': 'M26',
            'description': 'Set SD position',
            'parameters': {
                'S': ' file pos (in bytes): '
            }
        },
        'M27': {
            'content': 'M27',
            'description': 'Report SD print status',
            'parameters': {}
        },
        'M28': {
            'content': 'M28',
            'description': 'Begin write to SD card',
            'parameters': {}
        },
        'M29': {
            'content': 'M29',
            'description': 'Stop writing to SD card',
            'parameters': {}
        },
        'M30': {
            'content': 'M30',
            'description': 'Delete a file on the SD card',
            'parameters': {}
        },
        'M31': {
            'content': 'M31',
            'description': 'Output time since last M109 or SD card start to serial',
            'parameters': {}
        },
        'M32': {
            'content': 'M32',
            'description': 'Select file and start SD print',
            'parameters': {}
        },
        'M33': {
            'content': 'M33',
            'description': 'Get the long name for an SD card file or folder/Stop and Close File and save restart.gcode',
            'parameters': {}
        },
        'M34': {
            'content': 'M34',
            'description': 'Set SD file sorting options',
            'parameters': {}
        },
        'M35': {
            'content': 'M35',
            'description': 'Upload firmware NEXTION from SD',
            'parameters': {}
        },
        'M36': {
            'content': 'M36',
            'description': 'Return file information',
            'parameters': {}
        },
        'M37': {
            'content': 'M37',
            'description': 'Simulation mode',
            'parameters': {
                'S': ' toggle mode ( S1 enters, S0 leaves) '
            }
        },
        'M38': {
            'content': 'M38',
            'description': 'Compute SHA1 hash of target file',
            'parameters': {}
        },
        'M40': {
            'content': 'M40',
            'description': 'Eject',
            'parameters': {}
        },
        'M41': {
            'content': 'M41',
            'description': 'Loop',
            'parameters': {}
        },
        'M42': {
            'content': 'M42',
            'description': 'Switch I/O pin',
            'parameters': {
                'P': ' pin #: ',
                'S': ' pin value: '
            }
        },
        'M43': {
            'content': 'M43',
            'description': 'Stand by on material exhausted/Pin report and debug',
            'parameters': {
                'I': ' flag to ignore pin protection: ',
                'P': ' pin to read or watch: ',
                'E': ' toggle background endstop monitoring: ',
                'W': ' watch pins: '
            }
        },
        'M48': {
            'content': 'M48',
            'description': 'Measure Z-Probe repeatability',
            'parameters': {
                'E': ' engage ',
                'L': ' legs of travel: ',
                'P': ' # of points: ',
                'S': ' schizoid ',
                'V': ' verbosity: ',
                'Y': ' pos on the Y axis: ',
                'X': ' pos on the X axis: '
            }
        },
        'M70': {
            'content': 'M70',
            'description': 'Display message',
            'parameters': {}
        },
        'M72': {
            'content': 'M72',
            'description': 'Play a tone or song',
            'parameters': {
                'P': ' song ID: '
            }
        },
        'M73': {
            'content': 'M73',
            'description': 'Set build percentage',
            'parameters': {
                'P': ' percentage: '
            }
        },
        'M80': {
            'content': 'M80',
            'description': 'ATX Power On',
            'parameters': {}
        },
        'M81': {
            'content': 'M81',
            'description': 'ATX Power Off',
            'parameters': {}
        },
        'M82': {
            'content': 'M82',
            'description': 'Set extruder to absolute mode',
            'parameters': {}
        },
        'M83': {
            'content': 'M83',
            'description': 'Set extruder to relative mode',
            'parameters': {}
        },
        'M84': {
            'content': 'M84',
            'description': 'Stop idle hold',
            'parameters': {
                'I': ' reset flags: '
            }
        },
        'M85': {
            'content': 'M85',
            'description': 'Set inactivity shutdown timer',
            'parameters': {
                'S': ' seconds: '
            }
        },
        'M92': {
            'content': 'M92',
            'description': 'Set axis_steps_per_unit',
            'parameters': {
                'Y': ' Y drive: ',
                'X': ' X drive: ',
                'Z': ' Z drive: ',
                'E': ' extruder drive(s): '
            }
        },
        'M93': {
            'content': 'M93',
            'description': 'Send axis_steps_per_unit',
            'parameters': {}
        },
        'M98': {
            'content': 'M98',
            'description': 'Call Macro/Subprogram/Get axis_hysteresis_mm',
            'parameters': {
                'P': ' line #: '
            }
        },
        'M99': {
            'content': 'M99',
            'description': 'Return from Macro/Subprogram/Set axis_hysteresis_mm',
            'parameters': {}
        },
        'M101': {
            'content': 'M101',
            'description': 'Turn extruder 1 on (Forward), Undo Retraction',
            'parameters': {}
        },
        'M102': {
            'content': 'M102',
            'description': 'Turn extruder 1 on (Reverse)',
            'parameters': {}
        },
        'M103': {
            'content': 'M103',
            'description': 'Turn all extruders off, Extruder Retraction',
            'parameters': {}
        },
        'M104': {
            'content': 'M104',
            'description': 'Set Extruder Temperature',
            'parameters': {
                'S': ' target temperature: '
            }
        },
        'M105': {
            'content': 'M105',
            'description': 'Get Extruder Temperature',
            'parameters': {
                'S': ' response type: ',
                'R': ' response sequence #: '
            }
        },
        'M106': {
            'content': 'M106',
            'description': 'Fan On',
            'parameters': {
                'B': ' blip time: ',
                'F': ' frequency (in Hz): ',
                'I': ' disable fan: ',
                'H': ' select heaters: ',
                'L': ' min fan speed: ',
                'P': ' fan #: ',
                'S': ' fan speed: ',
                'R': ' restore speed: ',
                'T': ' set thermostatic mode: '
            }
        },
        'M107': {
            'content': 'M107',
            'description': 'Fan Off',
            'parameters': {}
        },
        'M108': {
            'content': 'M108',
            'description': 'Cancel Heating/Set Extruder Speed',
            'parameters': {}
        },
        'M109': {
            'content': 'M109',
            'description': 'Set Extruder Temperature and Wait',
            'parameters': {
                'S': ' min target temp: ',
                'R': ' max/accurate target temp: '
            }
        },
        'M110': {
            'content': 'M110',
            'description': 'Set Current Line Number',
            'parameters': {}
        },
        'M111': {
            'content': 'M111',
            'description': 'Set Debug Level',
            'parameters': {
                'P': ' debug module: ',
                'S': ' debug on/off: '
            }
        },
        'M112': {
            'content': 'M112',
            'description': 'Emergency Stop',
            'parameters': {}
        },
        'M113': {
            'content': 'M113',
            'description': 'Set Extruder PWM',
            'parameters': {
                'S': ' value to set: '
            }
        },
        'M114': {
            'content': 'M114',
            'description': 'Get Current Position',
            'parameters': {}
        },
        'M115': {
            'content': 'M115',
            'description': 'Get Firmware Version and Capabilities',
            'parameters': {
                'P': ' electronics type: '
            }
        },
        'M116': {
            'content': 'M116',
            'description': 'Wait',
            'parameters': {
                'H': ' heater #: ',
                'C': ' chamber #: ',
                'P': ' tool #: '
            }
        },
        'M117': {
            'content': 'M117',
            'description': 'Get Zero Position',
            'parameters': {}
        },
        'M118': {
            'content': 'M118',
            'description': 'Display Message',
            'parameters': {}
        },
        'M119': {
            'content': 'M119',
            'description': 'Negotiate Features/Get Endstop Status',
            'parameters': {}
        },
        'M120': {
            'content': 'M120',
            'description': 'Push/Enable endstop detection',
            'parameters': {}
        },
        'M121': {
            'content': 'M121',
            'description': 'Pop/Disable endstop detection',
            'parameters': {}
        },
        'M122': {
            'content': 'M122',
            'description': 'Diagnose',
            'parameters': {}
        },
        'M123': {
            'content': 'M123',
            'description': 'Tachometer value',
            'parameters': {}
        },
        'M124': {
            'content': 'M124',
            'description': 'Immediate motor stop',
            'parameters': {}
        },
        'M126': {
            'content': 'M126',
            'description': 'Open Valve',
            'parameters': {
                'P': ' wait (in ms): ',
                'T': ' toolhead: '
            }
        },
        'M127': {
            'content': 'M127',
            'description': 'Close Valve',
            'parameters': {
                'P': ' wait (in ms): ',
                'T': ' toolhead: '
            }
        },
        'M128': {
            'content': 'M128',
            'description': 'Extruder Pressure PWM',
            'parameters': {
                'S': ' pressure: '
            }
        },
        'M129': {
            'content': 'M129',
            'description': 'Extruder pressure off',
            'parameters': {
                'P': ' wait (in ms): '
            }
        },
        'M130': {
            'content': 'M130',
            'description': 'Set PID P value',
            'parameters': {
                'P': ' heater #: ',
                'S': ' proportional (Kp): '
            }
        },
        'M131': {
            'content': 'M131',
            'description': 'Set PID I value',
            'parameters': {
                'P': ' heater #: ',
                'S': ' integral (Ki): '
            }
        },
        'M132': {
            'content': 'M132',
            'description': 'Set PID D value',
            'parameters': {
                'A': ' A axis offset: ',
                'B': ' B axis offset: ',
                'P': ' heater #: ',
                'S': ' derivative (Kd): ',
                'Y': ' Y axis offset: ',
                'X': ' X axis offset: ',
                'Z': ' Z axis offset: '
            }
        },
        'M133': {
            'content': 'M133',
            'description': 'Set PID I limit value',
            'parameters': {
                'P': ' heater #/wait time: ',
                'S': ' integral limit (Ki): ',
                'T': ' extruder to wait for: '
            }
        },
        'M134': {
            'content': 'M134',
            'description': 'Write PID values to EEPROM',
            'parameters': {
                'P': ' time limit: ',
                'T': ' platform to wait for: '
            }
        },
        'M135': {
            'content': 'M135',
            'description': 'Set PID sample interval',
            'parameters': {
                'S': ' heat sample time (in s): ',
                'T': ' toolhead change: '
            }
        },
        'M136': {
            'content': 'M136',
            'description': 'Print PID settings to host',
            'parameters': {}
        },
        'M140': {
            'content': 'M140',
            'description': 'Set Bed Temperature (Fast)',
            'parameters': {
                'H': ' heater #: ',
                'S': ' target temperature: '
            }
        },
        'M141': {
            'content': 'M141',
            'description': 'Set Chamber Temperature (Fast)',
            'parameters': {
                'H': ' heater #: ',
                'S': ' target temperature: '
            }
        },
        'M142': {
            'content': 'M142',
            'description': 'Holding Pressure',
            'parameters': {
                'S': ' holding pressure of the bed: '
            }
        },
        'M143': {
            'content': 'M143',
            'description': 'Max heater temperature',
            'parameters': {
                'H': ' heater #: ',
                'S': ' max temp: '
            }
        },
        'M144': {
            'content': 'M144',
            'description': 'Bed Standby',
            'parameters': {}
        },
        'M146': {
            'content': 'M146',
            'description': 'Set Chamber Humidity',
            'parameters': {
                'R': ' relative humidity (in percent): '
            }
        },
        'M149': {
            'content': 'M149',
            'description': 'Set temperature units',
            'parameters': {
                'C': ' Flag to treat temperature as Celsius ',
                'K': ' Flag to treat temperature as Kelvin '
            }
        },
        'M150': {
            'content': 'M150',
            'description': 'Set display color',
            'parameters': {
                'R': ' red: ',
                'B': ' blue: ',
                'U': ' green: '
            }
        },
        'M155': {
            'content': 'M155',
            'description': 'Automatically send temperatures',
            'parameters': {
                'S': ' enable(1)/disable(0): '
            }
        },
        'M160': {
            'content': 'M160',
            'description': 'Number of mixed materials',
            'parameters': {
                'S': ' # of materials: '
            }
        },
        'M163': {
            'content': 'M163',
            'description': 'Set weight of mixed material',
            'parameters': {
                'P': ' weight: ',
                'S': ' extruder #: '
            }
        },
        'M164': {
            'content': 'M164',
            'description': 'Store weights',
            'parameters': {
                'P': ' store to eeprom (P0 = no, P1 = yes): ',
                'S': ' virtual extruder#: '
            }
        },
        'M165': {
            'content': 'M165',
            'description': 'Set multiple mix weights',
            'parameters': {
                'A': ' mix factor for extruder stepper 1: ',
                'C': ' mix factor for extruder stepper 3: ',
                'B': ' mix factor for extruder stepper 2: ',
                'D': ' mix factor for extruder stepper 4: ',
                'I': ' mix factor for extruder stepper 6: ',
                'H': ' mix factor for extruder stepper 5: '
            }
        },
        'M190': {
            'content': 'M190',
            'description': 'Wait for bed temp to reach target temp',
            'parameters': {
                'S': ' min target temperature: ',
                'R': ' accurate target temperature: '
            }
        },
        'M191': {
            'content': 'M191',
            'description': 'Wait for chamber temp to reach target temp',
            'parameters': {
                'S': ' min target temperature: ',
                'R': ' accurate target temperature: '
            }
        },
        'M200': {
            'content': 'M200',
            'description': 'Set filament diameter',
            'parameters': {
                'D': ' filament diameter (in mm): '
            }
        },
        'M201': {
            'content': 'M201',
            'description': 'Set max printing acceleration',
            'parameters': {
                'Y': ' acceleration for Y axis: ',
                'X': ' acceleration for X axis: ',
                'Z': ' acceleration for Z axis: ',
                'E': ' acceleration for extruder drives: '
            }
        },
        'M202': {
            'content': 'M202',
            'description': 'Set max travel acceleration',
            'parameters': {
                'Y': ' travel moves (in units/s^2): ',
                'X': ' travel moves (in units/s^2): '
            }
        },
        'M203': {
            'content': 'M203',
            'description': 'Set maximum feedrate',
            'parameters': {
                'Y': ' max for Y axis: ',
                'X': ' max for X axis: ',
                'Z': ' max for Z axis: ',
                'E': ' max for extruder drives: '
            }
        },
        'M204': {
            'content': 'M204',
            'description': 'Set default acceleration',
            'parameters': {
                'P': ' printing moves: ',
                'T': '  travel moves: '
            }
        },
        'M205': {
            'content': 'M205',
            'description': 'Advanced settings',
            'parameters': {
                'B': ' min segment time: ',
                'E': ' max E jerk: ',
                'S': ' min travel speed/min planner speed: ',
                'T': ' travel only ',
                'X': ' max xy jerk/xy junction deviation: ',
                'Z': ' max Z jerk/z junction deviation: '
            }
        },
        'M206': {
            'content': 'M206',
            'description': 'Offset axes/Set eeprom value',
            'parameters': {
                'P': ' pos: ',
                'S': ' int (long): ',
                'T': ' type: ',
                'Y': ' Y axis offset: ',
                'X': ' X axis offset/float: ',
                'Z': ' Z axis offset: '
            }
        },
        'M207': {
            'content': 'M207',
            'description': 'Calibrate z axis/Set retract length',
            'parameters': {
                'S': ' positive length to retract (in mm): ',
                'R': ' positive or negative additional length to un-retract (in mm): ',
                'T': ' feedrate for un-retraction if different from retraction (in mm/min): ',
                'Z': ' additional zlift/hop: ',
                'F': ' retraction feedrate (in mm/min): '
            }
        },
        'M208': {
            'content': 'M208',
            'description': 'Set axis max travel/Set unretract length',
            'parameters': {
                'Y': ' Y axis limit: ',
                'X': ' X axis limit: ',
                'S': ' toggle set the axis min/positive length surplus to the M207: ',
                'Z': ' Z axis limit: ',
                'F': ' feedrate (in mm/sec): '
            }
        },
        'M209': {
            'content': 'M209',
            'description': 'Enable automatic retract',
            'parameters': {
                'S': ' 1=true or 0=false: '
            }
        },
        'M210': {
            'content': 'M210',
            'description': 'Set homing feedrates',
            'parameters': {
                'Y': ' in mm per minute: ',
                'X': ' in mm per minute: '
            }
        },
        'M211': {
            'content': 'M211',
            'description': 'Disable/Enable software endstops',
            'parameters': {
                'Y': ' 1=max endstop or 0=min endstop: ',
                'X': ' 1=max endstop or 0=min endstop: ',
                'S': ' 1=enable or 0=disable: ',
                'Z': ' 1=max endstop or 0=min endstop: '
            }
        },
        'M212': {
            'content': 'M212',
            'description': 'Set Bed Level Sensor Offset',
            'parameters': {
                'Z': ' Z home: '
            }
        },
        'M218': {
            'content': 'M218',
            'description': 'Set Hotend Offset',
            'parameters': {
                'Y': ' offset on Y: ',
                'X': ' offset on X: ',
                'T': ' extruder #: '
            }
        },
        'M220': {
            'content': 'M220',
            'description': 'Set speed factor override percentage/Turn off AUX V1.0.5',
            'parameters': {
                'S': ' percentage: '
            }
        },
        'M221': {
            'content': 'M221',
            'description': 'Set extrude factor override percentage/Turn on AUX V1.0.5',
            'parameters': {
                'S': ' percentage: ',
                'D': ' drive #: '
            }
        },
        'M222': {
            'content': 'M222',
            'description': 'Set speed of fast XY moves',
            'parameters': {}
        },
        'M223': {
            'content': 'M223',
            'description': 'Set speed of fast Z moves',
            'parameters': {}
        },
        'M224': {
            'content': 'M224',
            'description': 'Enable extruder during fast moves',
            'parameters': {}
        },
        'M225': {
            'content': 'M225',
            'description': 'Disable on extruder during fast moves',
            'parameters': {}
        },
        'M226': {
            'content': 'M226',
            'description': 'Gcode Initiated Pause/Wait for pin state',
            'parameters': {
                'P': ' pin #: ',
                'S': ' pin state: '
            }
        },
        'M227': {
            'content': 'M227',
            'description': 'Enable Automatic Reverse and Prime',
            'parameters': {
                'P': ' steps: ',
                'S': ' steps: '
            }
        },
        'M228': {
            'content': 'M228',
            'description': 'Disable Automatic Reverse and Prime',
            'parameters': {}
        },
        'M229': {
            'content': 'M229',
            'description': 'Enable Automatic Reverse and Prime',
            'parameters': {
                'P': ' extruder screw rotation: ',
                'S': ' extruder screw rotation: '
            }
        },
        'M230': {
            'content': 'M230',
            'description': ' Disable/Enable Wait for Temperature Change',
            'parameters': {
                'S': ' 1=disable or 0=enable: '
            }
        },
        'M231': {
            'content': 'M231',
            'description': 'Set OPS parameter',
            'parameters': {
                'Y': ' retract: ',
                'X': ' min distance: ',
                'S': ' OPS_MODE: ',
                'Z': ' backslash: ',
                'F': ' ReatrctMove: '
            }
        },
        'M232': {
            'content': 'M232',
            'description': 'Read and reset max. advance values',
            'parameters': {}
        },
        'M240': {
            'content': 'M240',
            'description': 'Trigger camera/Start conveyor belt motor/Echo off',
            'parameters': {}
        },
        'M241': {
            'content': 'M241',
            'description': 'Stop conveyor belt motor/echo on',
            'parameters': {}
        },
        'M245': {
            'content': 'M245',
            'description': 'Start cooler',
            'parameters': {}
        },
        'M246': {
            'content': 'M246',
            'description': 'Stop cooler',
            'parameters': {}
        },
        'M250': {
            'content': 'M250',
            'description': 'Set LCD contrast',
            'parameters': {
                'C': ' contrast value: '
            }
        },
        'M251': {
            'content': 'M251',
            'description': 'Measure Z steps from homing stop',
            'parameters': {
                'S': ' 0 =Reset, 1=Print, 2=Store to Z length: '
            }
        },
        'M260': {
            'content': 'M260',
            'description': 'i2c Send Data',
            'parameters': {
                'A': '  address: ',
                'S': '  send and reset buffer ',
                'B': '  add to buffer: '
            }
        },
        'M261': {
            'content': 'M261',
            'description': 'i2c Request Data',
            'parameters': {
                'A': '  address: ',
                'B': '  bytes: '
            }
        },
        'M280': {
            'content': 'M280',
            'description': 'Set servo position',
            'parameters': {
                'I': ' 1=invert polarity: ',
                'P': ' servo index: ',
                'S': ' angle or microseconds: '
            }
        },
        'M290': {
            'content': 'M290',
            'description': 'Baby stepping',
            'parameters': {
                'S': ' amount (in mm): '
            }
        },
        'M300': {
            'content': 'M300',
            'description': 'Play beep sound',
            'parameters': {
                'P': ' duration (in ms) ',
                'S': ' frequency (in Hz) '
            }
        },
        'M301': {
            'content': 'M301',
            'description': 'Set PID parameters',
            'parameters': {
                'E': ' heater #: ',
                'D': ' derivative (Kd): ',
                'I': ' integral (Ki): ',
                'H': ' heater #: ',
                'P': ' proportional (Kp): ',
                'S': ' heater #: '
            }
        },
        'M302': {
            'content': 'M302',
            'description': 'Allow cold extrudes',
            'parameters': {
                'P': ' allow state: ',
                'S': ' min temp: '
            }
        },
        'M303': {
            'content': 'M303',
            'description': 'Run PID tuning',
            'parameters': {
                'C': ' cycles: ',
                'S': ' temperature: '
            }
        },
        'M304': {
            'content': 'M304',
            'description': 'Set PID parameters-Bed',
            'parameters': {
                'I': ' integral (Ki): ',
                'P': ' proportional (Kp): ',
                'D': ' derivative (Kd): '
            }
        },
        'M305': {
            'content': 'M305',
            'description': 'Set thermistor and ADC parameters',
            'parameters': {
                'C': ' Steinhart-Hart C coefficient: ',
                'B': ' beta value: ',
                'H': ' ADC high offset: ',
                'L': ' ADC low offset: ',
                'P': ' heater #: ',
                'R': ' series resistor value: ',
                'T': ' thermistor resistance at 25C: ',
                'X': ' heater ADC channel: '
            }
        },
        'M306': {
            'content': 'M306',
            'description': 'Set home offset calculated',
            'parameters': {}
        },
        'M307': {
            'content': 'M307',
            'description': 'Set or report heating process parameters',
            'parameters': {
                'A': ' gAin: ',
                'C': ' dominant time (in s): ',
                'B': ' Bang-bang control: ',
                'D': ' dead time (in s): ',
                'H': ' heater #: ',
                'S': ' max PWM: '
            }
        },
        'M320': {
            'content': 'M320',
            'description': 'Activate autolevel',
            'parameters': {
                'S': ' >0 activate and store persistently in EEPROM: '
            }
        },
        'M321': {
            'content': 'M321',
            'description': 'Deactivate autolevel',
            'parameters': {
                'S': ' >0 deactivate and store persistently in EEPROM: '
            }
        },
        'M322': {
            'content': 'M322',
            'description': 'Reset autolevel matrix',
            'parameters': {
                'S': ' >0 also reset the matrix values saved EEPROM: '
            }
        },
        'M323': {
            'content': 'M323',
            'description': 'Distortion correction on/off',
            'parameters': {
                'P': ' 1=store correction state persistently in EEPROM: ',
                'S': ' 0=disable,1=enable: '
            }
        },
        'M340': {
            'content': 'M340',
            'description': 'Control the servos',
            'parameters': {
                'P': ' servoId: ',
                'S': ' pulseInUS: '
            }
        },
        'M350': {
            'content': 'M350',
            'description': 'Set microstepping mode',
            'parameters': {
                'B': ' extruder 1: ',
                'E': ' extruder 0: ',
                'I': ' enable (nn=1) or disable (nn=0) interpolation: ',
                'S': ' all drivers: ',
                'Y': ' Y axis: ',
                'X': ' X axis: ',
                'Z': ' Z axis: '
            }
        },
        'M351': {
            'content': 'M351',
            'description': 'Toggle MS1 MS2 pins directly',
            'parameters': {}
        },
        'M355': {
            'content': 'M355',
            'description': 'Turn case lights on/off',
            'parameters': {
                'S': ' 1=enable,0=disable: '
            }
        },
        'M360': {
            'content': 'M360',
            'description': 'Report firmware configuration/Move to Theta 0 degree pos',
            'parameters': {}
        },
        'M361': {
            'content': 'M361',
            'description': 'Move to Theta 90 degree position',
            'parameters': {}
        },
        'M362': {
            'content': 'M362',
            'description': 'Move to Psi 0 degree position',
            'parameters': {}
        },
        'M363': {
            'content': 'M363',
            'description': 'Move to Psi 90 degree position',
            'parameters': {}
        },
        'M364': {
            'content': 'M364',
            'description': 'Move to Psi + Theta 90 degree position',
            'parameters': {}
        },
        'M365': {
            'content': 'M365',
            'description': 'SCARA scaling factor',
            'parameters': {
                'Y': ' Y scaling: ',
                'X': ' X scaling: ',
                'Z': ' Z scaling: '
            }
        },
        'M366': {
            'content': 'M366',
            'description': 'SCARA convert trim',
            'parameters': {}
        },
        'M370': {
            'content': 'M370',
            'description': 'Morgan manual bed level-clear map',
            'parameters': {
                'X': ' divisions: '
            }
        },
        'M371': {
            'content': 'M371',
            'description': 'Move to next calibration position',
            'parameters': {}
        },
        'M372': {
            'content': 'M372',
            'description': 'Record calibration value and move to next position',
            'parameters': {}
        },
        'M373': {
            'content': 'M373',
            'description': 'End bed level calibration mode',
            'parameters': {}
        },
        'M374': {
            'content': 'M374',
            'description': 'Save calibration grid',
            'parameters': {
                'Z': ' save M206 Z homing offset into the grid file '
            }
        },
        'M375': {
            'content': 'M375',
            'description': 'Display matrix/Load Matrix',
            'parameters': {}
        },
        'M376': {
            'content': 'M376',
            'description': 'Set bed compensation taper',
            'parameters': {
                'H': ' height (in mm): '
            }
        },
        'M380': {
            'content': 'M380',
            'description': 'Activate solenoid',
            'parameters': {}
        },
        'M381': {
            'content': 'M381',
            'description': 'Disable all solenoids',
            'parameters': {}
        },
        'M400': {
            'content': 'M400',
            'description': 'Wait for current moves to finish',
            'parameters': {}
        },
        'M401': {
            'content': 'M401',
            'description': 'Lower z-probe',
            'parameters': {}
        },
        'M402': {
            'content': 'M402',
            'description': 'Raise z-probe',
            'parameters': {}
        },
        'M404': {
            'content': 'M404',
            'description': 'Filament width and nozzle diameter',
            'parameters': {
                'D': ' nozzle diameter (in mm): '
            }
        },
        'M405': {
            'content': 'M405',
            'description': 'Filament Sensor on',
            'parameters': {}
        },
        'M406': {
            'content': 'M406',
            'description': 'Filament Sensor off',
            'parameters': {}
        },
        'M407': {
            'content': 'M407',
            'description': 'Display filament diameter',
            'parameters': {}
        },
        'M408': {
            'content': 'M408',
            'description': 'Report JSON-style response',
            'parameters': {
                'S': ' response type: ',
                'R': ' response sequence #: '
            }
        },
        'M420': {
            'content': 'M420',
            'description': 'Set RGB Colors as PWM/Enable/Disable Mesh Leveling',
            'parameters': {
                'R': ' red PWM: ',
                'S': ' 1=enable,0=disable: ',
                'B': ' blue PWM: ',
                'E': ' green PWM: '
            }
        },
        'M421': {
            'content': 'M421',
            'description': 'Set a Mesh Bed Leveling Z coordinate',
            'parameters': {
                'Y': ' index: ',
                'X': ' index: ',
                'Z': ' offset (in mm): '
            }
        },
        'M450': {
            'content': 'M450',
            'description': 'Report Printer Mode',
            'parameters': {}
        },
        'M451': {
            'content': 'M451',
            'description': 'Select FFF Printer Mode',
            'parameters': {}
        },
        'M452': {
            'content': 'M452',
            'description': 'Select Laser Printer Mode',
            'parameters': {}
        },
        'M453': {
            'content': 'M453',
            'description': 'Select CNC Printer Mode',
            'parameters': {}
        },
        'M460': {
            'content': 'M460',
            'description': ' Define temperature range for thermistor controlled fan',
            'parameters': {
                'Y': ' max temp: ',
                'X': ' min temp: '
            }
        },
        'M500': {
            'content': 'M500',
            'description': 'Store parameters in EEPROM',
            'parameters': {}
        },
        'M501': {
            'content': 'M501',
            'description': 'Read parameters from EEPROM',
            'parameters': {
                'S': ' enable auto-save: '
            }
        },
        'M502': {
            'content': 'M502',
            'description': 'Revert to the default factory settings',
            'parameters': {}
        },
        'M503': {
            'content': 'M503',
            'description': 'Print settings',
            'parameters': {}
        },
        'M530': {
            'content': 'M530',
            'description': 'Enable printing mode',
            'parameters': {
                'S': ' 1=started, 0=ended: ',
                'L': ' # of layers: '
            }
        },
        'M531': {
            'content': 'M531',
            'description': 'Set print name',
            'parameters': {}
        },
        'M532': {
            'content': 'M532',
            'description': 'Set print progress',
            'parameters': {
                'X': ' print progress: ',
                'L': ' printed layer: '
            }
        },
        'M540': {
            'content': 'M540',
            'description': 'Enable/Disable Stop SD Print on Endstop Hit/Set MAC address',
            'parameters': {
                'P': ' MAC address: ',
                'S': ' 1=enable, 0=disable: '
            }
        },
        'M550': {
            'content': 'M550',
            'description': 'Set Name',
            'parameters': {
                'P': ' machine name: '
            }
        },
        'M551': {
            'content': 'M551',
            'description': 'Set Password',
            'parameters': {
                'P': ' password: '
            }
        },
        'M552': {
            'content': 'M552',
            'description': 'Set IP address, enable/disable network interface',
            'parameters': {
                'P': ' IP address: ',
                'S': ' disable/enable networking: ',
                'R': ' HTTP port: '
            }
        },
        'M553': {
            'content': 'M553',
            'description': 'Set Netmask',
            'parameters': {
                'P': ' net mask: '
            }
        },
        'M554': {
            'content': 'M554',
            'description': 'Set Gateway',
            'parameters': {
                'P': ' gateway: '
            }
        },
        'M555': {
            'content': 'M555',
            'description': 'Set compatibility',
            'parameters': {
                'P': ' emulation type: '
            }
        },
        'M556': {
            'content': 'M556',
            'description': 'Axis compensation',
            'parameters': {
                'Y': ' deviation in Y: ',
                'X': ' deviation in X: ',
                'S': ' height of distances: ',
                'Z': ' deviation in Z: '
            }
        },
        'M557': {
            'content': 'M557',
            'description': 'Set Z probe point or define probing grid',
            'parameters': {
                'Y': ' Y coordinate: ',
                'P': ' probe point #: ',
                'X': ' X coordinate: '
            }
        },
        'M558': {
            'content': 'M558',
            'description': 'Set Z probe type',
            'parameters': {
                'F': ' feed rate: $val',
                'I': ' invert (I1)/do not invert (I0) reading: ',
                'H': ' dive height (in mm): ',
                'P': ' Z probe type: ',
                'S': ' extra for experimentation: ',
                'R': ' recovery time: ',
                'T': ' travel speed: ',
                'Y': ' If nonzero, use probe for homing Y axis: ',
                'X': ' If nonzero, use probe for homing X axis: ',
                'Z': ' If nonzero, use probe for homing Z axis: '
            }
        },
        'M559': {
            'content': 'M559',
            'description': 'Upload configuration file',
            'parameters': {}
        },
        'M560': {
            'content': 'M560',
            'description': 'Upload web page file',
            'parameters': {}
        },
        'M561': {
            'content': 'M561',
            'description': 'Set Identity Transform',
            'parameters': {}
        },
        'M562': {
            'content': 'M562',
            'description': 'Reset temperature fault',
            'parameters': {
                'P': ' heater #: '
            }
        },
        'M563': {
            'content': 'M563',
            'description': '',
            'parameters': {}
        },
        'M564': {
            'content': 'M564',
            'description': '',
            'parameters': {}
        },
        'M565': {
            'content': 'M565',
            'description': '',
            'parameters': {}
        },
        'M566': {
            'content': 'M566',
            'description': '',
            'parameters': {}
        },
        'M567': {
            'content': 'M567',
            'description': '',
            'parameters': {}
        },
        'M568': {
            'content': 'M568',
            'description': '',
            'parameters': {}
        },
        'M569': {
            'content': 'M569',
            'description': '',
            'parameters': {}
        },
        'M570': {
            'content': 'M570',
            'description': '',
            'parameters': {}
        },
        'M571': {
            'content': 'M571',
            'description': '',
            'parameters': {}
        },
        'M572': {
            'content': 'M572',
            'description': '',
            'parameters': {}
        },
        'M573': {
            'content': 'M573',
            'description': '',
            'parameters': {}
        },
        'M574': {
            'content': 'M574',
            'description': '',
            'parameters': {}
        },
        'M575': {
            'content': 'M575',
            'description': '',
            'parameters': {}
        },
        'M577': {
            'content': 'M577',
            'description': '',
            'parameters': {}
        },
        'M578': {
            'content': 'M578',
            'description': '',
            'parameters': {}
        },
        'M579': {
            'content': 'M579',
            'description': '',
            'parameters': {}
        },
        'M580': {
            'content': 'M580',
            'description': '',
            'parameters': {}
        },
        'M581': {
            'content': 'M581',
            'description': '',
            'parameters': {}
        },
        'M582': {
            'content': 'M582',
            'description': '',
            'parameters': {}
        },
        'M583': {
            'content': 'M583',
            'description': '',
            'parameters': {}
        },
        'M584': {
            'content': 'M584',
            'description': '',
            'parameters': {}
        },
        'M585': {
            'content': 'M585',
            'description': '',
            'parameters': {}
        },
        'M586': {
            'content': 'M586',
            'description': '',
            'parameters': {}
        },
        'M587': {
            'content': 'M587',
            'description': '',
            'parameters': {}
        },
        'M588': {
            'content': 'M588',
            'description': '',
            'parameters': {}
        },
        'M589': {
            'content': 'M589',
            'description': '',
            'parameters': {}
        },
        'M590': {
            'content': 'M590',
            'description': '',
            'parameters': {}
        },
        'M600': {
            'content': 'M600',
            'description': '',
            'parameters': {}
        },
        'M605': {
            'content': 'M605',
            'description': '',
            'parameters': {}
        },
        'M665': {
            'content': 'M665',
            'description': '',
            'parameters': {}
        },
        'M666': {
            'content': 'M666',
            'description': '',
            'parameters': {}
        },
        'M667': {
            'content': 'M667',
            'description': '',
            'parameters': {}
        },
        'M668': {
            'content': 'M668',
            'description': '',
            'parameters': {}
        },
        'M700': {
            'content': 'M700',
            'description': '',
            'parameters': {}
        },
        'M701': {
            'content': 'M701',
            'description': '',
            'parameters': {}
        },
        'M702': {
            'content': 'M702',
            'description': '',
            'parameters': {}
        },
        'M703': {
            'content': 'M703',
            'description': '',
            'parameters': {}
        },
        'M710': {
            'content': 'M710',
            'description': '',
            'parameters': {}
        },
        'M750': {
            'content': 'M750',
            'description': '',
            'parameters': {}
        },
        'M751': {
            'content': 'M751',
            'description': '',
            'parameters': {}
        },
        'M752': {
            'content': 'M752',
            'description': '',
            'parameters': {}
        },
        'M753': {
            'content': 'M753',
            'description': '',
            'parameters': {}
        },
        'M754': {
            'content': 'M754',
            'description': '',
            'parameters': {}
        },
        'M755': {
            'content': 'M755',
            'description': '',
            'parameters': {}
        },
        'M756': {
            'content': 'M756',
            'description': '',
            'parameters': {}
        },
        'M800': {
            'content': 'M800',
            'description': '',
            'parameters': {}
        },
        'M801': {
            'content': 'M801',
            'description': '',
            'parameters': {}
        },
        'M851': {
            'content': 'M851',
            'description': '',
            'parameters': {}
        },
        'M905': {
            'content': 'M905',
            'description': '',
            'parameters': {}
        },
        'M906': {
            'content': 'M906',
            'description': '',
            'parameters': {}
        },
        'M907': {
            'content': 'M907',
            'description': '',
            'parameters': {}
        },
        'M908': {
            'content': 'M908',
            'description': '',
            'parameters': {}
        },
        'M909': {
            'content': 'M909',
            'description': '',
            'parameters': {}
        },
        'M910': {
            'content': 'M910',
            'description': '',
            'parameters': {}
        },
        'M911': {
            'content': 'M911',
            'description': '',
            'parameters': {}
        },
        'M912': {
            'content': 'M912',
            'description': '',
            'parameters': {}
        },
        'M913': {
            'content': 'M913',
            'description': '',
            'parameters': {}
        },
        'M928': {
            'content': 'M928',
            'description': '',
            'parameters': {}
        },
        'M997': {
            'content': 'M997',
            'description': '',
            'parameters': {}
        },
        'M998': {
            'content': 'M998',
            'description': '',
            'parameters': {}
        },
        'M999': {
            'content': 'M999',
            'description': '',
            'parameters': {}
        }
  };

  codeEditor.parseLine = function(gCodeLine) {
    if (gCodeLine=="") {
      return "";
    }

    var tokens = gCodeLine.split(/ +/);
    var commandName = "";
    var command;
    var parameters = {};
    var inComment = false;
    var tokenIndex = 0;
    var output = "";

    while (tokenIndex < tokens.length 
        && !command) {
        var token = tokens[tokenIndex];
        tokenIndex += 1;

        if (token in commandSpecs) {
            commandName = token;
            command = commandSpecs[commandName];
            parameters = command.parameters;

            output += command.description;
            if (Object.keys(parameters).length > 0) {
                output += " -";
            }
        }
        // #TODO: Handle comments
        //else if (isComment) {}
        else {
            return "COMMAND NOT FOUND: " + token;
        }
    }

    var usedParams = [];

    while(tokenIndex < tokens.length
        && command) {
        token = tokens[tokenIndex];
        tokenIndex += 1;
        // #TODO: Handle comments
        //if (isComment) {} else {

        var parameter = token.substring(0, 1);
        var argument = token.substring(1);

        if(parameter in parameters) {
            if(parameter in usedParams) {
                output += " Invalid Parameter \'" + parameter + "\': Parameters cannot be reused within the same command;";
            } else {
                usedParams.push(parameter);
                output += " " + (parameters[parameter].replace("$val", argument)) + ";";
            }
        } else {
            output += " Invalid parameter \'" + parameter + "\'. Valid parameters are " + Object.keys(parameters) + ";";
        }

        //}

    }
    return output;
  };

  codeEditor.interpretLine = function(gCodeLine) {
    return codeEditor.parseLine(gCodeLine);

    if (gCodeLine=="") {
      return "";
    }

    var common_comm = {
        "G0":"Move (rapid linear)",
        "G1":"Move (linear)",
        "G2":"Move (controlled clockwise arc)",
        "G3":"Move (controlled counter-clockwise arc)",
        "G4":"Dwell (pause)",
        "G6":"Move (direct stepper)",
        "G10":"Tool Offset/Retract",
        "G11":"Unretract",
        "G20":"Set Units to Inches",
        "G21":"Set Units to Millimeters",
        "G22":"Firmware controlled Retract",
        "G23":"Firmware controlled Unretract/Precharge",
        "G28":"Move to Origin",
        "G29":"Use Probe to level bed",
        "G29.1":"Set Z probe head offset",
        "G29.2":"Set Z probe head offset (from toolhead position)",
        "G30":"Probes bed at current XY location",
        "G31":"Set or Report Current Probe status/Dock Z Probe sled",
        "G32":"Probe Z and calculate Z plane/Undock Z Probe sled",
        "G33":"Measure/List/Adjust Distortion Matrix",
        "G60":"save current position to slot",
        "G61":"Apply/restore saved coordinates to the active extruder",
        "G90":"Set to Absolute Positioning",
        "G91":"Set to Relative Positioning",
        "G92":"Set Position",
        "G100":"Calibrate floor or rod radius",
        "G130":"Set digital potentiometer value",
        "G131":"Remove offset",
        "G132":"Calibrate endstop offsets",
        "G133":"Measure steps to top",
        "G161":"Home axes to minimum",
        "G162":"Home axes to maximum",

        "M0":"Stop",
        "M1":"Sleep",
        "M2":"Program End",
        "M6":"Tool change",
        "M17":"Enable/Power all stepper motors",
        "M18":"Disable all stepper motors",
        "M20":"List SD card",
        "M21":"Initialize SD card",
        "M22":"Release SD card",
        "M23":"Select SD file",
        "M24":"Start/resume SD print",
        "M25":"Pause SD print",
        "M26":"Set SD position",
        "M27":"Report SD print status",
        "M28":"Begin write to SD card",
        "M29":"Stop writing to SD card",
        "M30":"Delete a file on the SD card",
        "M31":"Output time since last M109 or SD card start to serial",
        "M32":"Select file and start SD print",
        "M33":"Get the long name for an SD card file or folder/Stop and Close File and save restart.gcode",
        "M34":"Set SD file sorting options",
        "M35":"Upload firmware NEXTION from SD",
        "M36":"Return file information",
        "M37":"Simulation mode",
        "M38":"Compute SHA1 hash of target file",
        "M40":"Eject",
        "M41":"Loop",
        "M42":"Switch I/O pin",
        "M43":"Stand by on material exhausted/Pin report and debug",
        "M48":"Measure Z-Probe repeatability",
        "M70":"Display message",
        "M72":"Play a tone or song",
        "M73":"Set build percentage",
        "M80":"ATX Power On",
        "M81":"ATX Power Off",
        "M82":"Set extruder to absolute mode",
        "M83":"Set extruder to relative mode",
        "M84":"Stop idle hold",
        "M85":"Set inactivity shutdown timer",
        "M92":"Set axis_steps_per_unit",
        "M93":"Send axis_steps_per_unit",
        "M98":"Call Macro/Subprogram/Get axis_hysteresis_mm",
        "M99":"Return from Macro/Subprogram/Set axis_hysteresis_mm",
        "M101":"Turn extruder 1 on (Forward), Undo Retraction",
        "M102":"Turn extruder 1 on (Reverse)",
        "M103":"Turn all extruders off, Extruder Retraction",
        "M104":"Set Extruder Temperature",
        "M105":"Get Extruder Temperature",
        "M106":"Fan On",
        "M107":"Fan Off",
        "M108":"Cancel Heating/Set Extruder Speed",
        "M109":"Set Extruder Temperature and Wait",
        "M110":"Set Current Line Number",
        "M111":"Set Debug Level",
        "M112":"Emergency Stop",
        "M113":"Set Extruder PWM",
        "M114":"Get Current Position",
        "M115":"Get Firmware Version and Capabilities",
        "M116":"Wait",
        "M117":"Get Zero Position",
        "M118":"Display Message",
        "M119":"Negotiate Features/Get Endstop Status" ,
        "M120":"Push/Enable endstop detection",
        "M121":"Pop/Disable endstop detection",
        "M122":"Diagnose",
        "M123":"Tachometer value",
        "M124":"Immediate motor stop",
        "M126":"Open Valve",
        "M127":"Close Valve",
        "M128":"Extruder Pressure PWM",
        "M129":"Extruder pressure off",
        "M130":"Set PID P value",
        "M131":"Set PID I value",
        "M132":"Set PID D value",
        "M133":"Set PID I limit value",
        "M134":"Write PID values to EEPROM",
        "M135":"Set PID sample interval",
        "M136":"Print PID settings to host",
        "M140":"Set Bed Temperature (Fast)",
        "M141":"Set Chamber Temperature (Fast)",
        "M142":"Holding Pressure",
        "M143":"Max heater temperature",
        "M144":"Bed Standby",
        "M146":"Set Chamber Humidity",
        "M149":"Set temperature units",
        "M150":"Set display color",
        "M155":"Automatically send temperatures",
        "M160":"Number of mixed materials",
        "M163":"Set weight of mixed material",
        "M164":"Store weights",
        "M165":"Set multiple mix weights",
        "M190":"Wait for bed temp to reach target temp",
        "M191":"Wait for chamber temp to reach target temp",
        "M200":"Set filament diameter",
        "M201":"Set max printing acceleration",
        "M202":"Set max travel acceleration",
        "M203":"Set maximum feedrate",
        "M204":"Set default acceleration",
        "M205":"Advanced settings",
        "M206":"Offset axes/Set eeprom value",
        "M207":"Calibrate z axis/Set retract length",
        "M208":"Set axis max travel/Set unretract length",
        "M209":"Enable automatic retract",
        "M210":"Set homing feedrates",
        "M211":"Disable/Enable software endstops",
        "M212":"Set Bed Level Sensor Offset",
        "M218":"Set Hotend Offset",
        "M220":"Set speed factor override percentage/Turn off AUX V1.0.5",
        "M221":"Set extrude factor override percentage/Turn on AUX V1.0.5",
        "M222":"Set speed of fast XY moves",
        "M223":"Set speed of fast Z moves",
        "M224":"Enable extruder during fast moves",
        "M225":"Disable on extruder during fast moves",
        "M226":"Gcode Initiated Pause/Wait for pin state",
        "M227":"Enable Automatic Reverse and Prime",
        "M228":"Disable Automatic Reverse and Prime",
        "M229":"Enable Automatic Reverse and Prime",
        "M230":" Disable/Enable Wait for Temperature Change",
        "M231":"Set OPS parameter",
        "M232":"Read and reset max. advance values",
        "M240":"Trigger camera/Start conveyor belt motor/Echo off",
        "M241":"Stop conveyor belt motor/echo on",
        "M245":"Start cooler",
        "M246":"Stop cooler",
        "M250":"Set LCD contrast",
        "M251":"Measure Z steps from homing stop",
        "M260":"i2c Send Data",
        "M261":"i2c Request Data",
        "M280":"Set servo position",
        "M290":"Baby stepping",
        "M300":"Play beep sound",
        "M301":"Set PID parameters",
        "M302":"Allow cold extrudes",
        "M303":"Run PID tuning",
        "M304":"Set PID parameters-Bed",
        "M305":"Set thermistor and ADC parameters",
        "M306":"Set home offset calculated",
        "M307":"Set or report heating process parameters",
        "M320":"Activate autolevel",
        "M321":"Deactivate autolevel",
        "M322":"Reset autolevel matrix",
        "M323":"Distortion correction on/off",
        "M340":"Control the servos",
        "M350":"Set microstepping mode",
        "M351":"Toggle MS1 MS2 pins directly",
        "M355":"Turn case lights on/off",
        "M360":"Report firmware configuration/Move to Theta 0 degree pos",
        "M361":"Move to Theta 90 degree position",
        "M362":"Move to Psi 0 degree position",
        "M363":"Move to Psi 90 degree position",
        "M364":"Move to Psi + Theta 90 degree position",
        "M365":"SCARA scaling factor",
        "M366":"SCARA convert trim",
        "M370":"Morgan manual bed level-clear map",
        "M371":"Move to next calibration position",
        "M372":"Record calibration value and move to next position",
        "M373":"End bed level calibration mode",
        "M374":"Save calibration grid",
        "M375":"Display matrix/Load Matrix",
        "M376":"Set bed compensation taper",
        "M380":"Activate solenoid",
        "M381":"Disable all solenoids",
        "M400":"Wait for current moves to finish",
        "M401":"Lower z-probe",
        "M402":"Raise z-probe",
        "M404":"Filament width and nozzle diameter",
        "M405":"Filament Sensor on",
        "M406":"Filament Sensor off",
        "M407":"Display filament diameter",
        "M408":"Report JSON-style response",
        "M420":"Set RGB Colors as PWM/Enable/Disable Mesh Leveling",
        "M421":"Set a Mesh Bed Leveling Z coordinate",
        "M450":"Report Printer Mode","M451":"Select FFF Printer Mode",
        "M452":"Select Laser Printer Mode",
        "M453":"Select CNC Printer Mode",
        "M460":" Define temperature range for thermistor controlled fan",
        "M500":"Store parameters in EEPROM",
        "M501":"Read parameters from EEPROM",
        "M502":"Revert to the default factory settings",
        "M503":"Print settings",
        "M530":"Enable printing mode",
        "M531":"Set print name",
        "M532":"Set print progress",
        "M540":"Enable/Disable Stop SD Print on Endstop Hit/Set MAC address",
        "M550":"Set Name",
        "M551":"Set Password",
        "M552":"Set IP address, enable/disable network interface",
        "M553":"Set Netmask",
        "M554":"Set Gateway",
        "M555":"Set compatibility",
        "M556":"Axis compensation",
        "M557":"Set Z probe point or define probing grid",
        "M558":"Set Z probe type",
        "M559":"Upload configuration file",
        "M560":"Upload web page file",
        "M561":"Set Identity Transform",
        "M562":"Reset temperature fault",
        "M563":"",
        "M564":"",
        "M565":"",
        "M566":"",
        "M567":"",
        "M568":"",
        "M569":"",
        "M570":"",
        "M571":"",
        "M572":"",
        "M573":"",
        "M574":"",
        "M575":"",
        "M577":"",
        "M578":"",
        "M579":"",
        "M580":"",
        "M581":"",
        "M582":"",
        "M583":"",
        "M584":"",
        "M585":"",
        "M586":"",
        "M587":"",
        "M588":"",
        "M589":"",
        "M590":"",
        "M600":"",
        "M605":"",
        "M665":"",
        "M666":"",
        "M667":"",
        "M668":"",
        "M700":"",
        "M701":"",
        "M702":"",
        "M703":"",
        "M710":"",
        "M750":"",
        "M751":"",
        "M752":"",
        "M753":"",
        "M754":"",
        "M755":"",
        "M756":"",
        "M800":"",
        "M801":"",
        "M851":"",
        "M905":"",
        "M906":"",
        "M907":"",
        "M908":"",
        "M909":"",
        "M910":"",
        "M911":"",
        "M912":"",
        "M913":"",
        "M928":"",
        "M997":"",
        "M998":"",
        "M999":""
     }; //TODO: finish above and below for the corresponding M commands

    var x_comm = {
        "G0":" to X axis pos: $val",
        "G1":" to X axis pos: $val",
        "G2":" to X axis pos: $val",
        "G3":" to X axis pos: $val",
        "G10":" X offset: ",
        "G28":" flag to go back to the X axis origin ",
        "G29.1":" X offset: ",
        "G30":" X coordinate: ",
        "G31":" probe X offset: ",
        "G33":" X correction: ",
        "G61":" X coordinate: ",
        "G92":" new X axis pos: ",
        "G100":" flag to set floor for X axis ",
        "G130":" to X axis pos: $val",
        "G161":" flag to home X axis to min ",
        "G162":" flag to home X axis to max ",

        "M18":" X axis: ",
        "M48":" pos on the X axis: ",
        "M92":" X drive: ",
        "M132":" X axis offset: ",
        "M201":" acceleration for X axis: ",
        "M202":" travel moves (in units/s^2): ",
        "M203":" max for X axis: ",
        "M205":" max xy jerk/xy junction deviation: ",
        "M206":" X axis offset/float: ",
        "M208":" X axis limit: ",
        "M210":" in mm per minute: ",
        "M211":" 1=max endstop or 0=min endstop: ",
        "M218":" offset on X: ",
        "M231":" min distance: ",
        "M305":" heater ADC channel: ",
        "M350":" X axis: ",
        "M365":" X scaling: ",
        "M370":" divisions: ",
        "M421":" index: ",
        "M460":" min temp: ",
        "M532":" print progress: ",
        "M556":" deviation in X: ",
        "M557":" X coordinate: ",
        "M558":" If nonzero, use probe for homing X axis: "
    };

    var y_comm = {
        "G0":" to Y axis pos: $val",
        "G1":" to Y axis pos: $val",
        "G2":" to Y axis pos: $val",
        "G3":" to Y axis pos: $val",
        "G10":" Y offset: ",
        "G28":" flag to go back to the Y axis origin ",
        "G29.1":" Y offset: ",
        "G30":" Y coordinate: ",
        "G31":" probe Y offset: ",
        "G33":" Y correction: ",
        "G61":" Y coordinate: ",
        "G92":" new Y axis pos: ",
        "G100":" flag to set floor for Y axis ",
        "G130":" to Y axis pos: $val",
        "G161":" flag to home Y axis to min ",
        "G162":" flag to home Y axis to max ",
        
        "M18":" Y axis: ",
        "M48":" pos on the Y axis: ",
        "M92":" Y drive: ",
        "M132":" Y axis offset: ",
        "M201":" acceleration for Y axis: ",
        "M202":" travel moves (in units/s^2): ",
        "M203":" max for Y axis: ",
        "M206":" Y axis offset: ",
        "M208":" Y axis limit: ",
        "M210":" in mm per minute: ",
        "M211":" 1=max endstop or 0=min endstop: ",
        "M218":" offset on Y: ",
        "M231":" retract: ",
        "M350":" Y axis: ",
        "M365":" Y scaling: ",
        "M421":" index: ",
        "M460":" max temp: ",
        "M556":" deviation in Y: ",
        "M557":" Y coordinate: ",
        "M558":" If nonzero, use probe for homing Y axis: "
    };

    var z_comm = {
        "G0":" to Z axis pos: $val",
        "G1":" to Z axis pos: $val",
        "G28":" flag to go back to the Z axis origin ",
        "G29.1":" Z offset: ",
        "G29.2":" Z offset: ",
        "G30":" Z coordinate: ",
        "G31":" trigger Z height: ",
        "G33":" Z correction: ",
        "G61":" Z coordinate: ",
        "G92":" new Z axis pos: ",
        "G100":" flag to set floor for Z axis ",
        "G130":" to Z axis pos: $val",
        "G161":" flag to home Z axis to min ",
        "G162":" flag to home Z axis to max ",
        
        "M18":" Z axis: ",
        "M92":" Z drive: ",
        "M132":" Z axis offset: ",
        "M201":" acceleration for Z axis: ",
        "M203":" max for Z axis: ",
        "M205":" max Z jerk/z junction deviation: ",
        "M206":" Z axis offset: ",
        "M207":" additional zlift/hop: ",
        "M208":" Z axis limit: ",
        "M211":" 1=max endstop or 0=min endstop: ",
        "M212":" Z home: ",
        "M231":" backslash: ",
        "M350":" Z axis: ",
        "M365":" Z scaling: ",
        "M374":" save M206 Z homing offset into the grid file ",
        "M421":" offset (in mm): ",
        "M556":" deviation in Z: ",
        "M558":" If nonzero, use probe for homing Z axis: "
    };

    var e_comm = {
        "G0":" extrude amount: ",
        "G1":" extrude amount: ",
        "G2":" extrude amount: ",
        "G3":" extrude amount: ",
        "G10":" Z offset: ",
        "G61":" E coordinate: ",
        "G92":" new extruder pos: ",
        
        "M18":" extruder drive(s): ",
        "M43":" toggle background endstop monitoring: ",
        "M48":" engage ",
        "M92":" extruder drive(s): ",
        "M201":" acceleration for extruder drives: ",
        "M203":" max for extruder drives: ",
        "M205":" max E jerk: ",
        "M301":" heater #: ",
        "M350":" extruder 0: ",
        "M420":" green PWM: "
    };

    var f_comm = {
        "G0":" feed rate: $val",
        "G1":" feed rate: $val",
        "G2":" feed rate: $val",
        "G3":" feed rate: $val",
        "G61":" F set feedrate: ",
        "G161":" desired feedrate: ",
        "G162":" desired feedrate: ",
        
        "M106":" frequency (in Hz): ",
        "M207":" retraction feedrate (in mm/min): ",
        "M208":" feedrate (in mm/sec): ",
        "M231":" ReatrctMove: ",
        "M558":" feed rate: $val"
    };

    var s_comm = {
        "G0":" endstop flag: $val",
        "G1":" endstop flag: $val",
        "G4": " wait time (in s): $val",
        "G10":" active temperature(s) or retract length: ",
        "G11":" retract length: ",
        "G29":" firmware-dependent behavior: ",
        "G30":" set parameter: ",
        "G31":" calibration temperature: ",
        "G32":" bed leveling method: ",
        "G60":" memory slot #: ",
        "G61":" memory slot #: ",
        
        "M0":" wait time (in s): $val",
        "M20":" output style: ",
        "M26":" file pos (in bytes): ",
        "M37":" toggle mode ( S1 enters, S0 leaves) ",
        "M42":" pin value: ",
        "M48":" schizoid ",
        "M85":" seconds: ",
        "M104":" target temperature: ",
        "M105":" response type: ",
        "M106":" fan speed: ",
        "M109":" min target temp: ",
        "M111":" debug on/off: ",
        "M113":" value to set: ",
        "M128":" pressure: ",
        "M130":" proportional (Kp): ",
        "M131":" integral (Ki): ",
        "M132":" derivative (Kd): ",
        "M133":" integral limit (Ki): ",
        "M135":" heat sample time (in s): ",
        "M140":" target temperature: ",
        "M141":" target temperature: ",
        "M142":" holding pressure of the bed: ",
        "M143":" max temp: ",
        "M155":" enable(1)/disable(0): ",
        "M160":" # of materials: ",
        "M163":" extruder #: ",
        "M164": " virtual extruder#: ",
        "M190":" min target temperature: ",
        "M191":" min target temperature: ",
        "M205":" min travel speed/min planner speed: ",
        "M206":" int (long): ",
        "M207":" positive length to retract (in mm): ",
        "M208":" toggle set the axis min/positive length surplus to the M207: ",
        "M209":" 1=true or 0=false: ",
        "M211":" 1=enable or 0=disable: ",
        "M220":" percentage: ",
        "M221":" percentage: ",
        "M226":" pin state: ",
        "M227":" steps: ",
        "M229":" extruder screw rotation: ",
        "M230":" 1=disable or 0=enable: ",
        "M231":" OPS_MODE: ",
        "M251":" 0 =Reset, 1=Print, 2=Store to Z length: ",
        "M260":"  send and reset buffer ",
        "M280":" angle or microseconds: ",
        "M290":" amount (in mm): ",
        "M300":" frequency (in Hz) ",
        "M301":" heater #: ",
        "M302":" min temp: ",
        "M303":" temperature: ",
        "M307":" max PWM: ",
        "M320":" >0 activate and store persistently in EEPROM: ",
        "M321":" >0 deactivate and store persistently in EEPROM: ",
        "M322":" >0 also reset the matrix values saved EEPROM: ",
        "M323":" 0=disable,1=enable: ",
        "M340":" pulseInUS: ",
        "M350":" all drivers: ",
        "M355":" 1=enable,0=disable: ",
        "M408":" response type: ",
        "M420":" 1=enable,0=disable: ",
        "M501":" enable auto-save: ",
        "M530":" 1=started, 0=ended: ",
        "M540":" 1=enable, 0=disable: ",
        "M552":" disable/enable networking: ",
        "M556":" height of distances: ",
        "M558":" extra for experimentation: "
    };

    var i_comm = {
        "G2":" distance to maintain from (X space): ",
        "G3":" distance to maintain from (X space): ",
        
        "M43":" flag to ignore pin protection: ",
        "M84":" reset flags: ",
        "M106":" disable fan: ",
        "M165": " mix factor for extruder stepper 6: ",
        "M280":" 1=invert polarity: ",
        "M301":" integral (Ki): ",
        "M304":" integral (Ki): ",
        "M350":" enable (nn=1) or disable (nn=0) interpolation: ",
        "M558":" invert (I1)/do not invert (I0) reading: "$val
    };

    var j_comm = {
        "G2":" distance to maintain from (Y space): $val",
        "G3":" distance to maintain from (Y space): $val"
    };

    var p_comm = {
        "G4": " wait time (in ms): ",
        "G10":" tool #: ",
        "G30":" probe point #: ",
        "G31":" trigger value: ",
        "G32":" bed correction method: ",
        
        "M0":" wait time (in ms): ",
        "M20":" directory to list: ",
        "M21":" SD card #: ",
        "M22":" SD card #: ",
        "M42":" pin #: ",
        "M43":" pin to read or watch: ",
        "M48":" # of points: ",
        "M72":" song ID: ",
        "M73":" percentage: ",
        "M98":" line #: ",
        "M106":" fan #: ",
        "M111":" debug module: ",
        "M115":" electronics type: ",
        "M116":" tool #: ",
        "M126":" wait (in ms): ",
        "M127":" wait (in ms): ",
        "M129":" wait (in ms): ",
        "M130":" heater #: ",
        "M131":" heater #: ",
        "M132":" heater #: ",
        "M133":" heater #/wait time: ",
        "M134":" time limit: ",
        "M163":" weight: ",
        "M164": " store to eeprom (P0 = no, P1 = yes): ",
        "M204":" printing moves: ",
        "M206":" pos: ",
        "M226":" pin #: ",
        "M227":" steps: ",
        "M229":" extruder screw rotation: ",
        "M280":" servo index: ",
        "M300":" duration (in ms) ",
        "M301":" proportional (Kp): ",
        "M302":" allow state: ",
        "M304":" proportional (Kp): ",
        "M305":" heater #: ",
        "M323":" 1=store correction state persistently in EEPROM: ",
        "M340":" servoId: ",
        "M540":" MAC address: ",
        "M550":" machine name: ",
        "M551":" password: ",
        "M552":" IP address: ",
        "M553":" net mask: ",
        "M554":" gateway: ",
        "M555":" emulation type: ",
        "M557":" probe point #: ",
        "M558":" Z probe type: ",
        "M562":" heater #: "$val
    };

    var a_comm = {
        "G6":" Stepper A pos/angle: ",
        "G130":" to A axis pos: ",
        
        "M132":" A axis offset: ",
        "M165": " mix factor for extruder stepper 1: ",
        "M260":"  address: ",
        "M261":"  address: ",
        "M307":" gAin: "
    };

    var b_comm = {
        "G6":" Stepper B pos/angle: ",
        "G130":" to B axis pos: ",
        
        "M106":" blip time: ",
        "M132":" B axis offset: ",
        "M150":" blue: ",
        "M165": " mix factor for extruder stepper 2: ",
        "M205":" min segment time: ",
        "M260":"  add to buffer: ",
        "M261":"  bytes: ",
        "M305":" beta value: ",
        "M307":" Bang-bang control: ",
        "M350":" extruder 1: ",
        "M420":" blue PWM: "
    };

    var c_comm = {
        "G6":" Stepper C pos/angle: ",
        "G31":" temperature coefficient: ",
        
        "M116":" chamber #: ",
        "M149":" Flag to treat temperature as Celsius ",
        "M165": " mix factor for extruder stepper 3: ",
        "M250":" contrast value: ",
        "M303":" cycles: ",
        "M305":" Steinhart-Hart C coefficient: ",
        "M307":" dominant time (in s): "
    };

    var r_comm = {
        "G6":" relative move flag: ",
        "G10":" standby temperature(s): ",
        "G33":" reset distortion matrix(R0): ",
        "G100":" radius to add: ",
        
        "M105":" response sequence #: ",
        "M106":" restore speed: ",
        "M109":" max/accurate target temp: ",
        "M146":" relative humidity (in percent): ",
        "M150":" red: ",
        "M190":" accurate target temperature: ",
        "M191":" accurate target temperature: ",
        "M207":" positive or negative additional length to un-retract (in mm): ",
        "M305":" series resistor value: ",
        "M408":" response sequence #: ",
        "M420":" red PWM: ",
        "M552":" HTTP port: ",
        "M558":" recovery time: "
    };

    var u_comm = {
        "G10":" U, V and W axis offsets: ",
        
        "M150":" green: "
    };

    var h_comm = {
        "G30":" height correction: ",
    
        "M106":" select heaters: ",
        "M116":" heater #: ",
        "M140":" heater #: ",
        "M141":" heater #: ",
        "M143":" heater #: ",
        "M165": " mix factor for extruder stepper 5: ",
        "M301":" heater #: ",
        "M305":" ADC high offset: ",
        "M307":" heater #: ",
        "M376":" height (in mm): ",
        "M558":" dive height (in mm): "
    };

    var t_comm = {
        "G31":" Z probe type: ",
    
        "M106":" set thermostatic mode: ",
        "M126":" toolhead: ",
        "M127":" toolhead: ",
        "M133":" extruder to wait for: ",
        "M134":" platform to wait for: ",
        "M135":" toolhead change: ",
        "M204":"  travel moves: ",
        "M205":" travel only ",
        "M206":" type: ",
        "M207":" feedrate for un-retraction if different from retraction (in mm/min): ",
        "M218":" extruder #: ",
        "M305":" thermistor resistance at 25C: ",
        "M558":" travel speed: "
    };

    var d_comm = {
        "M165": " mix factor for extruder stepper 4: ",
        "M200":" filament diameter (in mm): ",
        "M221":" drive #: ",
        "M301":" derivative (Kd): ",
        "M304":" derivative (Kd): ",
        "M307":" dead time (in s): ",
        "M404":" nozzle diameter (in mm): "
    };

    var l_comm = {
        "G33":" list distortion matrix(L0): ",
    
        "M48":" legs of travel: ",
        "M106":" min fan speed: ",
        "M305":" ADC low offset: ",
        "M530":" # of layers: ",
        "M532":" printed layer: "
    };

    var w_comm = {
        "M43":" watch pins: "
    };

    var v_comm = {
        "M48":" verbosity: "
    };

    var k_comm ={
        "M149":" Flag to treat temperature as Kelvin "
    };

    var commands = gCodeLine.split(/ +/);
    var output = "";
    var found=true;
    var comment=false;
    var slash=false;
    var comments = "";
    for (i=0; i<commands.length; i++) {
      if (!(commands[i] in common_comm)) {
        found=false;
        //check if it is valid
        switch ((commands[i]).charAt(0)) {
          case 'N':
            found=true;
            comment=false;
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
              comment=false;
              output += x_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'Y':
            if (commands[0] in y_comm) {
              found=true;
              comment=false;
              output += y_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'Z':
            if (commands[0] in z_comm) {
              found=true;
              comment=false;
              output += z_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'E':
            if (commands[0] in e_comm) {
              found=true;
              comment=false;
              output += e_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'F':
            if (commands[0] in f_comm) {
              found=true;
              comment=false;
              output += f_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'S':
            if (commands[0] in s_comm) {
              found=true;
              comment=false;
              output += s_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'I':
            if (commands[0] in i_comm) {
              found=true;
              comment=false;
              output += i_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'J':
            if (commands[0] in j_comm) {
              found=true;
              comment=false;
              output += j_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'P':
            if (commands[0] in p_comm) {
              found=true;
              comment=false;
              output += p_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'A':
            if (commands[0] in a_comm) {
              found=true;
              comment=false;
              output += a_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'B':
            if (commands[0] in b_comm) {
              found=true;
              comment=false;
              output += b_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'C':
            if (commands[0] in c_comm) {
              found=true;
              comment=false;
              output += c_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'R':
            if (commands[0] in r_comm) {
              found=true;
              comment=false;
              output += r_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'U':
            if (commands[0] in u_comm) {
              found=true;
              comment=false;
              output += u_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'H':
            if (commands[0] in h_comm) {
              found=true;
              comment=false;
              output += h_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'T':
            if (commands[0] in t_comm) {
              found=true;
              comment=false;
              output += t_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'D':
            if (commands[0] in d_comm) {
              found=true;
              comment=false;
              output += d_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'L':
            if (commands[0] in l_comm) {
              found=true;
              comment=false;
              output += l_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'W':
            if (commands[0] in w_comm) {
              found=true;
              comment=false;
              output += w_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'V':
            if (commands[0] in v_comm) {
              found=true;
              comment=false;
              output += v_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case 'K':
            if (commands[0] in k_comm) {
              found=true;
              comment=false;
              output += k_comm[commands[0]] + (commands[i]).slice(1)+";";
            }
            break;
          case '*':
            found=true;
            comment=false;
            output += " checksum (can be used for checking): "+(commands[i]).slice(1)+";";
            break;
          case ';':
            found=true;
            comment=true;
            break;
          case '/':
            if (slash==true) {
              found=true;
              comment=true;
              slash=false;
            }
            else {
              found=true;
              slash=true;
              comment=true;
            }
            break;
          case ';*':
            found=true;
            comment=true;
            break;
          case '->':
            found=true;
            comment=true;
            break;
          default:
            if (comment==true) {
              found=true;
              comments += (commands[i])+" ";
            }
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
    //if (comment==true) {
    //  return output+" comment: "+comments+";";
    //}
    return output;
  };
}( window.codeEditor = window.codeEditor || {} ));