(function (gcodeDictionary, undefined) {
    gcodeDictionary.dictionary = {
        'G0': {
            description: {
                simple: 'Move',
                normal: 'Move (rapid linear)'
            },
            parameters: {
                'E': {
                    simple: ' extrude: ',
                    normal: ' extrude amount: '
                },
                'F': {
                    simple: ' feed: ',
                    normal: ' feed rate: '
                },
                'S': {
                    simple: ' flag: ',
                    normal: ' endstop flag: '
                },
                'Y': {
                    simple: ' Y: ',
                    normal: ' to Y axis pos: '
                },
                'X': {
                    simple: ' X: ',
                    normal: ' to X axis pos: '
                },
                'Z': {
                    simple: ' Z: ',
                    normal: ' to Z axis pos: '
                }
            }
        },
        'G1': {
            description: {
                simple: 'Move',
                normal: 'Move (linear)'
            },
            parameters: {
                'E': {
                    simple: ' extrude: ',
                    normal: ' extrude amount: '
                },
                'F': {
                    simple: ' feed: ',
                    normal: ' feed rate: '
                },
                'S': {
                    simple: ' flag: ',
                    normal: ' endstop flag: '
                },
                'Y': {
                    simple: ' Y: ',
                    normal: ' to Y axis pos: '
                },
                'X': {
                    simple: ' X: ',
                    normal: ' to X axis pos: '
                },
                'Z': {
                    simple: ' Z: ',
                    normal: ' to Z axis pos: '
                }
            }
        },
        'G2': {
            description: {
                simple: 'Move',
                normal: 'Move (controlled clockwise arc)'
            },
            parameters: {
                'E': {
                    simple: ' extrude: ',
                    normal: ' extrude amount: '
                },
                'F': {
                    simple: ' feed: ',
                    normal: ' feed rate: '
                },
                'I': {
                    simple: ' X dist: ',
                    normal: ' distance to maintain from (X space): '
                },
                'J': {
                    simple: ' Y dist: ',
                    normal: ' distance to maintain from (Y space): '
                },
                'Y': {
                    simple: ' Y: ',
                    normal: ' to Y axis pos: '
                },
                'X': {
                    simple: ' X: ',
                    normal: ' to X axis pos: '
                }
            }
        },
        'G3': {
            description: {
                simple: 'Move',
                normal: 'Move (controlled counter-clockwise arc)'
            },
            parameters: {
                'E': {
                    simple: ' extrude: ',
                    normal: ' extrude amount: '
                },
                'F': {
                    simple: ' feed: ',
                    normal: ' feed rate: '
                },
                'I': {
                    simple: ' X dist: ',
                    normal: ' distance to maintain from (X space): '
                },
                'J': {
                    simple: ' Y dist: ',
                    normal: ' distance to maintain from (Y space): '
                },
                'Y': {
                    simple: ' Y: ',
                    normal: ' to Y axis pos: '
                },
                'X': {
                    simple: ' X: ',
                    normal: ' to X axis pos: '
                }
            }
        },
        'G4': {
            description: {
                simple: 'Dwell',
                normal: 'Dwell (pause)'
            },
            parameters: {
                'P': {
                    simple: ' wait: ',
                    normal: ' wait time (in ms): '
                },
                'S': {
                    simple: ' wait: ',
                    normal: ' wait time (in s): '
                }
            }
        },
        'G6': {
            description: {
                simple: 'Move',
                normal: 'Move (direct stepper)'
            },
            parameters: {
                'A': {
                    simple: ' A: ',
                    normal: ' Stepper A pos/angle: '
                },
                'C': {
                    simple: ' C: ',
                    normal: ' Stepper C pos/angle: '
                },
                'B': {
                    simple: ' B: ',
                    normal: ' Stepper B pos/angle: '
                },
                'R': {
                    simple: ' flag: ',
                    normal: ' relative move flag: '
                }
            }
        },
        'G10': {
            description: {
                simple: 'Tool Offset/Retract',
                normal: 'Tool Offset/Retract'
            },
            parameters: {
                'E': {
                    simple: ' Z: ',
                    normal: ' Z offset: '
                },
                'P': {
                    simple: ' tool #: ',
                    normal: ' tool #: '
                },
                'S': {
                    simple: ' temp or length: ',
                    normal: ' active temperature(s) or retract length: '
                },
                'R': {
                    simple: ' temp: ',
                    normal: ' standby temperature(s): '
                },
                'U': {
                    simple: ' U, V and W: ',
                    normal: ' U, V and W axis offsets: '
                },
                'Y': {
                    simple: ' Y: ',
                    normal: ' Y offset: '
                },
                'X': {
                    simple: ' X: ',
                    normal: ' X offset: '
                }
            }
        },
        'G11': {
            description: {
                simple: 'Unretract',
                normal: 'Unretract'
            },
            parameters: {
                'S': {
                    simple: ' length: ',
                    normal: ' retract length: '
                }
            }
        },
        'G20': {
            description: {
                simple: 'Units to Inches',
                normal: 'Set Units to Inches'
            },
            parameters: {}
        },
        'G21': {
            description: {
                simple: 'Units to mm',
                normal: 'Set Units to Millimeters'
            },
            parameters: {}
        },
        'G22': {
            description: {
                simple: 'Retract',
                normal: 'Firmware controlled Retract'
            },
            parameters: {}
        },
        'G23': {
            description: {
                simple: 'Unretract/Precharge',
                normal: 'Firmware controlled Unretract/Precharge'
            },
            parameters: {}
        },
        'G28': {
            description: {
                simple: 'Move to Origin',
                normal: 'Move to Origin'
            },
            parameters: {
                'Y': {
                    simple: ' flag ',
                    normal: ' flag to go back to the Y axis origin '
                },
                'X': {
                    simple: ' flag ',
                    normal: ' flag to go back to the X axis origin '
                },
                'Z': {
                    simple: ' flag ',
                    normal: ' flag to go back to the Z axis origin '
                }
            }
        },
        'G29': {
            description: {
                simple: 'Level bed',
                normal: 'Use Probe to level bed'
            },
            parameters: {
                'S': {
                    simple: ' firmware-dependent behavior: ',
                    normal: ' firmware-dependent behavior: '
                }
            }
        },
        'G29.1': {
            description: {
                simple: 'Set Z probe head offset',
                normal: 'Set Z probe head offset'
            },
            parameters: {
                'Y': {
                    simple: ' Y: ',
                    normal: ' Y offset: '
                },
                'X': {
                    simple: ' X: ',
                    normal: ' X offset: '
                },
                'Z': {
                    simple: ' Z offset: ',
                    normal: ' Z offset: '
                }
            }
        },
        'G29.2': {
            description: {
                simple: 'Set Z probe head offset',
                normal: 'Set Z probe head offset (from toolhead position)'
            },
            parameters: {
                'Z': {
                    simple: ' Z: ',
                    normal: ' Z offset: '
                }
            }
        },
        'G30': {
            description: {
                simple: 'Probes bed',
                normal: 'Probes bed at current XY location'
            },
            parameters: {
                'H': {
                    simple: ' height: ',
                    normal: ' height correction: '
                },
                'P': {
                    simple: ' probe point #: ',
                    normal: ' probe point #: '
                },
                'S': {
                    simple: ' set parameter: ',
                    normal: ' set parameter: '
                },
                'Y': {
                    simple: ' Y: ',
                    normal: ' Y coordinate: '
                },
                'X': {
                    simple: ' X: ',
                    normal: ' X coordinate: '
                },
                'Z': {
                    simple: ' Z: ',
                    normal: ' Z coordinate: '
                }
            }
        },
        'G31': {
            description: {
                simple: 'Set or Report Current Probe status/Dock Z Probe sled',
                normal: 'Set or Report Current Probe status/Dock Z Probe sled'
            },
            parameters: {
                'C': {
                    simple: ' temp co: ',
                    normal: ' temperature coefficient: '
                },
                'P': {
                    simple: ' trigger value: ',
                    normal: ' trigger value: '
                },
                'S': {
                    simple: ' temp: ',
                    normal: ' calibration temperature: '
                },
                'T': {
                    simple: ' type: ',
                    normal: ' Z probe type: '
                },
                'Y': {
                    simple: ' Y: ',
                    normal: ' probe Y offset: '
                },
                'X': {
                    simple: ' X: ',
                    normal: ' probe X offset: '
                },
                'Z': {
                    simple: ' trigger Z height: ',
                    normal: ' trigger Z height: '
                }
            }
        },
        'G32': {
            description: {
                simple: 'Probe Z and calculate Z plane/Undock Z Probe sled',
                normal: 'Probe Z and calculate Z plane/Undock Z Probe sled'
            },
            parameters: {
                'P': {
                    simple: ' method: ',
                    normal: ' bed correction method: '
                },
                'S': {
                    simple: ' method: ',
                    normal: ' bed leveling method: '
                }
            }
        },
        'G33': {
            description: {
                simple: 'Measure/List/Adjust Distortion Matrix',
                normal: 'Measure/List/Adjust Distortion Matrix'
            },
            parameters: {
                'Y': {
                    simple: ' Y: ',
                    normal: ' Y correction: '
                },
                'X': {
                    simple: ' X: ',
                    normal: ' X correction: '
                },
                'R': {
                    simple: ' reset R0: ',
                    normal: ' reset distortion matrix(R0): '
                },
                'L': {
                    simple: ' list L0: ',
                    normal: ' list distortion matrix(L0): '
                },
                'Z': {
                    simple: ' Z: ',
                    normal: ' Z correction: '
                }
            }
        },
        'G60': {
            description: {
                simple: 'save current position to slot',
                normal: 'save current position to slot'
            },
            parameters: {
                'S': {
                    simple: ' memory slot #: ',
                    normal: ' memory slot #: '
                }
            }
        },
        'G61': {
            description: {
                simple: 'Apply/restore saved coordinates to the active extruder',
                normal: 'Apply/restore saved coordinates to the active extruder'
            },
            parameters: {
                'E': {
                    simple: ' E: ',
                    normal: ' E coordinate: '
                },
                'F': {
                    simple: ' feed: ',
                    normal: ' F set feedrate: '
                },
                'S': {
                    simple: ' memory slot #: ',
                    normal: ' memory slot #: '
                },
                'Y': {
                    simple: ' Y: ',
                    normal: ' Y coordinate: '
                },
                'X': {
                    simple: ' X: ',
                    normal: ' X coordinate: '
                },
                'Z': {
                    simple: ' Z: ',
                    normal: ' Z coordinate: '
                }
            }
        },
        'G90': {
            description: {
                simple: 'Set to Absolute Positioning',
                normal: 'Set to Absolute Positioning'
            },
            parameters: {}
        },
        'G91': {
            description: {
                simple: 'Set to Relative Positioning',
                normal: 'Set to Relative Positioning'
            },
            parameters: {}
        },
        'G92': {
            description: {
                simple: 'Set Position',
                normal: 'Set Position'
            },
            parameters: {
                'Y': {
                    simple: ' new Y: ',
                    normal: ' new Y axis pos: '
                },
                'X': {
                    simple: ' new X: ',
                    normal: ' new X axis pos: '
                },
                'Z': {
                    simple: ' new Z: ',
                    normal: ' new Z axis pos: '
                },
                'E': {
                    simple: ' new extruder: ',
                    normal: ' new extruder pos: '
                }
            }
        },
        'G100': {
            description: {
                simple: 'Calibrate floor or rod radius',
                normal: 'Calibrate floor or rod radius'
            },
            parameters: {
                'Y': {
                    simple: ' flag ',
                    normal: ' flag to set floor for Y axis '
                },
                'X': {
                    simple: ' flag ',
                    normal: ' flag to set floor for X axis '
                },
                'R': {
                    simple: ' radius: ',
                    normal: ' radius to add: '
                },
                'Z': {
                    simple: ' flag ',
                    normal: ' flag to set floor for Z axis '
                }
            }
        },
        'G130': {
            description: {
                simple: 'Set digital potentiometer value',
                normal: 'Set digital potentiometer value'
            },
            parameters: {
                'A': {
                    simple: ' A: ',
                    normal: ' to A axis pos: '
                },
                'Y': {
                    simple: ' Y: ',
                    normal: ' to Y axis pos: '
                },
                'B': {
                    simple: ' B: ',
                    normal: ' to B axis pos: '
                },
                'Z': {
                    simple: ' Z: ',
                    normal: ' to Z axis pos: '
                },
                'X': {
                    simple: ' X: ',
                    normal: ' to X axis pos: '
                }
            }
        },
        'G131': {
            description: {
                simple: 'Remove offset',
                normal: 'Remove offset'
            },
            parameters: {}
        },
        'G132': {
            description: {
                simple: 'Calibrate endstop offsets',
                normal: 'Calibrate endstop offsets'
            },
            parameters: {}
        },
        'G133': {
            description: {
                simple: 'Measure steps to top',
                normal: 'Measure steps to top'
            },
            parameters: {}
        },
        'G161': {
            description: {
                simple: 'Home axes to min',
                normal: 'Home axes to minimum'
            },
            parameters: {
                'Y': {
                    simple: ' flag ',
                    normal: ' flag to home Y axis to min '
                },
                'X': {
                    simple: ' flag ',
                    normal: ' flag to home X axis to min '
                },
                'Z': {
                    simple: ' flag ',
                    normal: ' flag to home Z axis to min '
                },
                'F': {
                    simple: ' feed: ',
                    normal: ' desired feedrate: '
                }
            }
        },
        'G162': {
            description: {
                simple: 'Home axes to max',
                normal: 'Home axes to maximum'
            },
            parameters: {
                'Y': {
                    simple: ' flag ',
                    normal: ' flag to home Y axis to max '
                },
                'X': {
                    simple: ' flag ',
                    normal: ' flag to home X axis to max '
                },
                'Z': {
                    simple: ' flag ',
                    normal: ' flag to home Z axis to max '
                },
                'F': {
                    simple: ' feed: ',
                    normal: ' desired feedrate: '
                }
            }
        },
        'M0': {
            description: {
                normal: 'Stop'
            },
            parameters: {
                'P': {
                    normal: ' wait time (in ms): '
                },
                'S': {
                    normal: ' wait time (in s): '
                }
            }
        },
        'M1': {
            description: {
                normal: 'Sleep'
            },
            parameters: {}
        },
        'M2': {
            description: {
                normal: 'Program End'
            },
            parameters: {}
        },
        'M6': {
            description: {
                normal: 'Tool change'
            },
            parameters: {}
        },
        'M17': {
            description: {
                normal: 'Enable/Power all stepper motors'
            },
            parameters: {}
        },
        'M18': {
            description: {
                normal: 'Disable all stepper motors'
            },
            parameters: {
                'Y': {
                    normal: ' Y axis: '
                },
                'X': {
                    normal: ' X axis: '
                },
                'Z': {
                    normal: ' Z axis: '
                },
                'E': {
                    normal: ' extruder drive(s): '
                }
            }
        },
        'M20': {
            description: {
                normal: 'List SD card'
            },
            parameters: {
                'P': {
                    normal: ' directory to list: '
                },
                'S': {
                    normal: ' output style: '
                }
            }
        },
        'M21': {
            description: {
                normal: 'Initialize SD card'
            },
            parameters: {
                'P': {
                    normal: ' SD card #: '
                }
            }
        },
        'M22': {
            description: {
                normal: 'Release SD card'
            },
            parameters: {
                'P': {
                    normal: ' SD card #: '
                }
            }
        },
        'M23': {
            description: {
                normal: 'Select SD file'
            },
            parameters: {}
        },
        'M24': {
            description: {
                normal: 'Start/resume SD print'
            },
            parameters: {}
        },
        'M25': {
            description: {
                normal: 'Pause SD print'
            },
            parameters: {}
        },
        'M26': {
            description: {
                normal: 'Set SD position'
            },
            parameters: {
                'S': {
                    normal: ' file pos (in bytes): '
                }
            }
        },
        'M27': {
            description: {
                normal: 'Report SD print status'
            },
            parameters: {}
        },
        'M28': {
            description: {
                normal: 'Begin write to SD card'
            },
            parameters: {}
        },
        'M29': {
            description: {
                normal: 'Stop writing to SD card'
            },
            parameters: {}
        },
        'M30': {
            description: {
                normal: 'Delete a file on the SD card'
            },
            parameters: {}
        },
        'M31': {
            description: {
                normal: 'Output time since last M109 or SD card start to serial'
            },
            parameters: {}
        },
        'M32': {
            description: {
                normal: 'Select file and start SD print'
            },
            parameters: {}
        },
        'M33': {
            description: {
                normal: 'Get the long name for an SD card file or folder/Stop and Close File and save restart.gcode'
            },
            parameters: {}
        },
        'M34': {
            description: {
                normal: 'Set SD file sorting options'
            },
            parameters: {}
        },
        'M35': {
            description: {
                normal: 'Upload firmware NEXTION from SD'
            },
            parameters: {}
        },
        'M36': {
            description: {
                normal: 'Return file information'
            },
            parameters: {}
        },
        'M37': {
            description: {
                normal: 'Simulation mode'
            },
            parameters: {
                'S': {
                    normal: ' toggle mode ( S1 enters, S0 leaves) '
                }
            }
        },
        'M38': {
            description: {
                normal: 'Compute SHA1 hash of target file'
            },
            parameters: {}
        },
        'M40': {
            description: {
                normal: 'Eject'
            },
            parameters: {}
        },
        'M41': {
            description: {
                normal: 'Loop'
            },
            parameters: {}
        },
        'M42': {
            description: {
                normal: 'Switch I/O pin'
            },
            parameters: {
                'P': {
                    normal: ' pin #: '
                },
                'S': {
                    normal: ' pin value: '
                }
            }
        },
        'M43': {
            description: {
                normal: 'Stand by on material exhausted/Pin report and debug'
            },
            parameters: {
                'I': {
                    normal: ' flag to ignore pin protection: '
                },
                'P': {
                    normal: ' pin to read or watch: '
                },
                'E': {
                    normal: ' toggle background endstop monitoring: '
                },
                'W': {
                    normal: ' watch pins: '
                }
            }
        },
        'M48': {
            description: {
                normal: 'Measure Z-Probe repeatability'
            },
            parameters: {
                'E': {
                    normal: ' engage '
                },
                'L': {
                    normal: ' legs of travel: '
                },
                'P': {
                    normal: ' # of points: '
                },
                'S': {
                    normal: ' schizoid '
                },
                'V': {
                    normal: ' verbosity: '
                },
                'Y': {
                    normal: ' pos on the Y axis: '
                },
                'X': {
                    normal: ' pos on the X axis: '
                }
            }
        },
        'M70': {
            description: {
                normal: 'Display message'
            },
            parameters: {}
        },
        'M72': {
            description: {
                normal: 'Play a tone or song'
            },
            parameters: {
                'P': {
                    normal: ' song ID: '
                }
            }
        },
        'M73': {
            description: {
                normal: 'Set build percentage'
            },
            parameters: {
                'P': {
                    normal: ' percentage: '
                }
            }
        },
        'M80': {
            description: {
                normal: 'ATX Power On'
            },
            parameters: {}
        },
        'M81': {
            description: {
                normal: 'ATX Power Off'
            },
            parameters: {}
        },
        'M82': {
            description: {
                normal: 'Set extruder to absolute mode'
            },
            parameters: {}
        },
        'M83': {
            description: {
                normal: 'Set extruder to relative mode'
            },
            parameters: {}
        },
        'M84': {
            description: {
                normal: 'Stop idle hold'
            },
            parameters: {
                'I': {
                    normal: ' reset flags: '
                }
            }
        },
        'M85': {
            description: {
                normal: 'Set inactivity shutdown timer'
            },
            parameters: {
                'S': {
                    normal: ' seconds: '
                }
            }
        },
        'M92': {
            description: {
                normal: 'Set axis_steps_per_unit'
            },
            parameters: {
                'Y': {
                    normal: ' Y drive: '
                },
                'X': {
                    normal: ' X drive: '
                },
                'Z': {
                    normal: ' Z drive: '
                },
                'E': {
                    normal: ' extruder drive(s): '
                }
            }
        },
        'M93': {
            description: {
                normal: 'Send axis_steps_per_unit'
            },
            parameters: {}
        },
        'M98': {
            description: {
                normal: 'Call Macro/Subprogram/Get axis_hysteresis_mm'
            },
            parameters: {
                'P': {
                    normal: ' line #: '
                }
            }
        },
        'M99': {
            description: {
                normal: 'Return from Macro/Subprogram/Set axis_hysteresis_mm'
            },
            parameters: {}
        },
        'M101': {
            description: {
                normal: 'Turn extruder 1 on (Forward), Undo Retraction'
            },
            parameters: {}
        },
        'M102': {
            description: {
                normal: 'Turn extruder 1 on (Reverse)'
            },
            parameters: {}
        },
        'M103': {
            description: {
                normal: 'Turn all extruders off, Extruder Retraction'
            },
            parameters: {}
        },
        'M104': {
            description: {
                normal: 'Set Extruder Temperature'
            },
            parameters: {
                'S': {
                    normal: ' target temperature: '
                }
            }
        },
        'M105': {
            description: {
                normal: 'Get Extruder Temperature'
            },
            parameters: {
                'S': {
                    normal: ' response type: '
                },
                'R': {
                    normal: ' response sequence #: '
                }
            }
        },
        'M106': {
            description: {
                normal: 'Fan On'
            },
            parameters: {
                'B': {
                    normal: ' blip time: '
                },
                'F': {
                    normal: ' frequency (in Hz): '
                },
                'I': {
                    normal: ' disable fan: '
                },
                'H': {
                    normal: ' select heaters: '
                },
                'L': {
                    normal: ' min fan speed: '
                },
                'P': {
                    normal: ' fan #: '
                },
                'S': {
                    normal: ' fan speed: '
                },
                'R': {
                    normal: ' restore speed: '
                },
                'T': {
                    normal: ' set thermostatic mode: '
                }
            }
        },
        'M107': {
            description: {
                normal: 'Fan Off'
            },
            parameters: {}
        },
        'M108': {
            description: {
                normal: 'Cancel Heating/Set Extruder Speed'
            },
            parameters: {}
        },
        'M109': {
            description: {
                normal: 'Set Extruder Temperature and Wait'
            },
            parameters: {
                'S': {
                    normal: ' min target temp: '
                },
                'R': {
                    normal: ' max/accurate target temp: '
                }
            }
        },
        'M110': {
            description: {
                normal: 'Set Current Line Number'
            },
            parameters: {}
        },
        'M111': {
            description: {
                normal: 'Set Debug Level'
            },
            parameters: {
                'P': {
                    normal: ' debug module: '
                },
                'S': {
                    normal: ' debug on/off: '
                }
            }
        },
        'M112': {
            description: {
                normal: 'Emergency Stop'
            },
            parameters: {}
        },
        'M113': {
            description: {
                normal: 'Set Extruder PWM'
            },
            parameters: {
                'S': {
                    normal: ' value to set: '
                }
            }
        },
        'M114': {
            description: {
                normal: 'Get Current Position'
            },
            parameters: {}
        },
        'M115': {
            description: {
                normal: 'Get Firmware Version and Capabilities'
            },
            parameters: {
                'P': {
                    normal: ' electronics type: '
                }
            }
        },
        'M116': {
            description: {
                normal: 'Wait'
            },
            parameters: {
                'H': {
                    normal: ' heater #: '
                },
                'C': {
                    normal: ' chamber #: '
                },
                'P': {
                    normal: ' tool #: '
                }
            }
        },
        'M117': {
            description: {
                normal: 'Get Zero Position'
            },
            parameters: {}
        },
        'M118': {
            description: {
                normal: 'Display Message'
            },
            parameters: {}
        },
        'M119': {
            description: {
                normal: 'Negotiate Features/Get Endstop Status'
            },
            parameters: {}
        },
        'M120': {
            description: {
                normal: 'Push/Enable endstop detection'
            },
            parameters: {}
        },
        'M121': {
            description: {
                normal: 'Pop/Disable endstop detection'
            },
            parameters: {}
        },
        'M122': {
            description: {
                normal: 'Diagnose'
            },
            parameters: {}
        },
        'M123': {
            description: {
                normal: 'Tachometer value'
            },
            parameters: {}
        },
        'M124': {
            description: {
                normal: 'Immediate motor stop'
            },
            parameters: {}
        },
        'M126': {
            description: {
                normal: 'Open Valve'
            },
            parameters: {
                'P': {
                    normal: ' wait (in ms): '
                },
                'T': {
                    normal: ' toolhead: '
                }
            }
        },
        'M127': {
            description: {
                normal: 'Close Valve'
            },
            parameters: {
                'P': {
                    normal: ' wait (in ms): '
                },
                'T': {
                    normal: ' toolhead: '
                }
            }
        },
        'M128': {
            description: {
                normal: 'Extruder Pressure PWM'
            },
            parameters: {
                'S': {
                    normal: ' pressure: '
                }
            }
        },
        'M129': {
            description: {
                normal: 'Extruder pressure off'
            },
            parameters: {
                'P': {
                    normal: ' wait (in ms): '
                }
            }
        },
        'M130': {
            description: {
                normal: 'Set PID P value'
            },
            parameters: {
                'P': {
                    normal: ' heater #: '
                },
                'S': {
                    normal: ' proportional (Kp): '
                }
            }
        },
        'M131': {
            description: {
                normal: 'Set PID I value'
            },
            parameters: {
                'P': {
                    normal: ' heater #: '
                },
                'S': {
                    normal: ' integral (Ki): '
                }
            }
        },
        'M132': {
            description: {
                normal: 'Set PID D value'
            },
            parameters: {
                'A': {
                    normal: ' A axis offset: '
                },
                'B': {
                    normal: ' B axis offset: '
                },
                'P': {
                    normal: ' heater #: '
                },
                'S': {
                    normal: ' derivative (Kd): '
                },
                'Y': {
                    normal: ' Y axis offset: '
                },
                'X': {
                    normal: ' X axis offset: '
                },
                'Z': {
                    normal: ' Z axis offset: '
                }
            }
        },
        'M133': {
            description: {
                normal: 'Set PID I limit value'
            },
            parameters: {
                'P': {
                    normal: ' heater #/wait time: '
                },
                'S': {
                    normal: ' integral limit (Ki): '
                },
                'T': {
                    normal: ' extruder to wait for: '
                }
            }
        },
        'M134': {
            description: {
                normal: 'Write PID values to EEPROM'
            },
            parameters: {
                'P': {
                    normal: ' time limit: '
                },
                'T': {
                    normal: ' platform to wait for: '
                }
            }
        },
        'M135': {
            description: {
                normal: 'Set PID sample interval'
            },
            parameters: {
                'S': {
                    normal: ' heat sample time (in s): '
                },
                'T': {
                    normal: ' toolhead change: '
                }
            }
        },
        'M136': {
            description: {
                normal: 'Print PID settings to host'
            },
            parameters: {}
        },
        'M140': {
            description: {
                normal: 'Set Bed Temperature (Fast)'
            },
            parameters: {
                'H': {
                    normal: ' heater #: '
                },
                'S': {
                    normal: ' target temperature: '
                }
            }
        },
        'M141': {
            description: {
                normal: 'Set Chamber Temperature (Fast)'
            },
            parameters: {
                'H': {
                    normal: ' heater #: '
                },
                'S': {
                    normal: ' target temperature: '
                }
            }
        },
        'M142': {
            description: {
                normal: 'Holding Pressure'
            },
            parameters: {
                'S': {
                    normal: ' holding pressure of the bed: '
                }
            }
        },
        'M143': {
            description: {
                normal: 'Max heater temperature'
            },
            parameters: {
                'H': {
                    normal: ' heater #: '
                },
                'S': {
                    normal: ' max temp: '
                }
            }
        },
        'M144': {
            description: {
                normal: 'Bed Standby'
            },
            parameters: {}
        },
        'M146': {
            description: {
                normal: 'Set Chamber Humidity'
            },
            parameters: {
                'R': {
                    normal: ' relative humidity (in percent): '
                }
            }
        },
        'M149': {
            description: {
                normal: 'Set temperature units'
            },
            parameters: {
                'C': {
                    normal: ' Flag to treat temperature as Celsius '
                },
                'K': {
                    normal: ' Flag to treat temperature as Kelvin '
                }
            }
        },
        'M150': {
            description: {
                normal: 'Set display color'
            },
            parameters: {
                'R': {
                    normal: ' red: '
                },
                'B': {
                    normal: ' blue: '
                },
                'U': {
                    normal: ' green: '
                }
            }
        },
        'M155': {
            description: {
                normal: 'Automatically send temperatures'
            },
            parameters: {
                'S': {
                    normal: ' enable(1)/disable(0): '
                }
            }
        },
        'M160': {
            description: {
                normal: 'Number of mixed materials'
            },
            parameters: {
                'S': {
                    normal: ' # of materials: '
                }
            }
        },
        'M163': {
            description: {
                normal: 'Set weight of mixed material'
            },
            parameters: {
                'P': {
                    normal: ' weight: '
                },
                'S': {
                    normal: ' extruder #: '
                }
            }
        },
        'M164': {
            description: {
                normal: 'Store weights'
            },
            parameters: {
                'P': {
                    normal: ' store to eeprom (P0 = no, P1 = yes): '
                },
                'S': {
                    normal: ' virtual extruder#: '
                }
            }
        },
        'M165': {
            description: {
                normal: 'Set multiple mix weights'
            },
            parameters: {
                'A': {
                    normal: ' mix factor for extruder stepper 1: '
                },
                'C': {
                    normal: ' mix factor for extruder stepper 3: '
                },
                'B': {
                    normal: ' mix factor for extruder stepper 2: '
                },
                'D': {
                    normal: ' mix factor for extruder stepper 4: '
                },
                'I': {
                    normal: ' mix factor for extruder stepper 6: '
                },
                'H': {
                    normal: ' mix factor for extruder stepper 5: '
                }
            }
        },
        'M190': {
            description: {
                normal: 'Wait for bed temp to reach target temp'
            },
            parameters: {
                'S': {
                    normal: ' min target temperature: '
                },
                'R': {
                    normal: ' accurate target temperature: '
                }
            }
        },
        'M191': {
            description: {
                normal: 'Wait for chamber temp to reach target temp'
            },
            parameters: {
                'S': {
                    normal: ' min target temperature: '
                },
                'R': {
                    normal: ' accurate target temperature: '
                }
            }
        },
        'M200': {
            description: {
                normal: 'Set filament diameter'
            },
            parameters: {
                'D': {
                    normal: ' filament diameter (in mm): '
                }
            }
        },
        'M201': {
            description: {
                normal: 'Set max printing acceleration'
            },
            parameters: {
                'Y': {
                    normal: ' acceleration for Y axis: '
                },
                'X': {
                    normal: ' acceleration for X axis: '
                },
                'Z': {
                    normal: ' acceleration for Z axis: '
                },
                'E': {
                    normal: ' acceleration for extruder drives: '
                }
            }
        },
        'M202': {
            description: {
                normal: 'Set max travel acceleration'
            },
            parameters: {
                'Y': {
                    normal: ' travel moves (in units/s^2): '
                },
                'X': {
                    normal: ' travel moves (in units/s^2): '
                }
            }
        },
        'M203': {
            description: {
                normal: 'Set maximum feedrate'
            },
            parameters: {
                'Y': {
                    normal: ' max for Y axis: '
                },
                'X': {
                    normal: ' max for X axis: '
                },
                'Z': {
                    normal: ' max for Z axis: '
                },
                'E': {
                    normal: ' max for extruder drives: '
                }
            }
        },
        'M204': {
            description: {
                normal: 'Set default acceleration'
            },
            parameters: {
                'P': {
                    normal: ' printing moves: '
                },
                'T': {
                    normal: '  travel moves: '
                }
            }
        },
        'M205': {
            description: {
                normal: 'Advanced settings'
            },
            parameters: {
                'B': {
                    normal: ' min segment time: '
                },
                'E': {
                    normal: ' max E jerk: '
                },
                'S': {
                    normal: ' min travel speed/min planner speed: '
                },
                'T': {
                    normal: ' travel only '
                },
                'X': {
                    normal: ' max xy jerk/xy junction deviation: '
                },
                'Z': {
                    normal: ' max Z jerk/z junction deviation: '
                }
            }
        },
        'M206': {
            description: {
                normal: 'Offset axes/Set eeprom value'
            },
            parameters: {
                'P': {
                    normal: ' pos: '
                },
                'S': {
                    normal: ' int (long): '
                },
                'T': {
                    normal: ' type: '
                },
                'Y': {
                    normal: ' Y axis offset: '
                },
                'X': {
                    normal: ' X axis offset/float: '
                },
                'Z': {
                    normal: ' Z axis offset: '
                }
            }
        },
        'M207': {
            description: {
                normal: 'Calibrate z axis/Set retract length'
            },
            parameters: {
                'S': {
                    normal: ' positive length to retract (in mm): '
                },
                'R': {
                    normal: ' positive or negative additional length to un-retract (in mm): '
                },
                'T': {
                    normal: ' feedrate for un-retraction if different from retraction (in mm/min): '
                },
                'Z': {
                    normal: ' additional zlift/hop: '
                },
                'F': {
                    normal: ' retraction feedrate (in mm/min): '
                }
            }
        },
        'M208': {
            description: {
                normal: 'Set axis max travel/Set unretract length'
            },
            parameters: {
                'Y': {
                    normal: ' Y axis limit: '
                },
                'X': {
                    normal: ' X axis limit: '
                },
                'S': {
                    normal: ' toggle set the axis min/positive length surplus to the M207: '
                },
                'Z': {
                    normal: ' Z axis limit: '
                },
                'F': {
                    normal: ' feedrate (in mm/sec): '
                }
            }
        },
        'M209': {
            description: {
                normal: 'Enable automatic retract'
            },
            parameters: {
                'S': {
                    normal: ' 1=true or 0=false: '
                }
            }
        },
        'M210': {
            description: {
                normal: 'Set homing feedrates'
            },
            parameters: {
                'Y': {
                    normal: ' in mm per minute: '
                },
                'X': {
                    normal: ' in mm per minute: '
                }
            }
        },
        'M211': {
            description: {
                normal: 'Disable/Enable software endstops'
            },
            parameters: {
                'Y': {
                    normal: ' 1=max endstop or 0=min endstop: '
                },
                'X': {
                    normal: ' 1=max endstop or 0=min endstop: '
                },
                'S': {
                    normal: ' 1=enable or 0=disable: '
                },
                'Z': {
                    normal: ' 1=max endstop or 0=min endstop: '
                }
            }
        },
        'M212': {
            description: {
                normal: 'Set Bed Level Sensor Offset'
            },
            parameters: {
                'Z': {
                    normal: ' Z home: '
                }
            }
        },
        'M218': {
            description: {
                normal: 'Set Hotend Offset'
            },
            parameters: {
                'Y': {
                    normal: ' offset on Y: '
                },
                'X': {
                    normal: ' offset on X: '
                },
                'T': {
                    normal: ' extruder #: '
                }
            }
        },
        'M220': {
            description: {
                normal: 'Set speed factor override percentage/Turn off AUX V1.0.5'
            },
            parameters: {
                'S': {
                    normal: ' percentage: '
                }
            }
        },
        'M221': {
            description: {
                normal: 'Set extrude factor override percentage/Turn on AUX V1.0.5'
            },
            parameters: {
                'S': {
                    normal: ' percentage: '
                },
                'D': {
                    normal: ' drive #: '
                }
            }
        },
        'M222': {
            description: {
                normal: 'Set speed of fast XY moves'
            },
            parameters: {}
        },
        'M223': {
            description: {
                normal: 'Set speed of fast Z moves'
            },
            parameters: {}
        },
        'M224': {
            description: {
                normal: 'Enable extruder during fast moves'
            },
            parameters: {}
        },
        'M225': {
            description: {
                normal: 'Disable on extruder during fast moves'
            },
            parameters: {}
        },
        'M226': {
            description: {
                normal: 'Gcode Initiated Pause/Wait for pin state'
            },
            parameters: {
                'P': {
                    normal: ' pin #: '
                },
                'S': {
                    normal: ' pin state: '
                }
            }
        },
        'M227': {
            description: {
                normal: 'Enable Automatic Reverse and Prime'
            },
            parameters: {
                'P': {
                    normal: ' steps: '
                },
                'S': {
                    normal: ' steps: '
                }
            }
        },
        'M228': {
            description: {
                normal: 'Disable Automatic Reverse and Prime'
            },
            parameters: {}
        },
        'M229': {
            description: {
                normal: 'Enable Automatic Reverse and Prime'
            },
            parameters: {
                'P': {
                    normal: ' extruder screw rotation: '
                },
                'S': {
                    normal: ' extruder screw rotation: '
                }
            }
        },
        'M230': {
            description: {
                normal: ' Disable/Enable Wait for Temperature Change'
            },
            parameters: {
                'S': {
                    normal: ' 1=disable or 0=enable: '
                }
            }
        },
        'M231': {
            description: {
                normal: 'Set OPS parameter'
            },
            parameters: {
                'Y': {
                    normal: ' retract: '
                },
                'X': {
                    normal: ' min distance: '
                },
                'S': {
                    normal: ' OPS_MODE: '
                },
                'Z': {
                    normal: ' backslash: '
                },
                'F': {
                    normal: ' ReatrctMove: '
                }
            }
        },
        'M232': {
            description: {
                normal: 'Read and reset max. advance values'
            },
            parameters: {}
        },
        'M240': {
            description: {
                normal: 'Trigger camera/Start conveyor belt motor/Echo off'
            },
            parameters: {}
        },
        'M241': {
            description: {
                normal: 'Stop conveyor belt motor/echo on'
            },
            parameters: {}
        },
        'M245': {
            description: {
                normal: 'Start cooler'
            },
            parameters: {}
        },
        'M246': {
            description: {
                normal: 'Stop cooler'
            },
            parameters: {}
        },
        'M250': {
            description: {
                normal: 'Set LCD contrast'
            },
            parameters: {
                'C': {
                    normal: ' contrast value: '
                }
            }
        },
        'M251': {
            description: {
                normal: 'Measure Z steps from homing stop'
            },
            parameters: {
                'S': {
                    normal: ' 0 =Reset, 1=Print, 2=Store to Z length: '
                }
            }
        },
        'M260': {
            description: {
                normal: 'i2c Send Data'
            },
            parameters: {
                'A': {
                    normal: '  address: '
                },
                'S': {
                    normal: '  send and reset buffer '
                },
                'B': {
                    normal: '  add to buffer: '
                }
            }
        },
        'M261': {
            description: {
                normal: 'i2c Request Data'
            },
            parameters: {
                'A': {
                    normal: '  address: '
                },
                'B': {
                    normal: '  bytes: '
                }
            }
        },
        'M280': {
            description: {
                normal: 'Set servo position'
            },
            parameters: {
                'I': {
                    normal: ' 1=invert polarity: '
                },
                'P': {
                    normal: ' servo index: '
                },
                'S': {
                    normal: ' angle or microseconds: '
                }
            }
        },
        'M290': {
            description: {
                normal: 'Baby stepping'
            },
            parameters: {
                'S': {
                    normal: ' amount (in mm): '
                }
            }
        },
        'M300': {
            description: {
                normal: 'Play beep sound'
            },
            parameters: {
                'P': {
                    normal: ' duration (in ms) '
                },
                'S': {
                    normal: ' frequency (in Hz) '
                }
            }
        },
        'M301': {
            description: {
                normal: 'Set PID parameters'
            },
            parameters: {
                'E': {
                    normal: ' heater #: '
                },
                'D': {
                    normal: ' derivative (Kd): '
                },
                'I': {
                    normal: ' integral (Ki): '
                },
                'H': {
                    normal: ' heater #: '
                },
                'P': {
                    normal: ' proportional (Kp): '
                },
                'S': {
                    normal: ' heater #: '
                }
            }
        },
        'M302': {
            description: {
                normal: 'Allow cold extrudes'
            },
            parameters: {
                'P': {
                    normal: ' allow state: '
                },
                'S': {
                    normal: ' min temp: '
                }
            }
        },
        'M303': {
            description: {
                normal: 'Run PID tuning'
            },
            parameters: {
                'C': {
                    normal: ' cycles: '
                },
                'S': {
                    normal: ' temperature: '
                }
            }
        },
        'M304': {
            description: {
                normal: 'Set PID parameters-Bed'
            },
            parameters: {
                'I': {
                    normal: ' integral (Ki): '
                },
                'P': {
                    normal: ' proportional (Kp): '
                },
                'D': {
                    normal: ' derivative (Kd): '
                }
            }
        },
        'M305': {
            description: {
                normal: 'Set thermistor and ADC parameters'
            },
            parameters: {
                'C': {
                    normal: ' Steinhart-Hart C coefficient: '
                },
                'B': {
                    normal: ' beta value: '
                },
                'H': {
                    normal: ' ADC high offset: '
                },
                'L': {
                    normal: ' ADC low offset: '
                },
                'P': {
                    normal: ' heater #: '
                },
                'R': {
                    normal: ' series resistor value: '
                },
                'T': {
                    normal: ' thermistor resistance at 25C: '
                },
                'X': {
                    normal: ' heater ADC channel: '
                }
            }
        },
        'M306': {
            description: {
                normal: 'Set home offset calculated'
            },
            parameters: {}
        },
        'M307': {
            description: {
                normal: 'Set or report heating process parameters'
            },
            parameters: {
                'A': {
                    normal: ' gAin: '
                },
                'C': {
                    normal: ' dominant time (in s): '
                },
                'B': {
                    normal: ' Bang-bang control: '
                },
                'D': {
                    normal: ' dead time (in s): '
                },
                'H': {
                    normal: ' heater #: '
                },
                'S': {
                    normal: ' max PWM: '
                }
            }
        },
        'M320': {
            description: {
                normal: 'Activate autolevel'
            },
            parameters: {
                'S': {
                    normal: ' >0 activate and store persistently in EEPROM: '
                }
            }
        },
        'M321': {
            description: {
                normal: 'Deactivate autolevel'
            },
            parameters: {
                'S': {
                    normal: ' >0 deactivate and store persistently in EEPROM: '
                }
            }
        },
        'M322': {
            description: {
                normal: 'Reset autolevel matrix'
            },
            parameters: {
                'S': {
                    normal: ' >0 also reset the matrix values saved EEPROM: '
                }
            }
        },
        'M323': {
            description: {
                normal: 'Distortion correction on/off'
            },
            parameters: {
                'P': {
                    normal: ' 1=store correction state persistently in EEPROM: '
                },
                'S': {
                    normal: ' 0=disable,1=enable: '
                }
            }
        },
        'M340': {
            description: {
                normal: 'Control the servos'
            },
            parameters: {
                'P': {
                    normal: ' servoId: '
                },
                'S': {
                    normal: ' pulseInUS: '
                }
            }
        },
        'M350': {
            description: {
                normal: 'Set microstepping mode'
            },
            parameters: {
                'B': {
                    normal: ' extruder 1: '
                },
                'E': {
                    normal: ' extruder 0: '
                },
                'I': {
                    normal: ' enable (nn=1) or disable (nn=0) interpolation: '
                },
                'S': {
                    normal: ' all drivers: '
                },
                'Y': {
                    normal: ' Y axis: '
                },
                'X': {
                    normal: ' X axis: '
                },
                'Z': {
                    normal: ' Z axis: '
                }
            }
        },
        'M351': {
            description: {
                normal: 'Toggle MS1 MS2 pins directly'
            },
            parameters: {}
        },
        'M355': {
            description: {
                normal: 'Turn case lights on/off'
            },
            parameters: {
                'S': {
                    normal: ' 1=enable,0=disable: '
                }
            }
        },
        'M360': {
            description: {
                normal: 'Report firmware configuration/Move to Theta 0 degree pos'
            },
            parameters: {}
        },
        'M361': {
            description: {
                normal: 'Move to Theta 90 degree position'
            },
            parameters: {}
        },
        'M362': {
            description: {
                normal: 'Move to Psi 0 degree position'
            },
            parameters: {}
        },
        'M363': {
            description: {
                normal: 'Move to Psi 90 degree position'
            },
            parameters: {}
        },
        'M364': {
            description: {
                normal: 'Move to Psi + Theta 90 degree position'
            },
            parameters: {}
        },
        'M365': {
            description: {
                normal: 'SCARA scaling factor'
            },
            parameters: {
                'Y': {
                    normal: ' Y scaling: '
                },
                'X': {
                    normal: ' X scaling: '
                },
                'Z': {
                    normal: ' Z scaling: '
                }
            }
        },
        'M366': {
            description: {
                normal: 'SCARA convert trim'
            },
            parameters: {}
        },
        'M370': {
            description: {
                normal: 'Morgan manual bed level-clear map'
            },
            parameters: {
                'X': {
                    normal: ' divisions: '
                }
            }
        },
        'M371': {
            description: {
                normal: 'Move to next calibration position'
            },
            parameters: {}
        },
        'M372': {
            description: {
                normal: 'Record calibration value and move to next position'
            },
            parameters: {}
        },
        'M373': {
            description: {
                normal: 'End bed level calibration mode'
            },
            parameters: {}
        },
        'M374': {
            description: {
                normal: 'Save calibration grid'
            },
            parameters: {
                'Z': {
                    normal: ' save M206 Z homing offset into the grid file '
                }
            }
        },
        'M375': {
            description: {
                normal: 'Display matrix/Load Matrix'
            },
            parameters: {}
        },
        'M376': {
            description: {
                normal: 'Set bed compensation taper'
            },
            parameters: {
                'H': {
                    normal: ' height (in mm): '
                }
            }
        },
        'M380': {
            description: {
                normal: 'Activate solenoid'
            },
            parameters: {}
        },
        'M381': {
            description: {
                normal: 'Disable all solenoids'
            },
            parameters: {}
        },
        'M400': {
            description: {
                normal: 'Wait for current moves to finish'
            },
            parameters: {}
        },
        'M401': {
            description: {
                normal: 'Lower z-probe'
            },
            parameters: {}
        },
        'M402': {
            description: {
                normal: 'Raise z-probe'
            },
            parameters: {}
        },
        'M404': {
            description: {
                normal: 'Filament width and nozzle diameter'
            },
            parameters: {
                'D': {
                    normal: ' nozzle diameter (in mm): '
                }
            }
        },
        'M405': {
            description: {
                normal: 'Filament Sensor on'
            },
            parameters: {}
        },
        'M406': {
            description: {
                normal: 'Filament Sensor off'
            },
            parameters: {}
        },
        'M407': {
            description: {
                normal: 'Display filament diameter'
            },
            parameters: {}
        },
        'M408': {
            description: {
                normal: 'Report JSON-style response'
            },
            parameters: {
                'S': {
                    normal: ' response type: '
                },
                'R': {
                    normal: ' response sequence #: '
                }
            }
        },
        'M420': {
            description: {
                normal: 'Set RGB Colors as PWM/Enable/Disable Mesh Leveling'
            },
            parameters: {
                'R': {
                    normal: ' red PWM: '
                },
                'S': {
                    normal: ' 1=enable,0=disable: '
                },
                'B': {
                    normal: ' blue PWM: '
                },
                'E': {
                    normal: ' green PWM: '
                }
            }
        },
        'M421': {
            description: {
                normal: 'Set a Mesh Bed Leveling Z coordinate'
            },
            parameters: {
                'Y': {
                    normal: ' index: '
                },
                'X': {
                    normal: ' index: '
                },
                'Z': {
                    normal: ' offset (in mm): '
                }
            }
        },
        'M450': {
            description: {
                normal: 'Report Printer Mode'
            },
            parameters: {}
        },
        'M451': {
            description: {
                normal: 'Select FFF Printer Mode'
            },
            parameters: {}
        },
        'M452': {
            description: {
                normal: 'Select Laser Printer Mode'
            },
            parameters: {}
        },
        'M453': {
            description: {
                normal: 'Select CNC Printer Mode'
            },
            parameters: {}
        },
        'M460': {
            description: {
                normal: ' Define temperature range for thermistor controlled fan'
            },
            parameters: {
                'Y': {
                    normal: ' max temp: '
                },
                'X': {
                    normal: ' min temp: '
                }
            }
        },
        'M500': {
            description: {
                normal: 'Store parameters in EEPROM'
            },
            parameters: {}
        },
        'M501': {
            description: {
                normal: 'Read parameters from EEPROM'
            },
            parameters: {
                'S': {
                    normal: ' enable auto-save: '
                }
            }
        },
        'M502': {
            description: {
                normal: 'Revert to the default factory settings'
            },
            parameters: {}
        },
        'M503': {
            description: {
                normal: 'Print settings'
            },
            parameters: {}
        },
        'M530': {
            description: {
                normal: 'Enable printing mode'
            },
            parameters: {
                'S': {
                    normal: ' 1=started, 0=ended: '
                },
                'L': {
                    normal: ' # of layers: '
                }
            }
        },
        'M531': {
            description: {
                normal: 'Set print name'
            },
            parameters: {}
        },
        'M532': {
            description: {
                normal: 'Set print progress'
            },
            parameters: {
                'X': {
                    normal: ' print progress: '
                },
                'L': {
                    normal: ' printed layer: '
                }
            }
        },
        'M540': {
            description: {
                normal: 'Enable/Disable Stop SD Print on Endstop Hit/Set MAC address'
            },
            parameters: {
                'P': {
                    normal: ' MAC address: '
                },
                'S': {
                    normal: ' 1=enable, 0=disable: '
                }
            }
        },
        'M550': {
            description: {
                normal: 'Set Name'
            },
            parameters: {
                'P': {
                    normal: ' machine name: '
                }
            }
        },
        'M551': {
            description: {
                normal: 'Set Password'
            },
            parameters: {
                'P': {
                    normal: ' password: '
                }
            }
        },
        'M552': {
            description: {
                normal: 'Set IP address, enable/disable network interface'
            },
            parameters: {
                'P': {
                    normal: ' IP address: '
                },
                'S': {
                    normal: ' disable/enable networking: '
                },
                'R': {
                    normal: ' HTTP port: '
                }
            }
        },
        'M553': {
            description: {
                normal: 'Set Netmask'
            },
            parameters: {
                'P': {
                    normal: ' net mask: '
                }
            }
        },
        'M554': {
            description: {
                normal: 'Set Gateway'
            },
            parameters: {
                'P': {
                    normal: ' gateway: '
                }
            }
        },
        'M555': {
            description: {
                normal: 'Set compatibility'
            },
            parameters: {
                'P': {
                    normal: ' emulation type: '
                }
            }
        },
        'M556': {
            description: {
                normal: 'Axis compensation'
            },
            parameters: {
                'Y': {
                    normal: ' deviation in Y: '
                },
                'X': {
                    normal: ' deviation in X: '
                },
                'S': {
                    normal: ' height of distances: '
                },
                'Z': {
                    normal: ' deviation in Z: '
                }
            }
        },
        'M557': {
            description: {
                normal: 'Set Z probe point or define probing grid'
            },
            parameters: {
                'Y': {
                    normal: ' Y coordinate: '
                },
                'P': {
                    normal: ' probe point #: '
                },
                'X': {
                    normal: ' X coordinate: '
                }
            }
        },
        'M558': {
            description: {
                normal: 'Set Z probe type'
            },
            parameters: {
                'F': {
                    normal: ' feed rate: '
                },
                'I': {
                    normal: ' invert (I1)/do not invert (I0) reading: '
                },
                'H': {
                    normal: ' dive height (in mm): '
                },
                'P': {
                    normal: ' Z probe type: '
                },
                'S': {
                    normal: ' extra for experimentation: '
                },
                'R': {
                    normal: ' recovery time: '
                },
                'T': {
                    normal: ' travel speed: '
                },
                'Y': {
                    normal: ' If nonzero, use probe for homing Y axis: '
                },
                'X': {
                    normal: ' If nonzero, use probe for homing X axis: '
                },
                'Z': {
                    normal: ' If nonzero, use probe for homing Z axis: '
                }
            }
        },
        'M559': {
            description: {
                normal: 'Upload configuration file'
            },
            parameters: {}
        },
        'M560': {
            description: {
                normal: 'Upload web page file'
            },
            parameters: {}
        },
        'M561': {
            description: {
                normal: 'Set Identity Transform'
            },
            parameters: {}
        },
        'M562': {
            description: {
                normal: 'Reset temperature fault'
            },
            parameters: {
                'P': {
                    normal: ' heater #: '
                }
            }
        },
        'M563': {
            description: {
                normal: 'Define or remove a tool'
            },
            parameters: {
                'H': {
                    normal: ' heater(s): '
                },
                'X': {
                    normal: ' axis: '
                },
                'D': {
                    normal: ' extruder drive(s): '
                },
                'P': {
                    normal: ' tool #: '
                },
                'F': {
                    normal: ' fan(s): '
                }
            }
        },
        'M564': {
            description: {
                normal: 'Limit axes'
            },
            parameters: {
                'S': {
                    normal: ' axis boundaries: '
                }
            }
        },
        'M565': {
            description: {
                normal: 'Set Z probe offset'
            },
            parameters: {
                'Y': {
                    normal: ' Y offset: '
                },
                'X': {
                    normal: ' X offset: '
                },
                'Z': {
                    normal: ' Z offset: '
                }
            }
        },
        'M566': {
            description: {
                normal: 'Set allowable instantaneous speed change'
            },
            parameters: {
                'Y': {
                    normal: ' Y axis : '
                },
                'X': {
                    normal: ' X axis (mm/min) : '
                },
                'Z': {
                    normal: ' Z axis : '
                },
                'E': {
                    normal: ' extruder drives : '
                }
            }
        },
        'M567': {
            description: {
                normal: 'Set tool mix ratios'
            },
            parameters: {
                'P': {
                    normal: ' tool #: '
                },
                'E': {
                    normal: ' mix ratios: '
                }
            }
        },
        'M568': {
            description: {
                normal: 'Turn off/on tool mix ratios'
            },
            parameters: {
                'P': {
                    normal: ' tool #: '
                },
                'S': {
                    normal: ' 0=off,non-zero=on: '
                }
            }
        },
        'M569': {
            description: {
                normal: 'Set axis direction and enable values'
            },
            parameters: {
                'P': {
                    normal: ' motor driver #: '
                },
                'S': {
                    normal: ' direction- 0=backwards,1=forwards: '
                },
                'R': {
                    normal: ' driver enable polarity- 0=active low,1=active high: '
                },
                'T': {
                    normal: ' min driver step pulse width & interval (in micro s): '
                }
            }
        },
        'M570': {
            description: {
                normal: 'Configure heater fault detection'
            },
            parameters: {
                'H': {
                    normal: ' heater #: '
                },
                'S': {
                    normal: ' heater timeout (in s): '
                },
                'T': {
                    normal: ' temp: '
                },
                'P': {
                    normal: ' time (in s): '
                }
            }
        },
        'M571': {
            description: {
                normal: 'Set output on extrude'
            },
            parameters: {
                'P': {
                    normal: ' logical pin #: '
                },
                'S': {
                    normal: ' output value: '
                },
                'F': {
                    normal: ' output PWM frequency: '
                }
            }
        },
        'M572': {
            description: {
                normal: 'Set or report extruder pressure advance'
            },
            parameters: {
                'S': {
                    normal: ' pressure advance amount (in s): '
                },
                'D': {
                    normal: ' extruder #: '
                }
            }
        },
        'M573': {
            description: {
                normal: 'Report heater PWM'
            },
            parameters: {
                'P': {
                    normal: ' heater #: '
                }
            }
        },
        'M574': {
            description: {
                normal: 'Set endstop configuration'
            },
            parameters: {
                'Y': {
                    normal: ' Y axis: '
                },
                'X': {
                    normal: ' X axis: '
                },
                'S': {
                    normal: ' logic level: '
                },
                'Z': {
                    normal: ' Z axis: '
                },
                'E': {
                    normal: ' extruder endstops (low/high): '
                }
            }
        },
        'M575': {
            description: {
                normal: 'Set serial comms parameters'
            },
            parameters: {
                'P': {
                    normal: ' serial channel #: '
                },
                'S': {
                    normal: ' checksums: '
                },
                'B': {
                    normal: ' baud rate: '
                }
            }
        },
        'M577': {
            description: {
                normal: 'Wait until endstop is triggered'
            },
            parameters: {
                'Y': {
                    normal: ' Y axis: '
                },
                'X': {
                    normal: ' X axis: '
                },
                'S': {
                    normal: ' endstop level: '
                },
                'Z': {
                    normal: ' Z axis: '
                },
                'E': {
                    normal: ' extruder drive: '
                }
            }
        },
        'M578': {
            description: {
                normal: 'Fire inkjet bits'
            },
            parameters: {
                'P': {
                    normal: ' inkjet head #: '
                },
                'S': {
                    normal: ' bit pattern: '
                }
            }
        },
        'M579': {
            description: {
                normal: 'Scale Cartesian axes'
            },
            parameters: {
                'Y': {
                    normal: ' Y axis: '
                },
                'X': {
                    normal: ' X axis: '
                },
                'Z': {
                    normal: ' Z axis: '
                }
            }
        },
        'M580': {
            description: {
                normal: 'Select Roland'
            },
            parameters: {
                'P': {
                    normal: ' initial text: '
                },
                'R': {
                    normal: ' toggle activation: '
                }
            }
        },
        'M581': {
            description: {
                normal: 'Configure external trigger'
            },
            parameters: {
                'C': {
                    normal: ' condition: '
                },
                'E': {
                    normal: ' endstop input(s) to monitor: '
                },
                'P': {
                    normal: ' reserved: '
                },
                'S': {
                    normal: ' rising/falling edge: '
                },
                'T': {
                    normal: ' logical trigger #: '
                },
                'Y': {
                    normal: ' endstop input(s) to monitor: '
                },
                'X': {
                    normal: ' endstop input(s) to monitor: '
                },
                'Z': {
                    normal: ' endstop input(s) to monitor: '
                }
            }
        },
        'M582': {
            description: {
                normal: 'Check external trigger'
            },
            parameters: {
                'T': {
                    normal: ' trigger #: '
                }
            }
        },
        'M583': {
            description: {
                normal: 'Wait for pin'
            },
            parameters: {
                'P': {
                    normal: ' pin #: '
                },
                'S': {
                    normal: ' state: '
                },
                'R': {
                    normal: ' analog value: '
                }
            }
        },
        'M584': {
            description: {
                normal: 'Set drive mapping'
            },
            parameters: {
                'E': {
                    normal: ' E motor(s): '
                },
                'S': {
                    normal: ' special functions: '
                },
                'U': {
                    normal: ' U axes: '
                },
                'W': {
                    normal: ' W axes: '
                },
                'V': {
                    normal: ' V axes: '
                },
                'Y': {
                    normal: ' Y motor(s): '
                },
                'X': {
                    normal: ' driver number(s) for X motor(s): '
                },
                'Z': {
                    normal: ' Z motor(s): '
                }
            }
        },
        'M585': {
            description: {
                normal: 'Probe Tool'
            },
            parameters: {
                'Y': {
                    normal: ' Y offset: '
                },
                'X': {
                    normal: ' X offset: '
                },
                'Z': {
                    normal: ' Z offset: '
                }
            }
        },
        'M586': {
            description: {
                normal: 'Configure network protocols'
            },
            parameters: {
                'P': {
                    normal: ' protocol: '
                },
                'S': {
                    normal: ' 0=disable,1=enable: '
                },
                'R': {
                    normal: ' TCP port #: '
                },
                'T': {
                    normal: " 0=don't use,1=use TLS: "}
                }
            },
        'M587': {
            description: {
                normal: 'Store WiFi host network in list, or list stored networks'
            },
            parameters: {
                'I': {
                    normal: ' IP address: '
                },
                'P': {
                    normal: ' network password: '
                },
                'K': {
                    normal: ' Netmask: '
                },
                'J': {
                    normal: ' Gateway IP address: '
                },
                'S': {
                    normal: ' network SSID: '
                }
            }
        },
        'M588': {
            description: {
                normal: 'Forget WiFi host network'
            },
            parameters: {
                'S': {
                    normal: ' SSID to remove: '
                }
            }
        },
        'M589': {
            description: {
                normal: 'Configure access point parameters'
            },
            parameters: {
                'I': {
                    normal: ' IP address: '
                },
                'P': {
                    normal: ' WiFi password: '
                },
                'S': {
                    normal: ' SSID: '
                }
            }
        },
        'M590': {
            description: {
                normal: 'Report current tool type and index'
            },
            parameters: {}
        },
        'M600': {
            description: {
                normal: 'Set line cross section/Filament change pause'
            },
            parameters: {
                'Y': {
                    normal: ' Y pos: '
                },
                'X': {
                    normal: ' X pos: '
                },
                'Z': {
                    normal: ' relative lift: '
                },
                'E': {
                    normal: ' initial retract: '
                },
                'L': {
                    normal: ' later retract distance for removal: '
                }
            }
        },
        'M605': {
            description: {
                normal: 'Set dual x-carriage movement mode'
            },
            parameters: {
                'X': {
                    normal: ' duplication x-offset: '
                },
                'S': {
                    normal: ' mode: '
                },
                'R': {
                    normal: ' duplication temp offset: '
                }
            }
        },
        'M665': {
            description: {
                normal: ' Set delta configuration'
            },
            parameters: {
                'B': {
                    normal: ' safe probing radius: '
                },
                'H': {
                    normal: ' delta height: '
                },
                'L': {
                    normal: ' diagonal rod length: '
                },
                'S': {
                    normal: ' segments per second: '
                },
                'R': {
                    normal: ' delta radius: '
                },
                'Y': {
                    normal: ' Y tower pos correction: '
                },
                'X': {
                    normal: ' X tower pos correction: '
                },
                'Z': {
                    normal: ' Z tower pos correction: '
                }
            }
        },
        'M666': {
            description: {
                normal: 'Set delta endstop adjustment'
            },
            parameters: {
                'A': {
                    normal: ' X bed tilt %: '
                },
                'Y': {
                    normal: ' Y axis: '
                },
                'B': {
                    normal: ' Y bed tilt %: '
                },
                'Z': {
                    normal: ' Z axis: '
                },
                'X': {
                    normal: ' X axis: '
                }
            }
        },
        'M667': {
            description: {
                normal: 'Select CoreXY mode'
            },
            parameters: {
                'Y': {
                    normal: ' Y axis scale factor: '
                },
                'X': {
                    normal: ' X axis scale factor: '
                },
                'S': {
                    normal: ' coreXY mode: '
                },
                'Z': {
                    normal: ' Z axis scale factor: '
                }
            }
        },
        'M668': {
            description: {
                normal: 'Set Z-offset compensations polynomial'
            },
            parameters: {}
        },
        'M669': {
            description: {
                normal: 'Set SCARA mode and arm parameters'
            },
            parameters: {
                'A': {
                    normal: ' proximal arm joint min/max angles: '
                },
                'C': {
                    normal: ' proximal-to-distal crosstalk factor: '
                },
                'B': {
                    normal: ' proximal-to-distal arm joint min/max angles: '
                },
                'D': {
                    normal: ' distal arm length (mm): '
                },
                'L': {
                    normal: ' min segment length (mm): '
                },
                'P': {
                    normal: ' proximal arm length (mm): '
                },
                'S': {
                    normal: ' segments per second: '
                }
            }
        },
        'M700': {
            description: {
                normal: 'Level plate'
            },
            parameters: {}
        },
        'M701': {
            description: {
                normal: 'Load filament'
            },
            parameters: {}
        },
        'M702': {
            description: {
                normal: 'Unload filament'
            },
            parameters: {}
        },
        'M703': {
            description: {
                normal: 'Get Board Type'
            },
            parameters: {}
        },
        'M710': {
            description: {
                normal: 'Erase the EEPROM and reset the board'
            },
            parameters: {}
        },
        'M750': {
            description: {
                normal: 'Enable 3D scanner extension'
            },
            parameters: {}
        },
        'M751': {
            description: {
                normal: 'Register 3D scanner extension over USB'
            },
            parameters: {}
        },
        'M752': {
            description: {
                normal: 'Start 3D scan'
            },
            parameters: {
                'P': {
                    normal: ' filename: '
                },
                'S': {
                    normal: ' length/degrees: '
                }
            }
        },
        'M753': {
            description: {
                normal: 'Cancel current 3D scanner action'
            },
            parameters: {}
        },
        'M754': {
            description: {
                normal: 'Calibrate 3D scanner'
            },
            parameters: {}
        },
        'M755': {
            description: {
                normal: 'Set alignment mode for 3D scanner'
            },
            parameters: {
                'P': {
                    normal: ' turn on (> 0) or off (<= 0): '
                }
            }
        },
        'M756': {
            description: {
                normal: 'Shutdown 3D scanner'
            },
            parameters: {}
        },
        'M800': {
            description: {
                normal: 'Fire start print procedure'
            },
            parameters: {}
        },
        'M801': {
            description: {
                normal: 'Fire end print procedure'
            },
            parameters: {}
        },
        'M851': {
            description: {
                normal: 'Set Z-Probe Offset'
            },
            parameters: {
                'Z': {
                    normal: ' offset: '
                }
            }
        },
        'M900': {
            description: {
                normal: 'Set Linear Advance Scaling Factors'
            },
            parameters: {
                'H': {
                    normal: ' height: '
                },
                'K': {
                    normal: ' factor: '
                },
                'R': {
                    normal: ' ratio: '
                },
                'D': {
                    normal: ' diam: '
                },
                'W': {
                    normal: ' width: '
                }
            }
        },
        'M905': {
            description: {
                normal: 'Set local date and time'
            },
            parameters: {
                'P': {
                    normal: ' date: '
                },
                'S': {
                    normal: ' time: '
                }
            }
        },
        'M906': {
            description: {
                normal: 'Set motor currents'
            },
            parameters: {
                'E': {
                    normal: ' E drive(s): '
                },
                'I': {
                    normal: ' idle factor: '
                },
                'H': {
                    normal: ' set/get motor currents for the downward Z-probe homing: '
                },
                'Y': {
                    normal: ' Y drive: '
                },
                'X': {
                    normal: ' X drive: '
                },
                'Z': {
                    normal: ' Z drive: '
                }
            }
        },
        'M907': {
            description: {
                normal: 'Set digital trimpot motor'
            },
            parameters: {
                'B': {
                    normal: ' axis code (in % or amps): '
                },
                'E': {
                    normal: ' axis code (in % or amps): '
                },
                'S': {
                    normal: ' axis code (in % or amps): '
                },
                'Y': {
                    normal: ' axis code (in % or amps): '
                },
                'X': {
                    normal: ' axis code (in % or amps): '
                },
                'Z': {
                    normal: ' axis code (in % or amps): '
                }
            }
        },
        'M908': {
            description: {
                normal: 'Control digital trimpot directly'
            },
            parameters: {
                'P': {
                    normal: ' pin: '
                },
                'S': {
                    normal: ' current: '
                }
            }
        },
        'M909': {
            description: {
                normal: 'Set microstepping'
            },
            parameters: {
                'Y': {
                    normal: ' Y stepper: '
                },
                'X': {
                    normal: ' X stepper: '
                },
                'Z': {
                    normal: ' Z stepper: '
                },
                'E': {
                    normal: ' E stepper: '
                }
            }
        },
        'M910': {
            description: {
                normal: 'Set decay mode'
            },
            parameters: {
                'Y': {
                    normal: ' Y stepper: '
                },
                'X': {
                    normal: ' X stepper: '
                },
                'Z': {
                    normal: ' Z stepper: '
                },
                'E': {
                    normal: ' E stepper: '
                }
            }
        },
        'M911': {
            description: {
                normal: 'Set power monitor threshold voltages'
            },
            parameters: {
                'P': {
                    normal: ' power monitor channel: '
                },
                'S': {
                    normal: ' undervoltage threshold: '
                },
                'T': {
                    normal: ' overvoltage threshold: '
                }
            }
        },
        'M912': {
            description: {
                normal: 'Set electronics temperature monitor adjustment'
            },
            parameters: {
                'P': {
                    normal: ' temp monitor channel: '
                },
                'S': {
                    normal: ' value to add to temp (in C): '
                }
            }
        },
        'M913': {
            description: {
                normal: 'Set motor percentage of normal current'
            },
            parameters: {
                'Y': {
                    normal: ' % current for Y motor: '
                },
                'X': {
                    normal: ' % current for X motor: '
                },
                'Z': {
                    normal: ' % current for Z motor: '
                },
                'E': {
                    normal: ' % current for extruders: '
                }
            }
        },
        'M928': {
            description: {
                normal: 'Start SD logging'
            },
            parameters: {}
        },
        'M997': {
            description: {
                normal: 'Perform in-application firmware update'
            },
            parameters: {
                'S': {
                    normal: ' firmware module number(s): '
                }
            }
        },
        'M998': {
            description: {
                normal: 'Request resend of line'
            },
            parameters: {
                'P': {
                    normal: ' line #: '
                }
            }
        },
        'M999': {
            description: {
                normal: 'Restart after being stopped by error'
            },
            parameters: {
                'P': {
                    normal: ' reset flags: '
                }
            }
        }
    }
}(window.gcodeDictionary = window.gcodeDictionary || {}))
