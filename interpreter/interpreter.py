import re
import constants

class Command:
	'''
	define object for a command 
	'''
	def __init__(self, command, arguments={}, line=''):
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
		'''		
		line = line.upper()
		if line:
			self.command = self.parse_command(line)
			self.arguments = self.parse_arguments(line)
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
		'''
		return line.split()[0]

	def parse_arguments(self, line):
		'''
		input:
			line: string of line of Gcode 
		output:
			dictionary of arguments mapping parameter type to number, i.e. X123 -> {'X':'123'}
		'''
		arguments = {}
		args = line.split()[1:]
		for arg in args:
			try:
				letter, number = re.findall(r'([A-Z])([0-9]*)', arg)[0]
			except:
				raise Exception('syntax error: arguments')
			arguments[letter] = number
		return arguments

	def get_english(self):
		'''
		return the english description of this command
		'''
		return constants.descriptions[self.number]

	#TODO: handle multiple commands on same line









