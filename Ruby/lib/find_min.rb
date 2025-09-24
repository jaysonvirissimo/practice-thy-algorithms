# frozen_string_literal: true

# Find Minimum in Rotated Sorted Array
#
# Implement a binary search algorithm to locate the minimum element in a rotated
# sorted array of unique integers. Consider an initially sorted array that has been
# rotated between 1 and n times, where rotation involves moving elements from the
# end to the beginning. The challenge is to identify the pivot point where the
# rotation occurred, which corresponds to the minimum element. Design an efficient
# logarithmic time solution using modified binary search that can handle arrays
# with up to 5000 elements containing values from -5000 to 5000. The algorithm must
# achieve O(log n) time complexity by leveraging the partial ordering properties
# of the rotated array.
#
# Time Complexity: O(log n)
# Space Complexity: O(1)
#
# @param nums [Array<Integer>] Rotated sorted array of unique integers
# @return [Integer] The minimum element in the array
#
# Example 1:
# Input: nums = [3,4,5,1,2]
# Output: 1
# Explanation: The original array was [1,2,3,4,5] rotated 3 times.
#
# Example 2:
# Input: nums = [4,5,6,7,0,1,2]
# Output: 0
# Explanation: The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.
#
# Example 3:
# Input: nums = [11,13,15,17]
# Output: 11
# Explanation: The original array was [11,13,15,17] and it was rotated 4 times.
#
# Constraints:
# - n == nums.length
# - 1 <= n <= 5000
# - -5000 <= nums[i] <= 5000
# - All the integers of nums are unique
# - nums is sorted and rotated between 1 and n times

def find_min(nums)
  # Implementation goes here
end