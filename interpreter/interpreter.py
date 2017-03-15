import re
import constants
import exceptions

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
			except exceptions.GcodeError:
				raise exceptions.InvalidLine
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
			raise exceptions.CommandError('invalid command')

	def parse_arguments(self, line):
		'''
		input:
			line: string of line of Gcode 
		output:
			dictionary of arguments mapping parameter type to number, i.e. X123 -> {'X':'123'}

		raise SyntaxError if there are syntax errors
		'''
		line = line[:line.find(';')] # remove comments
		arguments = {}
		args = line.split()[1:]
		for arg in args:
			try:
				letter, number = re.findall(r'([A-Z])([0-9.-]*)', arg)[0] # TODO check if Gcode only contains alphanumeric and .-
			except:
				raise exceptions.SyntaxError('arguments')
			arguments[letter] = number
		return arguments

	def get_english(self):
		'''
		return the english description of this command
		'''
		try:
			return constants.descriptions[self.command]
		except KeyError:
			# invalid command
			raise exceptions.CommandError

	#TODO: handle multiple commands on same line


if __name__ == '__main__':
	# main function for testing purposes
	line = Command(line='G11 X-2h34 Y2.34; test line')
	print line.command
	print line.arguments
	print line.letter
	print line.number
	print line.get_english()






