GCode Interpreter for Dimitri!
===================

 - Ramya Babu (rsb357@cornell.edu)
 - Nerla Jean-Louis (nj99@cornell.edu)
 - Ishaan Jhaveri (iaj8@cornell.edu)
 - Evan King (esk79@cornell.edu)
 - Austin Lin (aml276@cornell.edu)
 - Kathy Wang (kw496@cornell.edu)
 - Paul West (paul.west4@gmail.com)
 - Leezel Zamidar (lz283@cornell.edu)

----------


Architecture
-------------

The architecture is broadly defined as follows:


> **Startup Notes:**

> - The server requires python 3.5
> - Install requirement with `pip install -r requirements`
> - Run the code with `python3 manage.py runserver`
> - Visit the site at http://127.0.0.1:5000/


#### <i class="icon-folder-open"></i> Interpreter

The Interpreter is the beginning of the pipeline for this project. When a GCode file is uploaded onto the server, the Interpreter first parses the file, ensures that it is valid GCode and then renders it in a form understandable by the Visualizer.

The Interpreter will be written in Python 3.5.

#### <i class="icon-desktop"></i> Website/UI

#### Techonologies

 - Flask - the server 
 - Socket.io - the Websockets for realtime communication between server and graphics components
 - Bootstrap 3 - Website UI templating


#### <i class="icon-pencil"></i> Graphics Component

#### Techonologies

 - three.js - This is the JavaScript plugin that will be used to render the graphics of the 3d printed visualization.



