(function (gcodeDictionary, undefined) {
    gcodeDictionary.count = {}

    gcodeDictionary.dictionary = {
        'G0': {
            description: {
                simple: 'Move',
                normal: 'Move (rapid linear)'
            },
            parameters: {
                'e': {
                    simple: ' extrude: ',
                    normal: ' extrude amount: '
                },
                'f': {
                    simple: ' feed: ',
                    normal: ' feed rate: '
                },
                's': {
                    simple: ' flag: ',
                    normal: ' endstop flag: '
                },
                'y': {
                    simple: ' Y: ',
                    normal: ' to Y axis pos: '
                },
                'x': {
                    simple: ' X: ',
                    normal: ' to X axis pos: '
                },
                'z': {
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
                'e': {
                    simple: ' extrude: ',
                    normal: ' extrude amount: '
                },
                'f': {
                    simple: ' feed: ',
                    normal: ' feed rate: '
                },
                's': {
                    simple: ' flag: ',
                    normal: ' endstop flag: '
                },
                'y': {
                    simple: ' Y: ',
                    normal: ' to Y axis pos: '
                },
                'x': {
                    simple: ' X: ',
                    normal: ' to X axis pos: '
                },
                'z': {
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
                'e': {
                    simple: ' extrude: ',
                    normal: ' extrude amount: '
                },
                'f': {
                    simple: ' feed: ',
                    normal: ' feed rate: '
                },
                'i': {
                    simple: ' X dist: ',
                    normal: ' distance to maintain from (X space): '
                },
                'j': {
                    simple: ' Y dist: ',
                    normal: ' distance to maintain from (Y space): '
                },
                'y': {
                    simple: ' Y: ',
                    normal: ' to Y axis pos: '
                },
                'x': {
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
                'e': {
                    simple: ' extrude: ',
                    normal: ' extrude amount: '
                },
                'f': {
                    simple: ' feed: ',
                    normal: ' feed rate: '
                },
                'i': {
                    simple: ' X dist: ',
                    normal: ' distance to maintain from (X space): '
                },
                'j': {
                    simple: ' Y dist: ',
                    normal: ' distance to maintain from (Y space): '
                },
                'y': {
                    simple: ' Y: ',
                    normal: ' to Y axis pos: '
                },
                'x': {
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
                'p': {
                    simple: ' wait: ',
                    normal: ' wait time (in ms): '
                },
                's': {
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
                'a': {
                    simple: ' A: ',
                    normal: ' Stepper A pos/angle: '
                },
                'c': {
                    simple: ' C: ',
                    normal: ' Stepper C pos/angle: '
                },
                'b': {
                    simple: ' B: ',
                    normal: ' Stepper B pos/angle: '
                },
                'r': {
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
                'e': {
                    simple: ' Z: ',
                    normal: ' Z offset: '
                },
                'p': {
                    simple: ' tool #: ',
                    normal: ' tool #: '
                },
                's': {
                    simple: ' temp or length: ',
                    normal: ' active temperature(s) or retract length: '
                },
                'r': {
                    simple: ' temp: ',
                    normal: ' standby temperature(s): '
                },
                'u': {
                    simple: ' U, V and W: ',
                    normal: ' U, V and W axis offsets: '
                },
                'y': {
                    simple: ' Y: ',
                    normal: ' Y offset: '
                },
                'x': {
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
                's': {
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
                'y': {
                    simple: ' flag ',
                    normal: ' flag to go back to the Y axis origin '
                },
                'x': {
                    simple: ' flag ',
                    normal: ' flag to go back to the X axis origin '
                },
                'z': {
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
                's': {
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
                'y': {
                    simple: ' Y: ',
                    normal: ' Y offset: '
                },
                'x': {
                    simple: ' X: ',
                    normal: ' X offset: '
                },
                'z': {
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
                'z': {
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
                'h': {
                    simple: ' height: ',
                    normal: ' height correction: '
                },
                'p': {
                    simple: ' probe point #: ',
                    normal: ' probe point #: '
                },
                's': {
                    simple: ' set parameter: ',
                    normal: ' set parameter: '
                },
                'y': {
                    simple: ' Y: ',
                    normal: ' Y coordinate: '
                },
                'x': {
                    simple: ' X: ',
                    normal: ' X coordinate: '
                },
                'z': {
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
                'c': {
                    simple: ' temp co: ',
                    normal: ' temperature coefficient: '
                },
                'p': {
                    simple: ' trigger value: ',
                    normal: ' trigger value: '
                },
                's': {
                    simple: ' temp: ',
                    normal: ' calibration temperature: '
                },
                't': {
                    simple: ' type: ',
                    normal: ' Z probe type: '
                },
                'y': {
                    simple: ' Y: ',
                    normal: ' probe Y offset: '
                },
                'x': {
                    simple: ' X: ',
                    normal: ' probe X offset: '
                },
                'z': {
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
                'p': {
                    simple: ' method: ',
                    normal: ' bed correction method: '
                },
                's': {
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
                'y': {
                    simple: ' Y: ',
                    normal: ' Y correction: '
                },
                'x': {
                    simple: ' X: ',
                    normal: ' X correction: '
                },
                'r': {
                    simple: ' reset R0: ',
                    normal: ' reset distortion matrix(R0): '
                },
                'l': {
                    simple: ' list L0: ',
                    normal: ' list distortion matrix(L0): '
                },
                'z': {
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
                's': {
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
                'e': {
                    simple: ' E: ',
                    normal: ' E coordinate: '
                },
                'f': {
                    simple: ' feed: ',
                    normal: ' F set feedrate: '
                },
                's': {
                    simple: ' memory slot #: ',
                    normal: ' memory slot #: '
                },
                'y': {
                    simple: ' Y: ',
                    normal: ' Y coordinate: '
                },
                'x': {
                    simple: ' X: ',
                    normal: ' X coordinate: '
                },
                'z': {
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
                'y': {
                    simple: ' new Y: ',
                    normal: ' new Y axis pos: '
                },
                'x': {
                    simple: ' new X: ',
                    normal: ' new X axis pos: '
                },
                'z': {
                    simple: ' new Z: ',
                    normal: ' new Z axis pos: '
                },
                'e': {
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
                'y': {
                    simple: ' flag ',
                    normal: ' flag to set floor for Y axis '
                },
                'x': {
                    simple: ' flag ',
                    normal: ' flag to set floor for X axis '
                },
                'r': {
                    simple: ' radius: ',
                    normal: ' radius to add: '
                },
                'z': {
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
                'a': {
                    simple: ' A: ',
                    normal: ' to A axis pos: '
                },
                'y': {
                    simple: ' Y: ',
                    normal: ' to Y axis pos: '
                },
                'b': {
                    simple: ' B: ',
                    normal: ' to B axis pos: '
                },
                'z': {
                    simple: ' Z: ',
                    normal: ' to Z axis pos: '
                },
                'x': {
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
                'y': {
                    simple: ' flag ',
                    normal: ' flag to home Y axis to min '
                },
                'x': {
                    simple: ' flag ',
                    normal: ' flag to home X axis to min '
                },
                'z': {
                    simple: ' flag ',
                    normal: ' flag to home Z axis to min '
                },
                'f': {
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
                'y': {
                    simple: ' flag ',
                    normal: ' flag to home Y axis to max '
                },
                'x': {
                    simple: ' flag ',
                    normal: ' flag to home X axis to max '
                },
                'z': {
                    simple: ' flag ',
                    normal: ' flag to home Z axis to max '
                },
                'f': {
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
                'p': {
                    normal: ' wait time (in ms): '
                },
                's': {
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
                'y': {
                    normal: ' Y axis: '
                },
                'x': {
                    normal: ' X axis: '
                },
                'z': {
                    normal: ' Z axis: '
                },
                'e': {
                    normal: ' extruder drive(s): '
                }
            }
        },
        'M20': {
            description: {
                normal: 'List SD card'
            },
            parameters: {
                'p': {
                    normal: ' directory to list: '
                },
                's': {
                    normal: ' output style: '
                }
            }
        },
        'M21': {
            description: {
                normal: 'Initialize SD card'
            },
            parameters: {
                'p': {
                    normal: ' SD card #: '
                }
            }
        },
        'M22': {
            description: {
                normal: 'Release SD card'
            },
            parameters: {
                'p': {
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
                's': {
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
                's': {
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
                'p': {
                    normal: ' pin #: '
                },
                's': {
                    normal: ' pin value: '
                }
            }
        },
        'M43': {
            description: {
                normal: 'Stand by on material exhausted/Pin report and debug'
            },
            parameters: {
                'i': {
                    normal: ' flag to ignore pin protection: '
                },
                'p': {
                    normal: ' pin to read or watch: '
                },
                'e': {
                    normal: ' toggle background endstop monitoring: '
                },
                'w': {
                    normal: ' watch pins: '
                }
            }
        },
        'M48': {
            description: {
                normal: 'Measure Z-Probe repeatability'
            },
            parameters: {
                'e': {
                    normal: ' engage '
                },
                'l': {
                    normal: ' legs of travel: '
                },
                'p': {
                    normal: ' # of points: '
                },
                's': {
                    normal: ' schizoid '
                },
                'v': {
                    normal: ' verbosity: '
                },
                'y': {
                    normal: ' pos on the Y axis: '
                },
                'x': {
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
                'p': {
                    normal: ' song ID: '
                }
            }
        },
        'M73': {
            description: {
                normal: 'Set build percentage'
            },
            parameters: {
                'p': {
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
                'i': {
                    normal: ' reset flags: '
                }
            }
        },
        'M85': {
            description: {
                normal: 'Set inactivity shutdown timer'
            },
            parameters: {
                's': {
                    normal: ' seconds: '
                }
            }
        },
        'M92': {
            description: {
                normal: 'Set axis_steps_per_unit'
            },
            parameters: {
                'y': {
                    normal: ' Y drive: '
                },
                'x': {
                    normal: ' X drive: '
                },
                'z': {
                    normal: ' Z drive: '
                },
                'e': {
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
                'p': {
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
                's': {
                    normal: ' target temperature: '
                }
            }
        },
        'M105': {
            description: {
                normal: 'Get Extruder Temperature'
            },
            parameters: {
                's': {
                    normal: ' response type: '
                },
                'r': {
                    normal: ' response sequence #: '
                }
            }
        },
        'M106': {
            description: {
                normal: 'Fan On'
            },
            parameters: {
                'b': {
                    normal: ' blip time: '
                },
                'f': {
                    normal: ' frequency (in Hz): '
                },
                'i': {
                    normal: ' disable fan: '
                },
                'h': {
                    normal: ' select heaters: '
                },
                'l': {
                    normal: ' min fan speed: '
                },
                'p': {
                    normal: ' fan #: '
                },
                's': {
                    normal: ' fan speed: '
                },
                'r': {
                    normal: ' restore speed: '
                },
                't': {
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
                's': {
                    normal: ' min target temp: '
                },
                'r': {
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
                'p': {
                    normal: ' debug module: '
                },
                's': {
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
                's': {
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
                'p': {
                    normal: ' electronics type: '
                }
            }
        },
        'M116': {
            description: {
                normal: 'Wait'
            },
            parameters: {
                'h': {
                    normal: ' heater #: '
                },
                'c': {
                    normal: ' chamber #: '
                },
                'p': {
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
                'p': {
                    normal: ' wait (in ms): '
                },
                't': {
                    normal: ' toolhead: '
                }
            }
        },
        'M127': {
            description: {
                normal: 'Close Valve'
            },
            parameters: {
                'p': {
                    normal: ' wait (in ms): '
                },
                't': {
                    normal: ' toolhead: '
                }
            }
        },
        'M128': {
            description: {
                normal: 'Extruder Pressure PWM'
            },
            parameters: {
                's': {
                    normal: ' pressure: '
                }
            }
        },
        'M129': {
            description: {
                normal: 'Extruder pressure off'
            },
            parameters: {
                'p': {
                    normal: ' wait (in ms): '
                }
            }
        },
        'M130': {
            description: {
                normal: 'Set PID P value'
            },
            parameters: {
                'p': {
                    normal: ' heater #: '
                },
                's': {
                    normal: ' proportional (Kp): '
                }
            }
        },
        'M131': {
            description: {
                normal: 'Set PID I value'
            },
            parameters: {
                'p': {
                    normal: ' heater #: '
                },
                's': {
                    normal: ' integral (Ki): '
                }
            }
        },
        'M132': {
            description: {
                normal: 'Set PID D value'
            },
            parameters: {
                'a': {
                    normal: ' A axis offset: '
                },
                'b': {
                    normal: ' B axis offset: '
                },
                'p': {
                    normal: ' heater #: '
                },
                's': {
                    normal: ' derivative (Kd): '
                },
                'y': {
                    normal: ' Y axis offset: '
                },
                'x': {
                    normal: ' X axis offset: '
                },
                'z': {
                    normal: ' Z axis offset: '
                }
            }
        },
        'M133': {
            description: {
                normal: 'Set PID I limit value'
            },
            parameters: {
                'p': {
                    normal: ' heater #/wait time: '
                },
                's': {
                    normal: ' integral limit (Ki): '
                },
                't': {
                    normal: ' extruder to wait for: '
                }
            }
        },
        'M134': {
            description: {
                normal: 'Write PID values to EEPROM'
            },
            parameters: {
                'p': {
                    normal: ' time limit: '
                },
                't': {
                    normal: ' platform to wait for: '
                }
            }
        },
        'M135': {
            description: {
                normal: 'Set PID sample interval'
            },
            parameters: {
                's': {
                    normal: ' heat sample time (in s): '
                },
                't': {
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
                'h': {
                    normal: ' heater #: '
                },
                's': {
                    normal: ' target temperature: '
                }
            }
        },
        'M141': {
            description: {
                normal: 'Set Chamber Temperature (Fast)'
            },
            parameters: {
                'h': {
                    normal: ' heater #: '
                },
                's': {
                    normal: ' target temperature: '
                }
            }
        },
        'M142': {
            description: {
                normal: 'Holding Pressure'
            },
            parameters: {
                's': {
                    normal: ' holding pressure of the bed: '
                }
            }
        },
        'M143': {
            description: {
                normal: 'Max heater temperature'
            },
            parameters: {
                'h': {
                    normal: ' heater #: '
                },
                's': {
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
                'r': {
                    normal: ' relative humidity (in percent): '
                }
            }
        },
        'M149': {
            description: {
                normal: 'Set temperature units'
            },
            parameters: {
                'c': {
                    normal: ' Flag to treat temperature as Celsius '
                },
                'k': {
                    normal: ' Flag to treat temperature as Kelvin '
                }
            }
        },
        'M150': {
            description: {
                normal: 'Set display color'
            },
            parameters: {
                'r': {
                    normal: ' red: '
                },
                'b': {
                    normal: ' blue: '
                },
                'u': {
                    normal: ' green: '
                }
            }
        },
        'M155': {
            description: {
                normal: 'Automatically send temperatures'
            },
            parameters: {
                's': {
                    normal: ' enable(1)/disable(0): '
                }
            }
        },
        'M160': {
            description: {
                normal: 'Number of mixed materials'
            },
            parameters: {
                's': {
                    normal: ' # of materials: '
                }
            }
        },
        'M163': {
            description: {
                normal: 'Set weight of mixed material'
            },
            parameters: {
                'p': {
                    normal: ' weight: '
                },
                's': {
                    normal: ' extruder #: '
                }
            }
        },
        'M164': {
            description: {
                normal: 'Store weights'
            },
            parameters: {
                'p': {
                    normal: ' store to eeprom (P0 = no, P1 = yes): '
                },
                's': {
                    normal: ' virtual extruder#: '
                }
            }
        },
        'M165': {
            description: {
                normal: 'Set multiple mix weights'
            },
            parameters: {
                'a': {
                    normal: ' mix factor for extruder stepper 1: '
                },
                'c': {
                    normal: ' mix factor for extruder stepper 3: '
                },
                'b': {
                    normal: ' mix factor for extruder stepper 2: '
                },
                'd': {
                    normal: ' mix factor for extruder stepper 4: '
                },
                'i': {
                    normal: ' mix factor for extruder stepper 6: '
                },
                'h': {
                    normal: ' mix factor for extruder stepper 5: '
                }
            }
        },
        'M190': {
            description: {
                normal: 'Wait for bed temp to reach target temp'
            },
            parameters: {
                's': {
                    normal: ' min target temperature: '
                },
                'r': {
                    normal: ' accurate target temperature: '
                }
            }
        },
        'M191': {
            description: {
                normal: 'Wait for chamber temp to reach target temp'
            },
            parameters: {
                's': {
                    normal: ' min target temperature: '
                },
                'r': {
                    normal: ' accurate target temperature: '
                }
            }
        },
        'M200': {
            description: {
                normal: 'Set filament diameter'
            },
            parameters: {
                'd': {
                    normal: ' filament diameter (in mm): '
                }
            }
        },
        'M201': {
            description: {
                normal: 'Set max printing acceleration'
            },
            parameters: {
                'y': {
                    normal: ' acceleration for Y axis: '
                },
                'x': {
                    normal: ' acceleration for X axis: '
                },
                'z': {
                    normal: ' acceleration for Z axis: '
                },
                'e': {
                    normal: ' acceleration for extruder drives: '
                }
            }
        },
        'M202': {
            description: {
                normal: 'Set max travel acceleration'
            },
            parameters: {
                'y': {
                    normal: ' travel moves (in units/s^2): '
                },
                'x': {
                    normal: ' travel moves (in units/s^2): '
                }
            }
        },
        'M203': {
            description: {
                normal: 'Set maximum feedrate'
            },
            parameters: {
                'y': {
                    normal: ' max for Y axis: '
                },
                'x': {
                    normal: ' max for X axis: '
                },
                'z': {
                    normal: ' max for Z axis: '
                },
                'e': {
                    normal: ' max for extruder drives: '
                }
            }
        },
        'M204': {
            description: {
                normal: 'Set default acceleration'
            },
            parameters: {
                'p': {
                    normal: ' printing moves: '
                },
                't': {
                    normal: '  travel moves: '
                }
            }
        },
        'M205': {
            description: {
                normal: 'Advanced settings'
            },
            parameters: {
                'b': {
                    normal: ' min segment time: '
                },
                'e': {
                    normal: ' max E jerk: '
                },
                's': {
                    normal: ' min travel speed/min planner speed: '
                },
                't': {
                    normal: ' travel only '
                },
                'x': {
                    normal: ' max xy jerk/xy junction deviation: '
                },
                'z': {
                    normal: ' max Z jerk/z junction deviation: '
                }
            }
        },
        'M206': {
            description: {
                normal: 'Offset axes/Set eeprom value'
            },
            parameters: {
                'p': {
                    normal: ' pos: '
                },
                's': {
                    normal: ' int (long): '
                },
                't': {
                    normal: ' type: '
                },
                'y': {
                    normal: ' Y axis offset: '
                },
                'x': {
                    normal: ' X axis offset/float: '
                },
                'z': {
                    normal: ' Z axis offset: '
                }
            }
        },
        'M207': {
            description: {
                normal: 'Calibrate z axis/Set retract length'
            },
            parameters: {
                's': {
                    normal: ' positive length to retract (in mm): '
                },
                'r': {
                    normal: ' positive or negative additional length to un-retract (in mm): '
                },
                't': {
                    normal: ' feedrate for un-retraction if different from retraction (in mm/min): '
                },
                'z': {
                    normal: ' additional zlift/hop: '
                },
                'f': {
                    normal: ' retraction feedrate (in mm/min): '
                }
            }
        },
        'M208': {
            description: {
                normal: 'Set axis max travel/Set unretract length'
            },
            parameters: {
                'y': {
                    normal: ' Y axis limit: '
                },
                'x': {
                    normal: ' X axis limit: '
                },
                's': {
                    normal: ' toggle set the axis min/positive length surplus to the M207: '
                },
                'z': {
                    normal: ' Z axis limit: '
                },
                'f': {
                    normal: ' feedrate (in mm/sec): '
                }
            }
        },
        'M209': {
            description: {
                normal: 'Enable automatic retract'
            },
            parameters: {
                's': {
                    normal: ' 1=true or 0=false: '
                }
            }
        },
        'M210': {
            description: {
                normal: 'Set homing feedrates'
            },
            parameters: {
                'y': {
                    normal: ' in mm per minute: '
                },
                'x': {
                    normal: ' in mm per minute: '
                }
            }
        },
        'M211': {
            description: {
                normal: 'Disable/Enable software endstops'
            },
            parameters: {
                'y': {
                    normal: ' 1=max endstop or 0=min endstop: '
                },
                'x': {
                    normal: ' 1=max endstop or 0=min endstop: '
                },
                's': {
                    normal: ' 1=enable or 0=disable: '
                },
                'z': {
                    normal: ' 1=max endstop or 0=min endstop: '
                }
            }
        },
        'M212': {
            description: {
                normal: 'Set Bed Level Sensor Offset'
            },
            parameters: {
                'z': {
                    normal: ' Z home: '
                }
            }
        },
        'M218': {
            description: {
                normal: 'Set Hotend Offset'
            },
            parameters: {
                'y': {
                    normal: ' offset on Y: '
                },
                'x': {
                    normal: ' offset on X: '
                },
                't': {
                    normal: ' extruder #: '
                }
            }
        },
        'M220': {
            description: {
                normal: 'Set speed factor override percentage/Turn off AUX V1.0.5'
            },
            parameters: {
                's': {
                    normal: ' percentage: '
                }
            }
        },
        'M221': {
            description: {
                normal: 'Set extrude factor override percentage/Turn on AUX V1.0.5'
            },
            parameters: {
                's': {
                    normal: ' percentage: '
                },
                'd': {
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
                'p': {
                    normal: ' pin #: '
                },
                's': {
                    normal: ' pin state: '
                }
            }
        },
        'M227': {
            description: {
                normal: 'Enable Automatic Reverse and Prime'
            },
            parameters: {
                'p': {
                    normal: ' steps: '
                },
                's': {
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
                'p': {
                    normal: ' extruder screw rotation: '
                },
                's': {
                    normal: ' extruder screw rotation: '
                }
            }
        },
        'M230': {
            description: {
                normal: ' Disable/Enable Wait for Temperature Change'
            },
            parameters: {
                's': {
                    normal: ' 1=disable or 0=enable: '
                }
            }
        },
        'M231': {
            description: {
                normal: 'Set OPS parameter'
            },
            parameters: {
                'y': {
                    normal: ' retract: '
                },
                'x': {
                    normal: ' min distance: '
                },
                's': {
                    normal: ' OPS_MODE: '
                },
                'z': {
                    normal: ' backslash: '
                },
                'f': {
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
                'c': {
                    normal: ' contrast value: '
                }
            }
        },
        'M251': {
            description: {
                normal: 'Measure Z steps from homing stop'
            },
            parameters: {
                's': {
                    normal: ' 0 =Reset, 1=Print, 2=Store to Z length: '
                }
            }
        },
        'M260': {
            description: {
                normal: 'i2c Send Data'
            },
            parameters: {
                'a': {
                    normal: '  address: '
                },
                's': {
                    normal: '  send and reset buffer '
                },
                'b': {
                    normal: '  add to buffer: '
                }
            }
        },
        'M261': {
            description: {
                normal: 'i2c Request Data'
            },
            parameters: {
                'a': {
                    normal: '  address: '
                },
                'b': {
                    normal: '  bytes: '
                }
            }
        },
        'M280': {
            description: {
                normal: 'Set servo position'
            },
            parameters: {
                'i': {
                    normal: ' 1=invert polarity: '
                },
                'p': {
                    normal: ' servo index: '
                },
                's': {
                    normal: ' angle or microseconds: '
                }
            }
        },
        'M290': {
            description: {
                normal: 'Baby stepping'
            },
            parameters: {
                's': {
                    normal: ' amount (in mm): '
                }
            }
        },
        'M300': {
            description: {
                normal: 'Play beep sound'
            },
            parameters: {
                'p': {
                    normal: ' duration (in ms) '
                },
                's': {
                    normal: ' frequency (in Hz) '
                }
            }
        },
        'M301': {
            description: {
                normal: 'Set PID parameters'
            },
            parameters: {
                'e': {
                    normal: ' heater #: '
                },
                'd': {
                    normal: ' derivative (Kd): '
                },
                'i': {
                    normal: ' integral (Ki): '
                },
                'h': {
                    normal: ' heater #: '
                },
                'p': {
                    normal: ' proportional (Kp): '
                },
                's': {
                    normal: ' heater #: '
                }
            }
        },
        'M302': {
            description: {
                normal: 'Allow cold extrudes'
            },
            parameters: {
                'p': {
                    normal: ' allow state: '
                },
                's': {
                    normal: ' min temp: '
                }
            }
        },
        'M303': {
            description: {
                normal: 'Run PID tuning'
            },
            parameters: {
                'c': {
                    normal: ' cycles: '
                },
                's': {
                    normal: ' temperature: '
                }
            }
        },
        'M304': {
            description: {
                normal: 'Set PID parameters-Bed'
            },
            parameters: {
                'i': {
                    normal: ' integral (Ki): '
                },
                'p': {
                    normal: ' proportional (Kp): '
                },
                'd': {
                    normal: ' derivative (Kd): '
                }
            }
        },
        'M305': {
            description: {
                normal: 'Set thermistor and ADC parameters'
            },
            parameters: {
                'c': {
                    normal: ' Steinhart-Hart C coefficient: '
                },
                'b': {
                    normal: ' beta value: '
                },
                'h': {
                    normal: ' ADC high offset: '
                },
                'l': {
                    normal: ' ADC low offset: '
                },
                'p': {
                    normal: ' heater #: '
                },
                'r': {
                    normal: ' series resistor value: '
                },
                't': {
                    normal: ' thermistor resistance at 25C: '
                },
                'x': {
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
                'a': {
                    normal: ' gAin: '
                },
                'c': {
                    normal: ' dominant time (in s): '
                },
                'b': {
                    normal: ' Bang-bang control: '
                },
                'd': {
                    normal: ' dead time (in s): '
                },
                'h': {
                    normal: ' heater #: '
                },
                's': {
                    normal: ' max PWM: '
                }
            }
        },
        'M320': {
            description: {
                normal: 'Activate autolevel'
            },
            parameters: {
                's': {
                    normal: ' >0 activate and store persistently in EEPROM: '
                }
            }
        },
        'M321': {
            description: {
                normal: 'Deactivate autolevel'
            },
            parameters: {
                's': {
                    normal: ' >0 deactivate and store persistently in EEPROM: '
                }
            }
        },
        'M322': {
            description: {
                normal: 'Reset autolevel matrix'
            },
            parameters: {
                's': {
                    normal: ' >0 also reset the matrix values saved EEPROM: '
                }
            }
        },
        'M323': {
            description: {
                normal: 'Distortion correction on/off'
            },
            parameters: {
                'p': {
                    normal: ' 1=store correction state persistently in EEPROM: '
                },
                's': {
                    normal: ' 0=disable,1=enable: '
                }
            }
        },
        'M340': {
            description: {
                normal: 'Control the servos'
            },
            parameters: {
                'p': {
                    normal: ' servoId: '
                },
                's': {
                    normal: ' pulseInUS: '
                }
            }
        },
        'M350': {
            description: {
                normal: 'Set microstepping mode'
            },
            parameters: {
                'b': {
                    normal: ' extruder 1: '
                },
                'e': {
                    normal: ' extruder 0: '
                },
                'i': {
                    normal: ' enable (nn=1) or disable (nn=0) interpolation: '
                },
                's': {
                    normal: ' all drivers: '
                },
                'y': {
                    normal: ' Y axis: '
                },
                'x': {
                    normal: ' X axis: '
                },
                'z': {
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
                's': {
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
                'y': {
                    normal: ' Y scaling: '
                },
                'x': {
                    normal: ' X scaling: '
                },
                'z': {
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
                'x': {
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
                'z': {
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
                'h': {
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
                'd': {
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
                's': {
                    normal: ' response type: '
                },
                'r': {
                    normal: ' response sequence #: '
                }
            }
        },
        'M420': {
            description: {
                normal: 'Set RGB Colors as PWM/Enable/Disable Mesh Leveling'
            },
            parameters: {
                'r': {
                    normal: ' red PWM: '
                },
                's': {
                    normal: ' 1=enable,0=disable: '
                },
                'b': {
                    normal: ' blue PWM: '
                },
                'e': {
                    normal: ' green PWM: '
                }
            }
        },
        'M421': {
            description: {
                normal: 'Set a Mesh Bed Leveling Z coordinate'
            },
            parameters: {
                'y': {
                    normal: ' index: '
                },
                'x': {
                    normal: ' index: '
                },
                'z': {
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
                'y': {
                    normal: ' max temp: '
                },
                'x': {
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
                's': {
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
                's': {
                    normal: ' 1=started, 0=ended: '
                },
                'l': {
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
                'x': {
                    normal: ' print progress: '
                },
                'l': {
                    normal: ' printed layer: '
                }
            }
        },
        'M540': {
            description: {
                normal: 'Enable/Disable Stop SD Print on Endstop Hit/Set MAC address'
            },
            parameters: {
                'p': {
                    normal: ' MAC address: '
                },
                's': {
                    normal: ' 1=enable, 0=disable: '
                }
            }
        },
        'M550': {
            description: {
                normal: 'Set Name'
            },
            parameters: {
                'p': {
                    normal: ' machine name: '
                }
            }
        },
        'M551': {
            description: {
                normal: 'Set Password'
            },
            parameters: {
                'p': {
                    normal: ' password: '
                }
            }
        },
        'M552': {
            description: {
                normal: 'Set IP address, enable/disable network interface'
            },
            parameters: {
                'p': {
                    normal: ' IP address: '
                },
                's': {
                    normal: ' disable/enable networking: '
                },
                'r': {
                    normal: ' HTTP port: '
                }
            }
        },
        'M553': {
            description: {
                normal: 'Set Netmask'
            },
            parameters: {
                'p': {
                    normal: ' net mask: '
                }
            }
        },
        'M554': {
            description: {
                normal: 'Set Gateway'
            },
            parameters: {
                'p': {
                    normal: ' gateway: '
                }
            }
        },
        'M555': {
            description: {
                normal: 'Set compatibility'
            },
            parameters: {
                'p': {
                    normal: ' emulation type: '
                }
            }
        },
        'M556': {
            description: {
                normal: 'Axis compensation'
            },
            parameters: {
                'y': {
                    normal: ' deviation in Y: '
                },
                'x': {
                    normal: ' deviation in X: '
                },
                's': {
                    normal: ' height of distances: '
                },
                'z': {
                    normal: ' deviation in Z: '
                }
            }
        },
        'M557': {
            description: {
                normal: 'Set Z probe point or define probing grid'
            },
            parameters: {
                'y': {
                    normal: ' Y coordinate: '
                },
                'p': {
                    normal: ' probe point #: '
                },
                'x': {
                    normal: ' X coordinate: '
                }
            }
        },
        'M558': {
            description: {
                normal: 'Set Z probe type'
            },
            parameters: {
                'f': {
                    normal: ' feed rate: '
                },
                'i': {
                    normal: ' invert (I1)/do not invert (I0) reading: '
                },
                'h': {
                    normal: ' dive height (in mm): '
                },
                'p': {
                    normal: ' Z probe type: '
                },
                's': {
                    normal: ' extra for experimentation: '
                },
                'r': {
                    normal: ' recovery time: '
                },
                't': {
                    normal: ' travel speed: '
                },
                'y': {
                    normal: ' If nonzero, use probe for homing Y axis: '
                },
                'x': {
                    normal: ' If nonzero, use probe for homing X axis: '
                },
                'z': {
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
                'p': {
                    normal: ' heater #: '
                }
            }
        },
        'M563': {
            description: {
                normal: 'Define or remove a tool'
            },
            parameters: {
                'h': {
                    normal: ' heater(s): '
                },
                'x': {
                    normal: ' axis: '
                },
                'd': {
                    normal: ' extruder drive(s): '
                },
                'p': {
                    normal: ' tool #: '
                },
                'f': {
                    normal: ' fan(s): '
                }
            }
        },
        'M564': {
            description: {
                normal: 'Limit axes'
            },
            parameters: {
                's': {
                    normal: ' axis boundaries: '
                }
            }
        },
        'M565': {
            description: {
                normal: 'Set Z probe offset'
            },
            parameters: {
                'y': {
                    normal: ' Y offset: '
                },
                'x': {
                    normal: ' X offset: '
                },
                'z': {
                    normal: ' Z offset: '
                }
            }
        },
        'M566': {
            description: {
                normal: 'Set allowable instantaneous speed change'
            },
            parameters: {
                'y': {
                    normal: ' Y axis : '
                },
                'x': {
                    normal: ' X axis (mm/min) : '
                },
                'z': {
                    normal: ' Z axis : '
                },
                'e': {
                    normal: ' extruder drives : '
                }
            }
        },
        'M567': {
            description: {
                normal: 'Set tool mix ratios'
            },
            parameters: {
                'p': {
                    normal: ' tool #: '
                },
                'e': {
                    normal: ' mix ratios: '
                }
            }
        },
        'M568': {
            description: {
                normal: 'Turn off/on tool mix ratios'
            },
            parameters: {
                'p': {
                    normal: ' tool #: '
                },
                's': {
                    normal: ' 0=off,non-zero=on: '
                }
            }
        },
        'M569': {
            description: {
                normal: 'Set axis direction and enable values'
            },
            parameters: {
                'p': {
                    normal: ' motor driver #: '
                },
                's': {
                    normal: ' direction- 0=backwards,1=forwards: '
                },
                'r': {
                    normal: ' driver enable polarity- 0=active low,1=active high: '
                },
                't': {
                    normal: ' min driver step pulse width & interval (in micro s): '
                }
            }
        },
        'M570': {
            description: {
                normal: 'Configure heater fault detection'
            },
            parameters: {
                'h': {
                    normal: ' heater #: '
                },
                's': {
                    normal: ' heater timeout (in s): '
                },
                't': {
                    normal: ' temp: '
                },
                'p': {
                    normal: ' time (in s): '
                }
            }
        },
        'M571': {
            description: {
                normal: 'Set output on extrude'
            },
            parameters: {
                'p': {
                    normal: ' logical pin #: '
                },
                's': {
                    normal: ' output value: '
                },
                'f': {
                    normal: ' output PWM frequency: '
                }
            }
        },
        'M572': {
            description: {
                normal: 'Set or report extruder pressure advance'
            },
            parameters: {
                's': {
                    normal: ' pressure advance amount (in s): '
                },
                'd': {
                    normal: ' extruder #: '
                }
            }
        },
        'M573': {
            description: {
                normal: 'Report heater PWM'
            },
            parameters: {
                'p': {
                    normal: ' heater #: '
                }
            }
        },
        'M574': {
            description: {
                normal: 'Set endstop configuration'
            },
            parameters: {
                'y': {
                    normal: ' Y axis: '
                },
                'x': {
                    normal: ' X axis: '
                },
                's': {
                    normal: ' logic level: '
                },
                'z': {
                    normal: ' Z axis: '
                },
                'e': {
                    normal: ' extruder endstops (low/high): '
                }
            }
        },
        'M575': {
            description: {
                normal: 'Set serial comms parameters'
            },
            parameters: {
                'p': {
                    normal: ' serial channel #: '
                },
                's': {
                    normal: ' checksums: '
                },
                'b': {
                    normal: ' baud rate: '
                }
            }
        },
        'M577': {
            description: {
                normal: 'Wait until endstop is triggered'
            },
            parameters: {
                'y': {
                    normal: ' Y axis: '
                },
                'x': {
                    normal: ' X axis: '
                },
                's': {
                    normal: ' endstop level: '
                },
                'z': {
                    normal: ' Z axis: '
                },
                'e': {
                    normal: ' extruder drive: '
                }
            }
        },
        'M578': {
            description: {
                normal: 'Fire inkjet bits'
            },
            parameters: {
                'p': {
                    normal: ' inkjet head #: '
                },
                's': {
                    normal: ' bit pattern: '
                }
            }
        },
        'M579': {
            description: {
                normal: 'Scale Cartesian axes'
            },
            parameters: {
                'y': {
                    normal: ' Y axis: '
                },
                'x': {
                    normal: ' X axis: '
                },
                'z': {
                    normal: ' Z axis: '
                }
            }
        },
        'M580': {
            description: {
                normal: 'Select Roland'
            },
            parameters: {
                'p': {
                    normal: ' initial text: '
                },
                'r': {
                    normal: ' toggle activation: '
                }
            }
        },
        'M581': {
            description: {
                normal: 'Configure external trigger'
            },
            parameters: {
                'c': {
                    normal: ' condition: '
                },
                'e': {
                    normal: ' endstop input(s) to monitor: '
                },
                'p': {
                    normal: ' reserved: '
                },
                's': {
                    normal: ' rising/falling edge: '
                },
                't': {
                    normal: ' logical trigger #: '
                },
                'y': {
                    normal: ' endstop input(s) to monitor: '
                },
                'x': {
                    normal: ' endstop input(s) to monitor: '
                },
                'z': {
                    normal: ' endstop input(s) to monitor: '
                }
            }
        },
        'M582': {
            description: {
                normal: 'Check external trigger'
            },
            parameters: {
                't': {
                    normal: ' trigger #: '
                }
            }
        },
        'M583': {
            description: {
                normal: 'Wait for pin'
            },
            parameters: {
                'p': {
                    normal: ' pin #: '
                },
                's': {
                    normal: ' state: '
                },
                'r': {
                    normal: ' analog value: '
                }
            }
        },
        'M584': {
            description: {
                normal: 'Set drive mapping'
            },
            parameters: {
                'e': {
                    normal: ' E motor(s): '
                },
                's': {
                    normal: ' special functions: '
                },
                'u': {
                    normal: ' U axes: '
                },
                'w': {
                    normal: ' W axes: '
                },
                'v': {
                    normal: ' V axes: '
                },
                'y': {
                    normal: ' Y motor(s): '
                },
                'x': {
                    normal: ' driver number(s) for X motor(s): '
                },
                'z': {
                    normal: ' Z motor(s): '
                }
            }
        },
        'M585': {
            description: {
                normal: 'Probe Tool'
            },
            parameters: {
                'y': {
                    normal: ' Y offset: '
                },
                'x': {
                    normal: ' X offset: '
                },
                'z': {
                    normal: ' Z offset: '
                }
            }
        },
        'M586': {
            description: {
                normal: 'Configure network protocols'
            },
            parameters: {
                'p': {
                    normal: ' protocol: '
                },
                's': {
                    normal: ' 0=disable,1=enable: '
                },
                'r': {
                    normal: ' TCP port #: '
                },
                't': {
                    normal: " 0=don't use,1=use TLS: "}
                }
            },
        'M587': {
            description: {
                normal: 'Store WiFi host network in list, or list stored networks'
            },
            parameters: {
                'i': {
                    normal: ' IP address: '
                },
                'p': {
                    normal: ' network password: '
                },
                'k': {
                    normal: ' Netmask: '
                },
                'j': {
                    normal: ' Gateway IP address: '
                },
                's': {
                    normal: ' network SSID: '
                }
            }
        },
        'M588': {
            description: {
                normal: 'Forget WiFi host network'
            },
            parameters: {
                's': {
                    normal: ' SSID to remove: '
                }
            }
        },
        'M589': {
            description: {
                normal: 'Configure access point parameters'
            },
            parameters: {
                'i': {
                    normal: ' IP address: '
                },
                'p': {
                    normal: ' WiFi password: '
                },
                's': {
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
                'y': {
                    normal: ' Y pos: '
                },
                'x': {
                    normal: ' X pos: '
                },
                'z': {
                    normal: ' relative lift: '
                },
                'e': {
                    normal: ' initial retract: '
                },
                'l': {
                    normal: ' later retract distance for removal: '
                }
            }
        },
        'M605': {
            description: {
                normal: 'Set dual x-carriage movement mode'
            },
            parameters: {
                'x': {
                    normal: ' duplication x-offset: '
                },
                's': {
                    normal: ' mode: '
                },
                'r': {
                    normal: ' duplication temp offset: '
                }
            }
        },
        'M665': {
            description: {
                normal: ' Set delta configuration'
            },
            parameters: {
                'b': {
                    normal: ' safe probing radius: '
                },
                'h': {
                    normal: ' delta height: '
                },
                'l': {
                    normal: ' diagonal rod length: '
                },
                's': {
                    normal: ' segments per second: '
                },
                'r': {
                    normal: ' delta radius: '
                },
                'y': {
                    normal: ' Y tower pos correction: '
                },
                'x': {
                    normal: ' X tower pos correction: '
                },
                'z': {
                    normal: ' Z tower pos correction: '
                }
            }
        },
        'M666': {
            description: {
                normal: 'Set delta endstop adjustment'
            },
            parameters: {
                'a': {
                    normal: ' X bed tilt %: '
                },
                'y': {
                    normal: ' Y axis: '
                },
                'b': {
                    normal: ' Y bed tilt %: '
                },
                'z': {
                    normal: ' Z axis: '
                },
                'x': {
                    normal: ' X axis: '
                }
            }
        },
        'M667': {
            description: {
                normal: 'Select CoreXY mode'
            },
            parameters: {
                'y': {
                    normal: ' Y axis scale factor: '
                },
                'x': {
                    normal: ' X axis scale factor: '
                },
                's': {
                    normal: ' coreXY mode: '
                },
                'z': {
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
                'a': {
                    normal: ' proximal arm joint min/max angles: '
                },
                'c': {
                    normal: ' proximal-to-distal crosstalk factor: '
                },
                'b': {
                    normal: ' proximal-to-distal arm joint min/max angles: '
                },
                'd': {
                    normal: ' distal arm length (mm): '
                },
                'l': {
                    normal: ' min segment length (mm): '
                },
                'p': {
                    normal: ' proximal arm length (mm): '
                },
                's': {
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
                'p': {
                    normal: ' filename: '
                },
                's': {
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
                'p': {
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
                'z': {
                    normal: ' offset: '
                }
            }
        },
        'M900': {
            description: {
                normal: 'Set Linear Advance Scaling Factors'
            },
            parameters: {
                'h': {
                    normal: ' height: '
                },
                'k': {
                    normal: ' factor: '
                },
                'r': {
                    normal: ' ratio: '
                },
                'd': {
                    normal: ' diam: '
                },
                'w': {
                    normal: ' width: '
                }
            }
        },
        'M905': {
            description: {
                normal: 'Set local date and time'
            },
            parameters: {
                'p': {
                    normal: ' date: '
                },
                's': {
                    normal: ' time: '
                }
            }
        },
        'M906': {
            description: {
                normal: 'Set motor currents'
            },
            parameters: {
                'e': {
                    normal: ' E drive(s): '
                },
                'i': {
                    normal: ' idle factor: '
                },
                'h': {
                    normal: ' set/get motor currents for the downward Z-probe homing: '
                },
                'y': {
                    normal: ' Y drive: '
                },
                'x': {
                    normal: ' X drive: '
                },
                'z': {
                    normal: ' Z drive: '
                }
            }
        },
        'M907': {
            description: {
                normal: 'Set digital trimpot motor'
            },
            parameters: {
                'b': {
                    normal: ' axis code (in % or amps): '
                },
                'e': {
                    normal: ' axis code (in % or amps): '
                },
                's': {
                    normal: ' axis code (in % or amps): '
                },
                'y': {
                    normal: ' axis code (in % or amps): '
                },
                'x': {
                    normal: ' axis code (in % or amps): '
                },
                'z': {
                    normal: ' axis code (in % or amps): '
                }
            }
        },
        'M908': {
            description: {
                normal: 'Control digital trimpot directly'
            },
            parameters: {
                'p': {
                    normal: ' pin: '
                },
                's': {
                    normal: ' current: '
                }
            }
        },
        'M909': {
            description: {
                normal: 'Set microstepping'
            },
            parameters: {
                'y': {
                    normal: ' Y stepper: '
                },
                'x': {
                    normal: ' X stepper: '
                },
                'z': {
                    normal: ' Z stepper: '
                },
                'e': {
                    normal: ' E stepper: '
                }
            }
        },
        'M910': {
            description: {
                normal: 'Set decay mode'
            },
            parameters: {
                'y': {
                    normal: ' Y stepper: '
                },
                'x': {
                    normal: ' X stepper: '
                },
                'z': {
                    normal: ' Z stepper: '
                },
                'e': {
                    normal: ' E stepper: '
                }
            }
        },
        'M911': {
            description: {
                normal: 'Set power monitor threshold voltages'
            },
            parameters: {
                'p': {
                    normal: ' power monitor channel: '
                },
                's': {
                    normal: ' undervoltage threshold: '
                },
                't': {
                    normal: ' overvoltage threshold: '
                }
            }
        },
        'M912': {
            description: {
                normal: 'Set electronics temperature monitor adjustment'
            },
            parameters: {
                'p': {
                    normal: ' temp monitor channel: '
                },
                's': {
                    normal: ' value to add to temp (in C): '
                }
            }
        },
        'M913': {
            description: {
                normal: 'Set motor percentage of normal current'
            },
            parameters: {
                'y': {
                    normal: ' % current for Y motor: '
                },
                'x': {
                    normal: ' % current for X motor: '
                },
                'z': {
                    normal: ' % current for Z motor: '
                },
                'e': {
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
                's': {
                    normal: ' firmware module number(s): '
                }
            }
        },
        'M998': {
            description: {
                normal: 'Request resend of line'
            },
            parameters: {
                'p': {
                    normal: ' line #: '
                }
            }
        },
        'M999': {
            description: {
                normal: 'Restart after being stopped by error'
            },
            parameters: {
                'p': {
                    normal: ' reset flags: '
                }
            }
        }
    }
}(window.gcodeDictionary = window.gcodeDictionary || {}))
