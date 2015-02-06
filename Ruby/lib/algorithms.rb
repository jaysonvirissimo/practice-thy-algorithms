# Write a method that will sum the digits of a positive integer.
# If it is greater than or equal to 10, sum the digits of the resulting number.
# Keep repeating until there is only one digit in the result, called the "digital root".
# Do not use string conversion within your method.
def digital_root(number)

end

# Write a function that takes a message and an increment amount and outputs the same letters shifted by that amount in the alphabet.
# Assume lowercase and no punctuation.
# Preserve spaces.
def caesar_cipher(string, shift)

end

# Write a function that takes two strings and returns the longest common substring.
def common_substrings(string_one, string_two)

end

# Write a function that takes an array of integers and returns their sum.
# Use recursion.
def sum_rec(numbers)

end

# Write a function which returns the first n elements from the fibonnacci sequence, given n.
def fibs(number)

end

# Write a function that takes a string and returns true if it's a palindrome, false if it's not.
# Your solution should take less time and memory than rebuilding the string backward and comparing the two.
def is_palindrome?(string)

end

# Implement the Folding Cipher.
# It folds the alphabet in half and uses the adjacent letter.
# a <=> z, b <=> y, c <=> x, m <=> n.
def folding_cipher(string)

end

# Write a method that finds all the unique substrings for a word.
def uniq_subs(string)

end

# Given an array of integers (positive and negative) find the largest contiguous subsum (sum of a subarray).
# You can solve this trivially in O(n**2) time by considering all subarrays.
# Try to solve it in O(n) time with O(1) memory.
def lcs(array)

end

# Write a function that takes a year (four digit integer) and returns an array with the 10 closest subsequent years that meet the following condition:
# the first two digits summed with the last two digits are equal to the middle two digits.
def silly_years(year)

end

# Given an array of integers, return all pairs that sum up to a specified value k.
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
