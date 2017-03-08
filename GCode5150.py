import flask
from flask import request, Flask, render_template, url_for
from flask_socketio import SocketIO, send, emit, join_room, leave_room

app = Flask(__name__)
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


######################################################################
#                        SocketIO Logic                              #
#   Documentation @ https://flask-socketio.readthedocs.io/en/latest/ #
######################################################################

#Socket IO connection handler
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
