'''
Used to throw different kinds of Gcode exceptions. Like when Users upload incorrect Gcode or text that is not Gcode.
'''
class GcodeError(Exception):
	'''
	parent class for all gcode exceptions
	'''
	pass
