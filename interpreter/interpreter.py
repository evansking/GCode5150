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
				self.command = self.parse_command(line)
				self.arguments = self.parse_arguments(line)
			except Gcode_exceptions.GcodeError:
				raise Gcode_exceptions.InvalidLine
		else:
			self.command = str(command)
			self.arguments = arguments
		self.letter, self.number = re.findall(r'([A-Z])([0-9]*)', self.command)[0]

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
		comment_delimiter = ['//',';']
		for delimiter in comment_delimiter:
			comment_index = line.find(delimiter)
			if comment_index >= 0:
				line = line[:comment_index] # remove comments
		arguments = {}
		args = line.split()[1:]
		for arg in args:
			try:
				letter, number = re.findall(r'([A-Z])([0-9.-]*)', arg)[0] # TODO check if Gcode only contains alphanumeric and .-
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

	#TODO: handle multiple commands on same line

line_list = []
point_list = []

def interpret_gcode(l):
	global line_list, point_list

	if l.letter == 'G' and l.number == '1':
		p = [None,None,None]
		for key in l.arguments:
			if key == 'X':
				p[0] = float(l.arguments[key])
			elif key == 'Y':
				p[1] = float(l.arguments[key])
			elif key == 'Z':
				p[2] = float(l.arguments[key])
		if p[0] is None:
			if len(line_list) > 0:
				p[0] = line_list[len(line_list)-1][0]
			else:
				raise Gcode_exceptions.UndefinedPoint
		if p[1] is None:
			if len(line_list) > 0:
				p[1] = line_list[len(line_list)-1][1]
			else:
				raise Gcode_exceptions.UndefinedPoint
		if p[2] is None:
			if len(line_list) > 0:
				p[2] = line_list[len(line_list)-1][2]
			else:
				raise Gcode_exceptions.UndefinedPoint
		line_list.append(p)
	elif l.letter == 'G' and l.number == '28':
		line_list.append([0,0,0])
	elif l.letter == 'G' and l.number == '1':
		point_list.append(line_list)
		line_list = []
	elif l.letter == 'G' and l.number == '21':
		pass
	elif l.letter == 'G' and l.number == '90':
		pass
	elif l.letter == 'M' and l.number == '127':
		pass
	elif l.letter == 'M' and l.number == '73':
		pass
	elif l.letter == 'M' and l.number == '104':
		pass
	elif l.letter == 'M' and l.number == '126':
		pass
	elif l.letter == 'M' and l.number == '84':
		pass
	else:
		raise Gcode_exceptions.UndefinedInstruction(l)

def parse_file(filename):
	with open(filename) as f:
		for line in f:
			if line[0] != ';' and not line.isspace():
				command = Command(line=line)
				interpret_gcode(command)
	point_list.append(line_list)
	name, extension =  splitext(basename(filename))
	outfilename = 'output_' +  name + '.json'
	with open(outfilename , 'w') as outfile:
		json.dump(point_list, outfile, indent=4,separators=(',',': '))

if __name__ == '__main__':
	# main function for testing purposes
	parse_file(sys.argv[1])
	print "done"






