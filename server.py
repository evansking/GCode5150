import os
import sys

import flask
import json
from flask import request, Flask, render_template, url_for
from flask_socketio import SocketIO, send, emit, join_room, leave_room
from random import choice
from string import ascii_letters


sys.path.append(os.getcwd() + "/interpreter")
from interpreter import Drawer, get_gcode_line_num_from_points, get_points_from_gcode_line_num

BASEDIR = os.path.abspath(os.path.dirname(__file__))
UPLOAD_FOLDER = 'static/uploads/'
POINT_BATCH_LENGTH = 2000
DRAWER = Drawer()

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SECRET_KEY'] = 'secret!'
app.config['SECURITY_PASSWORD_SALT'] = 'secret'
app.debug = True

# Set this variable to "threading", "eventlet" or "gevent" to test the
# different async modes, or leave it set to None for the application to choose
# the best option based on installed packages.
async_mode = "threading"

socketio = SocketIO(app, async_mode=async_mode)

######################################################################
#                        Routing Logic                               #
######################################################################

#index page route
@app.route('/')
def index():
    return flask.make_response(flask.render_template('index.html'))

# handle POSTs to /draw endpoint by returning points associated with
# received GCode commands. Return points to client through socket.io
@app.route('/draw', methods=['POST'])
def draw_points():
    commands = request.data
    print "stuff"
    DRAWER = Drawer()

    def read_in_chunks(commands):
        while True:
            path_segment, more = DRAWER.parse_commands(commands, POINT_BATCH_LENGTH)
            if not more:
                yield path_segment
                break
            yield path_segment

    for points in read_in_chunks(commands):
        socketio.emit('draw', points)

    return "Done"


# Download the content of the editor
@app.route('/download', methods=['POST'])
def download():
    content = request.data
    title = ''.join(choice(ascii_letters) for i in range(10)) + '.gcode'
    location = os.path.join(BASEDIR, app.config['UPLOAD_FOLDER'], title)

    with open(location,"w") as file:
        file.write(content)
    return 'static/uploads/' + title

# return the line number associated with a point on the drawn structure.
@app.route('/lineNumber', methods=['POST'])
def get_gcode_line_num():
    two_points = json.loads(request.data)
    line_num = get_gcode_line_num_from_points(
        two_points[0][0], two_points[0][1], two_points[0][2],
        two_points[1][0], two_points[1][1], two_points[1][2])
    return json.dumps({"lineNum": line_num})

# return the point associated with a given line of GCode
# in order to highlight that point on a drawn structure
@app.route('/points', methods=['POST'])
def get_points():
    line_num = int(request.data)
    points = get_points_from_gcode_line_num(line_num)
    return json.dumps({"points": points})


######################################################################
#                        SocketIO Logic                              #
#   Documentation @ https://flask-socketio.readthedocs.io/en/latest/ #
######################################################################

# Socket IO connection handler
@socketio.on('connect')
def connect():
    print("[+] New Connection")

# Socket IO session handler for when client joins a room
@socketio.on('join')
def on_join(data):
    room = data['room']
    join_room(room)
    print "[+] {} has entered room".format(room)
    send("You have entered the room!", room=room)

# Removed client from room on disconnect
@socketio.on('leave')
def on_leave(data):
    room = data['room']
    leave_room(room)
    print "[-] {} has left room".format(room)
    send('You have left the room.', room=room)


if __name__ == '__main__':
    socketio.run(app)
