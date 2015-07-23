# Write a method that will sum the digits of a positive integer.
# If it is greater than or equal to 10, sum the digits of the resulting number.
# Keep repeating until there is only one digit in the result.
# The result is called a 'digital root'.
# Do not use string conversion within your method.
def digital_root(number)

end

# Write a function that takes a message and an increment amount.
# Output the same letters shifted by that amount in the alphabet.
# Assume lowercase and no punctuation.
# Preserve spaces.
def caesar_cipher(string, shift)

end

# Write a function that takes two strings.
# Return the longest common substring.
def common_substrings(string_one, string_two)

end

# Write a function that takes an array of integers and returns their sum.
# Use recursion.
def sum_rec(numbers)

end

# Write a function that takes n, the length of the sequence.
# Return the first n elements from the fibonnacci sequence as an array.
def fibs(n)

end

# Write a function that takes a string.
# Return true if the string is a palindrome, otherwise return false.
# It should take less time and memory than reversing the string.
def is_palindrome?(string)

end

# Implement the Folding Cipher.
# It folds the alphabet in half and uses the adjacent letter.
# a -> z, b -> y, c -> x, m -> n, etc...
def folding_cipher(string)

end

# Write a method that finds all the unique substrings for a word.
def uniq_subs(string)

end

# Given an array of integers find the largest contiguous subsum.
# You can solve this trivially in O(n**2) time by considering all subarrays.
# Try to solve it in O(n) time with O(1) memory.
def lcs(array)

end

# Write a function that takes a year as a four digit integer. 
# Returns an array of the 10 closest subsequent silly years.
# A silly year's first two digits plus the last two digits equal the middle two.
def silly_years(year)

end

# Take an array of integers, and integer k.
# Return all pairs that sum to k exactly.
# List the pairs in [min, max] order.
# Time complexity: O(n).
# Return a set.
def pair_sum(array, k)

end

# Given a matrix of integers and coordinates of a rectangular region within the matrix.
# Find the sum of numbers falling inside the rectangle.
# Time complexity: O(number of rows * number of columns).
def matrix_region_sum(matrix, top_left_coords, bottom_right_coords)

end

# Implement Merge Sort (Hint: this typically involves a helper function)
def merge_sort(array)

end

def merge(left, right)

end

# Implement binary search.
# Return nil if the target isn't found.
def binary_search(array, target)

end

# Given a list of numbers in an array, replace all the numbers
# with the product of all other numbers. Do this in O(n) time without
# using division.
def productify(array)

end

# Write a function that takes an array and returns all of its subsets.
def subsets(array)

end

# Take a string and return the indices of the start/end of the longest palindrome it contains.
# Your palindrome checker could reverse the string and compare it to the original, but that takes extra memory.
# Instead, you should be able to solve the problem with O(1) memory.
def longest_palindrome(string)

end

# Given two arrays, find the intersection of both sets.
# It should be trivial to write an O(n**2) solution. Use sorting to solve in O(nlog(n)).
# Next, improve this to O(n) time (maybe use a non-array datastructure).
def fast_intersection(array_one, array_two)

end

# Write a function that takes two arrays of integers and returns an array with all the subsets commmon to both.
# Don't generate all subsets of both array, which would take time exponential time.
# Instead, directly generate the subsets of both.
def common_subsets(array_one, array_two)

end

# Given an array and index,
# find if it's possible to reach 0 by starting at the index
# and repeatedly moving left/right by the distance found at array[index].
def can_win?(array, index)

end

# Assume an array of length n, containing the numbers 1..n in jumbled order.
# "Sort" this array in O(n) time.
# You should be able to do this without looking at the input.
def sort1(array)

end

# Assume an array of length n with numbers in the range 1..N (N >= n).
# Sort this array in O(n + N) time.
# You may use O(N) memory.
def sort2(array, max_value)

end

# Say I give you an array of n strings, each of length k.
# Merge sort can sort this in O(knlog(n)), since comparing a pair of strings takes O(k) time.
# Sort the strings in O(kn).
# Hint: do not compare any two strings.
# All strings contain only lowercase letters a..z without whitespace or punctuation.
def sort3(array, length)

end

# Given an array, move all zeros to the end.
# The order of non-zero elements does not matter.
# Try to accomplish this in O(n) time and O(1) space.
def move_zeros(array)

end

# Implement the 'look and say' function.
#'Look and say' takes an input array and outputs an array.
# The output array describes the count of the elements in the input array as they appear in order.
def look_and_say(array)

end

# Implement a stack with a method max that returns the maximum value.
# It should run in O(1) time.
class MaxStack
  def initialize
  end

  def push(value)
  end

  def pop
  end

  def max
  end
end
