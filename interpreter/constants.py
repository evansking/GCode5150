comment_delimiter = ['//', ';']

gcodeline_point = {}

point_gcodeline = {}

common_comm = {	"G0":"Move (rapid linear)",
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
				"M23":"",
				"M24":"",
				"M25":"",
				"M26":"",
				"M27":"",
				"M28":"",
				"M29":"",
				"M30":"",
				"M31":"",
				"M32":"",
				"M33":"",
				"M34":"",
				"M35":"",
				"M36":"",
				"M37":"",
				"M38":"",
				"M40":"",
				"M41":"",
				"M42":"",
				"M43":"",
				"M48":"",
				"M70":""} #need to do till M999

arguments = {
'x': {"G0":" to X axis position: ", "G1":" to X axis position: ", "G2":" to X axis position: ",
	"G3":" to X axis position: ", "G10":" X offset: ", "G28":" flag to go back to the X axis origin ",
	"G29.1":" X offset: ", "G30":" X coordinate: ", "G31":" probe X offset: ", "G33":" X correction: ",
	"G61":" X coordinate: ", "G92":" new X axis pos: ", "G100":" flag to set floor for X axis ",
	"G130":" to X axis position: ", "G161":" flag to home X axis to min ",
	"G162":" flag to home X axis to max ", "M18":" X axis: "},

'y': {"G0":" to Y axis position: ", "G1":" to Y axis position: ", "G2":" to Y axis position: ",
    "G3":" to Y axis position: ", "G10":" Y offset: ", "G28":" flag to go back to the Y axis origin ",
    "G29.1":" Y offset: ", "G30":" Y coordinate: ", "G31":" probe Y offset: ", "G33":" Y correction: ",
    "G61":" Y coordinate: ", "G92":" new Y axis pos: ", "G100":" flag to set floor for Y axis ",
    "G130":" to Y axis position: ", "G161":" flag to home Y axis to min ",
    "G162":" flag to home Y axis to max ", "M18":" Y axis: "},

'z': {"G0":" to Z axis position: ", "G1":" to Z axis position: ",
    "G28":" flag to go back to the Z axis origin ", "G29.1":" Z offset: ", "G29.2":" Z offset: ",
    "G30":" Z coordinate: ", "G31":" trigger Z height: ", "G33":" Z correction: ",
    "G61":" Z coordinate: ", "G92":" new Z axis pos: ", "G100":" flag to set floor for Z axis ",
    "G130":" to Z axis position: ", "G161":" flag to home Z axis to min ",
    "G162":" flag to home Z axis to max ", "M18":" Z axis: "},

'e': {"G0":" extrude amount: ", "G1":" extrude amount: ", "G2":" extrude amount: ",
    "G3":" extrude amount: ", "G10":" Z offset: ", "G61":" E coordinate: ", "G92":" new extruder pos: ",
    "M18":" Extruder drive(s): "},

'f': {"G0":" feed rate: ", "G1":" feed rate: ", "G2":" feed rate: ", "G3":" feed rate: ",
	"G61":" F set feedrate: ", "G161":" desired feedrate: ", "G162":" desired feedrate: "},

's': {"G0":" endstop flag: ", "G1":" endstop flag: ", "G4": " wait time (in s): ",
    "G10":" active temperature(s) or retract length: ", "G11":" retract length: ",
    "G29":" firmware-dependent behavior: ", "G30":" set parameter: ", "G31":" calibration temperature: ",
    "G32":" bed leveling method: ", "G60":" memory slot #: ", "G61":" memory slot #: ",
    "M0":" wait time (in s): ", "M20":" output style: "},

'i': {"G2":" distance to maintain from (X space): ", "G3":" distance to maintain from (X space): "},

'j': {"G2":" distance to maintain from (Y space): ", "G3":" distance to maintain from (Y space): "},

'p': {"G4": " wait time (in ms): ", "G10":" tool number: ", "G30":" probe point number: ",
    "G31":" trigger value: ", "G32":" bed correction method: ", "M0":" wait time (in ms): ",
    "M20":" directory to list: ", "M21":" SD card #: ", "M22":" SD card #: "},

'a': {"G6":" Stepper A pos/angle: ", "G130":" to A axis position: "},

'b': {"G6":" Stepper B pos/angle: ", "G130":" to B axis position: "},

'c': {"G6":" Stepper C pos/angle: ", "G31":" temperature coefficient: "},

'r': {"G6":" relative move flag: ", "G10":" standby temperature(s): ",
	"G33":" reset distortion matrix(R0): ", "G100":" radius to add: "},

'u': {"G10":" U, V and W axis offsets: "},

'h': {"G30":" height correction: "},

't': {"G31":" Z probe type: "},

'd': {},

'l': {"G33":" list distortion matrix(L0): "},
}