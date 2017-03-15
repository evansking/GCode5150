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