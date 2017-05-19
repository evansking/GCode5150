import sys
sys.path.append('../interpreter')
import interpreter
import constants
import Gcode_exceptions
import unittest

class TestCommandParsing(unittest.TestCase):
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




if __name__ == '__main__':
    unittest.main()