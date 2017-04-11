class GcodeError(Exception):
	'''
	parent class for all gcode exceptions
	'''
	pass

class SyntaxError(GcodeError):
	'''
	syntax error
	'''
	pass

class CommandError(GcodeError):
	'''
	invalid gcode command
	'''
	pass

class InvalidLine(GcodeError):
	'''
	line of Gcode is invalid
	'''
	pass

class UndefinedPoint(GcodeError):
	'''
	gcode command does not define x,y, and z values
	'''

class UndefinedInstruction(GcodeError):
	'''
	gcode command is not supported
	'''
	def __init__(self, value):
		self.value = value
	def __str__(self):
		return self.value.letter + self.value.number + " is not supported"