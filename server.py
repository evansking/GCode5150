import os
import sys

import flask
import json
from flask import request, Flask, render_template, url_for
from flask_socketio import SocketIO, send, emit, join_room, leave_room
from werkzeug.utils import secure_filename
from werkzeug.wrappers import Response

sys.path.append(os.getcwd() + "/interpreter")
from interpreter import Drawer, get_gcode_line_num_from_points, get_points_from_gcode_line_num

BASEDIR = os.path.abspath(os.path.dirname(__file__))
UPLOAD_FOLDER = 'uploads/'
POINT_BATCH_LENGTH = 1584
DRAWER = Drawer()

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SECRET_KEY'] = 'secret!'
app.config['SECURITY_PASSWORD_SALT'] = 'secret'
app.debug = True

# Set this variable to "threading", "eventlet" or "gevent" to test the
# different async modes, or leave it set to None for the application to choose
# the best option based on installed packages.
async_mode = None

socketio = SocketIO(app, async_mode=async_mode)


######################################################################
#                        User Authentication                         #
######################################################################


######################################################################
#                        Routing Logic                               #
######################################################################

@app.route('/')
def index():
    return flask.make_response(flask.render_template('index.html'))


@app.route('/test')
def visualizer():
    return flask.make_response(flask.render_template('testVisualizer.html'))


@app.route('/uploader', methods=['POST'])
def upload_file():
    f = request.files['file']
    filename = secure_filename(f.filename)
    location = os.path.join(BASEDIR, app.config['UPLOAD_FOLDER'], filename)
    f.save(location)

    def read_in_chunks(file, chunk_size=524288):
        while True:
            data = file.read(chunk_size)
            if not data:
                break
            yield data

    f = open(location)
    for piece in read_in_chunks(f):
        socketio.emit('test', piece)
    return 'Done'

@app.route('/draw', methods=['POST'])
def draw_points():
    commands = request.data
    pathSegment, requestAgain = DRAWER.parse_commands(commands, POINT_BATCH_LENGTH)
    return json.dumps({"points": pathSegment, "again": requestAgain})


@app.route('/points', methods=['POST'])
def get_points():
    line_num = int(request.data)
    points = get_points_from_gcode_line_num(line_num)
    return json.dumps({"points": points})


@app.route('/lineNumber', methods=['POST'])
def get_gcode_line_num():
    two_points = json.loads(request.data)
    line_num = get_gcode_line_num_from_points(
        two_points[0][0], two_points[0][1], two_points[0][2],
        two_points[1][0], two_points[1][1], two_points[1][2])
    return json.dumps({"lineNum": line_num})


######################################################################
#                        SocketIO Logic                              #
#   Documentation @ https://flask-socketio.readthedocs.io/en/latest/ #
######################################################################

# Socket IO connection handler
@socketio.on('connect')
def connect():
    print("[+] New Connection")


@socketio.on('join')
def on_join(data):
    room = data['room']
    join_room(room)
    print "[+] {} has entered room".format(room)
    send("You have entered the room!", room=room)


@socketio.on('leave')
def on_leave(data):
    room = data['room']
    leave_room(room)
    print "[-] {} has left room".format(room)
    send('You have left the room.', room=room)


if __name__ == '__main__':
    socketio.run(app)
