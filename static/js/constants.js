var FOV = 45; // Camera frustum vertical field of view default value.
var NEAR = 0.1; // Camera frustum near plane default value.
var FAR = 20000;// Camera frustum far plane default value.


var MAX_POINTS = 10; // Inversely proportional to drawing speed

var QUEUE_MEMBERS = {
    LINE : 0,
    ARC : 1,
    FILL : 2,
    INSTANT_LINE: 3,
    MOVE: 4,
    LINE_SEGMENTS: 5
};

//Debugging Variables
var DEBUG_PRINT = false;

//Printing Convention Variables
var MM_PER_SEGMENT = 10;
var ARC_CW = 1;
var ARC_CCW = -1;
