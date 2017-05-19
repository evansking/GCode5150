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

> **Startup Notes:**

> - The server requires python 2.7
> - Install requirement with `[sudo] pip install -r requirements.txt`
> - Run the code with `[sudo] python server.py`
> - Visit the site at http://127.0.0.1:5000/

##### Description

This is a basic GCode visualizer. The website takes as input a GCode file and then both interprets said GCode into english and also visualizes the object that would be drawn by a 3D printer.

##### Techonologies

 - Python 2.7.
 - Flask - the server.
 - Socket.io - the Websockets for realtime communication between server and graphics components.
 - Bootstrap 3 - Website UI templating.
 - three.js - This is the JavaScript plugin that will be used to render the graphics of the 3d printed visualization.

License
-------------

**BSD-3-Clause License**
(https://opensource.org/licenses/BSD-3-Clause)
Copyright 2017 Ramya Babu, Nerla Jean-Louis, Ishaan Jhaveri, Evan King, Austin Lin, Kathy Wang, Paul West, and Leezel Zamidar

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
