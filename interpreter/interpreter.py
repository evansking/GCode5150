import re

class G_command:
	'''
	define object for a G command 
	'''
	def __init__(self, number, arguments={}, line=''):
		'''
		input:
			number: number of command, i.e. '0' in 'G0'
			arguments: dictionary mapping parameter type to number, i.e. X123 -> {'X':'123'}
			line: line of Gcode, if this is given it will be parsed to get arguments
		if neither arguments nor line are given, G-command has no arguments

		attributes:
			self.number: command number
			self.arguments: dictionary of arguments, given by input or parsed from gcode line
		'''
		line = line.upper()
		self.number = str(number)
		if line:
			self.arguments = self.parse_arguments(line)
		else:
			self.arguments = arguments

	def parse_arguments(self, line):
		'''
		input:
			line: string of line of Gcode 
		output:
			dictionary of arguments mapping parameter type to number, i.e. X123 -> {'X':'123'}
		TODO: handle lines with multiple commands
		'''
		arguments = {}
		args = line.split()[1:]
		for arg in args:
			try:
				letter, number = re.findall(r'([A-Z])([0-9]*)', arg)[]
			except:
				raise Exception('syntax error: arguments')
			arguments[letter] = number
		return arguments





