import re
import constants
import json
import sys
import Gcode_exceptions
from os.path import basename, splitext


class Command:
    '''
    define object for a command (one line of Gcode)
    '''

    def __init__(self, command='', arguments={}, line=''):
        '''
        input:
            command: command type, i.e. 'G0'
            arguments: dictionary mapping parameter type to number, i.e. X123 -> {'X':'123'}
            line: line of Gcode, if this is given it will be parsed to get command and arguments.
                    This will overwrite the previous two inputs.

        attributes:
            self.command: (string) command type
            self.arguments: dictionary of arguments, given by input or parsed from gcode line
            self.letter: (string) command letter, i.e. 'G0' -> 'G'
            self.number: (string) command number, i.e. 'G0' -> '0'

        If an error is encountered, line is invalid and raise InvalidLine.
        Note: error checking is only done when parsing a line, if you pass in custom command and
        argument, make sure there are no errors.

        **This is not a compiler**, it is not guaranteed to find all Gcode errors
        '''
        line = line.upper()
        if line:
            try:
            	line = self.remove_comments(line)
                self.command = self.parse_command(line)
                self.arguments = self.parse_arguments(line)
            except:
                raise Gcode_exceptions.InvalidLine
        else:
            self.command = str(command)
            self.arguments = arguments
        self.letter, self.number = re.findall(r'([A-Z])([0-9]*)', self.command)[0]


    def remove_comments(self, line):
        '''
        input:
            line: string of line of Gcode
        output:
            string of line of Gcode with comments removed
        '''
        for delimiter in constants.comment_delimiter:
            comment_index = line.find(delimiter)
            if comment_index >= 0:
                line = line[:comment_index]
        return line

    def parse_command(self, line):
        '''
        input:
            line: string of line of Gcode
        output:
            string of command, i.e. 'G0'

        raise command error if command does not match
        '''
        command = line.split()[0]
        if re.match(r'[A-Z][0-9]+', command):
            return command
        else:
            raise Gcode_exceptions.CommandError('invalid command')

    def parse_arguments(self, line):
        '''
        input:
            line: string of line of Gcode
        output:
            dictionary of arguments mapping parameter type to number, i.e. X123 -> {'X':'123'}

        raise SyntaxError if there are syntax errors
        '''
        arguments = {}
        args = line.split()[1:]
        for arg in args:
            try:
                letter, number = re.findall(r'([A-Z])([0-9.-]*)', arg)[
                    0]  # TODO check if Gcode only contains alphanumeric and .-
            except:
                raise Gcode_exceptions.SyntaxError('arguments')
            arguments[letter] = number
        return arguments

    def get_english(self):
        '''
        return the english description of this command
        '''
        try:
            eng_desc = ''
            eng_desc += constants.common_comm[self.command]
            for argument in self.arguments:
                eng_desc += ';' + constants.arguments[argument.lower()][self.command] + self.arguments[argument]
            return eng_desc
        except KeyError:
            # invalid command
            raise Gcode_exceptions.CommandError

        # TODO: handle multiple commands on same line


class Drawer:
    '''
    define object for a draw command (entire Gcode file or set of lines)
    '''
    def __init__(self):
        self.current_line_list = []
        self.current_progress = 0
        self.total_lines = 0
        self.current_head = [0.0,0.0,0.0]
        self.positioning = 'ABSOLUTE'
        self.extrude = True
        self.prevE = 0.
        print "Drawer initialized"


    def parse_commands(self, gcode, num_lines):
        # point_list_to_send = [[[0,0,0],[10,10,10]], [[5,5,5],[45,45,45]]]
        # return json.dumps(point_list_to_send), False
        '''
        input:
            gcode: text string of entire Gcode file
        '''
        if self.current_progress == 0:
            self.current_line_list = gcode.split('\n')
            # initialize gcodeline -> point dict
            self.total_lines = len(self.current_line_list)
            for i in range(1, self.total_lines + 1):
                constants.gcodeline_point[i] = None
            self.current_head = [0.0,0.0,0.0]

        i = self.current_progress
        point_list_to_send = [[self.current_head]]
        current_list_of_points = 0
        while i < self.current_progress + num_lines:
            if i >= self.total_lines - 1:
                self.current_line_list = []
                self.current_progress = 0
                self.total_lines = 0
                return json.dumps(point_list_to_send), False

            line = self.current_line_list[i]
            interpretation = self.interpret_gcode(line)
            if interpretation:
                p, extrude = interpretation
                #figure out whether to start a new list or append the point to the
                #current list
                if extrude:
                    point_list_to_send[current_list_of_points].append(p)
                else:
                    point_list_to_send.append([p])
                    current_list_of_points += 1
                constants.gcodeline_point[i+1] = (self.current_head[0], self.current_head[1], self.current_head[2] ,p[0], p[1], p[2])
                constants.point_gcodeline[(self.current_head[0], self.current_head[1], self.current_head[2] ,p[0], p[1], p[2])] = i+1
                self.current_head = p
            i += 1
        self.current_progress += num_lines
        return json.dumps(point_list_to_send), True


    def interpret_gcode(self, l):
        '''
        input:
            l: string of line of Gcode
        output:
            tuple of point (x,y,z) of movement, and boolean indicating if drawing or not
            ex) ((1,2,3), True)

            if command is not a draw command (like any of the M commands), return None
        '''
        # self.extrude = False
        l = l.strip()
        if l and not l[0] in constants.comment_delimiter and not l.isspace():
            try:
                l = Command(line=l)
            except Gcode_exceptions.GcodeError:
                return None
        else:
            return None
        # movement
        if l.letter == 'G' and (l.number == '1' or l.number == '0'):
            if self.positioning == 'RELATIVE':
                offset = self.current_head
            else:
                offset = [0.0, 0.0, 0.0]
            p = [None, None, None]
            for key in l.arguments:
                if key == 'X':
                    p[0] = offset[0] + float(l.arguments[key])
                elif key == 'Y':
                    p[1] = offset[1] + float(l.arguments[key])
                elif key == 'Z':
                    try:
                        p[2] = offset[2] + float(l.arguments[key])
                    except:
                        p[2] = offset[2] + 0.0
                elif key == 'E':
                    if self.positioning == 'ABSOLUTE':
                        self.extrude = float(l.arguments[key]) - self.prevE > 0
                        self.prevE = float(l.arguments[key])
                    elif self.positioning == 'RELATIVE':
                        self.extrude = float(l.arguments[key]) > 0
                        self.prevE = float(l.arguments[key])
            # if a coordinate is not given, use previous point to fill in missing component
            for i in range(3):
                if p[i] == None:
                    p[i] = self.current_head[i]
            return (p, self.extrude)
        # Home
        elif l.letter == 'G' and l.number == '28':
            if not set(['X','Y','Z']).intersection(set(l.arguments.keys())):
                return ([0.0,0.0,0.0], False)
            p = self.current_head
            for key in l.arguments:
                if key == 'X':
                    p[0] = 0.0
                elif key == 'Y':
                    p[1] = 0.0
                elif key == 'Z':
                    p[2] = 0.0
            return (p, False)
        # absolute positioning
        elif l.letter == 'G' and l.number == '90':
            self.positioning = 'ABSOLUTE'
            return None
        # relative positioning
        elif l.letter == 'G' and l.number == '91':
            self.positioning = 'RELATIVE'
            return None
        # set argument values
        elif l.letter == 'G' and l.number == '92':
            p = [None, None, None]
            for key in l.arguments:
                if key == 'X':
                    p[0] = float(l.arguments[key])
                elif key == 'Y':
                    p[1] = float(l.arguments[key])
                elif key == 'Z':
                    p[2] = float(l.arguments[key])
                elif key == 'E':
                    if self.positioning == 'ABSOLUTE':
                        self.extrude = float(l.arguments[key]) - self.prevE > 0
                        self.prevE = float(l.arguments[key])
                    elif self.positioning == 'RELATIVE':
                        self.extrude = float(l.arguments[key]) > 0
                        self.prevE = float(l.arguments[key])
            # if a coordinate is not given, use previous point to fill in missing component
            for i in range(3):
                if p[i] == None:
                    p[i] = self.current_head[i]
            return (p, False)

        return None


def get_gcode_line_num_from_points(x1, y1, z1, x2, y2, z2):
    try:
        return constants.point_gcodeline[(x1, y1, z1, x2, y2, z2)]
    except:
        return 0

def get_points_from_gcode_line_num(line_num):
    try:
        six_ints = constants.gcodeline_point[line_num]
        return [[six_ints[0], six_ints[1], six_ints[2]],
        [six_ints[3], six_ints[4], six_ints[5]]]
    except:
        return []


##########################################################

# with open(outfilename , 'w') as outfile:
# 	json.dump(point_list, outfile, indent=4,separators=(',',': '))

if __name__ == '__main__':
    # main function for testing purposes
    with open(sys.argv[1]) as f:
        parse_commands(f.read())
    print constants.gcodeline_point
    print "done"
