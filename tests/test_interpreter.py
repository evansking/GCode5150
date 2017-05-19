import sys
sys.path.append('../interpreter')
import interpreter
import constants
import Gcode_exceptions
import unittest

from interpreter import Drawer

class TestCommandParsing(unittest.TestCase):
	commands = "G1 X108.430 Y110.140 E1.05619 \n G1 X107.970 Y110.430 E1.07883 \
	\n G1 X107.490 Y110.690 E1.10156 \n G1 X107.240 Y110.800 E1.11293 \
	\n G1 X106.730 Y110.990 E1.13558 \n G1 X105.950 Y111.200 E1.16921 \n G1 X105.410 Y111.290 E1.19200"

	expected_list = "[[[0.0, 0.0, 0.0, false], [108.43, 110.14, 0.0, true], [107.97, 110.43, 0.0, true], [107.49, 110.69, 0.0, true], [107.24, 110.8, 0.0, true], [106.73, 110.99, 0.0, true], [105.95, 111.2, 0.0, true]]]"
	test_strings = ['G0 X1 Y2 Y3', 
					'G1 X1 Y2',
					'G1 X1.0 Y0.',
					'G1',
					'g0 x1 y2 z3',
					'M2 f6',
					'M99999999',
					'k23 l2345',
					'alsdfhphqwelasd',
					'', 
					' '] 

	def test_commentRemoval(self):
		test_command = interpreter.Command()
		comments = ['', ' ', 'test comment']
		for test_string in self.test_strings:
			for delimiter in constants.comment_delimiter:
				for comment in comments:
					line = test_string + delimiter + comment
					self.assertEqual(test_string, test_command.remove_comments(line))

	def test_parseCommand(self):
		test_command = interpreter.Command()
		self.assertEqual('G0', test_command.parse_command(self.test_strings[0]))
		for i in range(1,4):
			self.assertEqual('G1', test_command.parse_command(self.test_strings[i]))
		self.assertEqual('M2', test_command.parse_command(self.test_strings[5]))
		self.assertEqual('M99999999', test_command.parse_command(self.test_strings[6]))
		for i in range(7,9):
			with self.assertRaises(Gcode_exceptions.GcodeError):
				test_command.parse_command(self.test_strings[i])

	# initializes properly
	def testDRAWER_INIT(self):
		DRAWER = Drawer()
		path_segment, more = DRAWER.parse_commands("", 500)
		assert(path_segment == "[[[0.0, 0.0, 0.0, false]]]")
		assert(more == False)

	#some regular Gcode commands are interpreted properly
	def testDRAWER_REGULAR(self):
		DRAWER = Drawer()
		path_segment, more = DRAWER.parse_commands(self.commands, 500)
		assert(path_segment == self.expected_list)
		assert(more == False)

	#drawer deals correctly with Gcode files that have more commands than the point batch length
	def testDRAWER_SUCCESSIVE(self):
	  DRAWER = Drawer()
	  path_segment, more = DRAWER.parse_commands(self.commands, 1)
	  assert(path_segment == "[[[0.0, 0.0, 0.0, false], [108.43, 110.14, 0.0, true]]]")
	  assert(more == True)

	#drawer deals correctly with very large point batch length
	def testDRAWER_LARGE(self):
	  DRAWER = Drawer()
	  path_segment, more = DRAWER.parse_commands(self.commands, 50000000)
	  assert(path_segment == self.expected_list)
	  assert(more == False)

	#drawer deals correctly when given text that is not Gcode
	def testDRAWER_BADTEXT(self):
	  DRAWER = Drawer()
	  path_segment, more = DRAWER.parse_commands("sdadpvnspC  ASIDNspdv aswSS", 500)
	  assert(path_segment == "[[[0.0, 0.0, 0.0, false]]]")
	  assert(more == False)


if __name__ == '__main__':
    unittest.main()
