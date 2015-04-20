require 'algorithms'
require 'set'

describe 'digital_root' do

  it '65,536 should return 7' do
    expect(digital_root(65_536)).to eq(7)
  end

  it '1,853 should return 8' do
    expect(digital_root(1853)).to eq(8)
  end

end

describe 'caesar_cipher' do

  it "'hello' should return 'lipps'" do
    expect(caesar_cipher('hello', 4)).to eq('lipps')
  end

  it "'abc' should return 'abc'" do
    expect(caesar_cipher('abc', 0)).to eq('abc')
  end

end

describe 'common_substrings' do

  it "'Hello' and 'Hello World' should return 'Hello'" do
    expect(common_substrings('Hello', 'Hello World')).to eq('Hello')
  end

  it "'ABABC' and 'BABCA' should return 'ABC'" do
    expect(common_substrings('ABABC', 'BABCA')).to eq('BABC')
  end

end

describe 'sum_rec' do

  it '[1, 2, 3] should return 6' do
    expect(sum_rec([1, 2, 3])).to eq(6)
  end

  it '[99, 66, 33] should return 198' do
    expect(sum_rec([99, 66, 33])).to eq(198)
  end

end

describe 'fibs' do

  it '3 should return [0, 1, 1]' do
    expect(fibs(3)).to eq([0, 1, 1])
  end

  it '5 should return [0, 1, 1, 2, 3]' do
    expect(fibs(5)).to eq([0, 1, 1, 2, 3])
  end

end

describe 'is_palindrome?' do

  it "'ricercar' should return false" do
    expect(is_palindrome?('ricercar')).to eq(false)
  end

  it "'racecar' should return true" do
    expect(is_palindrome?('racecar')).to eq(true)
  end

end

describe 'folding_cipher' do

  it "'abcm' should return 'zyxn'" do
    expect(folding_cipher('abcm')).to eq('zyxn')
  end

  it "'zyxn' should return 'abcm'" do
    expect(folding_cipher('zyxn')).to eq('abcm')
  end

end

describe 'uniq_subs' do

  it 'should return all the substrings' do
    array = %w(a b c d ab bc cd abc bcd abcd)
    expect(uniq_subs('abcd')).to match_array(array)
  end

  it "shouldn't have repeats" do
    array = %w(d du dud dude u ud ude de e)
    expect(uniq_subs('dude')).to match_array(array)
  end

end

describe 'lcs' do

  it 'should return the largest sum' do
    expect(lcs([4, -1, 5, 6, -13, 2])).to eq(14)
  end

  it 'should return the largest sum' do
    expect(lcs([-2, 1, -3, 4, -1, 2, 1, -5, 4])).to eq(6)
  end

end

describe 'silly_years' do

  it 'should return the ten subsequent silly years' do
    array = [1978, 2307, 2417, 2527, 2637, 2747, 2857, 2967, 3406, 3516]
    expect(silly_years(1978)).to match_array(array)
  end

  it 'should return the ten subsequent silly years' do
    array = [2307, 2417, 2527, 2637, 2747, 2857, 2967, 3406, 3516, 3626]
    expect(silly_years(2307)).to match_array(array)
  end

end

describe 'pair_sum' do

  it 'should return all the pairs that sum to 0' do
    set = Set.new
    set.add([-1, 1])
    expect(pair_sum([1, 2, -1], 0)).to eq(set)
  end

  it 'should return all the pairs that sum to 1' do
    set = Set.new
    set.add([-1, 2])
    expect(pair_sum([1, 2, -1, -1, -2], 1)).to eq(set)
  end

end

describe 'matrix_region_sum' do

  it 'should return the sum of the elements within the coordinates' do
    matrix = [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
    top_left_coords = [0, 0]
    bottom_right_coords = [1, 1]
    expect(matrix_region_sum(matrix, top_left_coords, bottom_right_coords)).to eq(8)
  end

  it 'should return the sum of the elements within the coordinates' do
    matrix = [[2, 3, 4], [3, 4, 5], [4, 5, 6]]
    top_left_coords = [0, 0]
    bottom_right_coords = [2, 2]
    expect(matrix_region_sum(matrix, top_left_coords, bottom_right_coords)).to eq(36)
  end

end

describe 'merge_sort' do

  it '[1452, 23, 1, 5] should return [1, 5, 23, 1452]' do
    expect(merge_sort([1452, 23, 1, 5])).to eq([1, 5, 23, 1452])
  end

  it '[10, 4, 6, 2] should return [2, 4, 6, 10]' do
    expect(merge_sort([10, 4, 6, 2])).to eq([2, 4, 6, 10])
  end

end

describe 'binary_search' do

  it '([1, 5, 13, 23, 305, 333, 402, 454, 500], 13) should return 2' do
    expect(binary_search([1, 5, 13, 23, 305, 333, 402, 454, 500], 13)).to eq(2)
  end

  it "should return nil if the target isn't found" do
    array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    target = 11
    expect(binary_search(array, target)).to be_nil
  end

end

describe 'productify' do

  it '([2, 3, 5]) should return [15, 10, 6]' do
    expect(productify([2, 3, 5])).to match_array([15, 10, 6])
  end

  it '([4, 2, 5, 7]) should return [70, 140, 56, 40]' do
    expect(productify([4, 2, 5, 7])).to match_array([70, 140, 56, 40])
  end

end

describe 'subsets' do

  it 'should return the subsets of a given array' do
    array = [[], [3], [2], [3, 2], [1], [3, 1], [2, 1], [3, 2, 1]]
    expect(subsets([1, 2, 3])).to match_array(array)
  end

  it 'should return a set containing an empty set if given and empty set' do
    array = [[]]
    expect(subsets([])).to match_array(array)
  end

end

describe 'longest_palindrome' do

  it 'should return the longest palindrome of a given string' do
    expect(longest_palindrome('asdfdsaqwerqwer')).to eq([0, 6])
  end

  it 'should return the longest palindrome of a given string' do
    expect(longest_palindrome('asdfghjklzxcxz')).to eq([9, 13])
  end

end

describe 'fast_intersection' do

  it 'should return the intersection of two arrays' do
    array_one = [1, 2, 3, 4, 5]
    array_two = [2, 3, 4]
    intersection = [2, 3, 4]
    expect(fast_intersection(array_one, array_two)).to eq(intersection)
  end

  it 'should return the intersection of two arrays' do
    array_one = [1, 3, 5, 7, 9]
    array_two = [2, 4, 5, 6, 8]
    intersection = [5]
    expect(fast_intersection(array_one, array_two)).to eq(intersection)
  end

end

describe 'common_subsets' do

  it 'should return the common subsets of two arrays' do
    array_one = [1, 2, 3, 4, 5]
    array_two = [2, 3, 4]
    subsets = [[], [4], [3], [4, 3], [2], [4, 2], [3, 2], [4, 3, 2]]
    expect(common_subsets(array_one, array_two)).to eq(subsets)
  end

  it 'should return the common subsets of two arrays' do
    array_one = [1, 3, 5, 7, 9]
    array_two = [2, 4, 5, 6, 8]
    subsets = [[], [5]]
    expect(common_subsets(array_one, array_two)).to eq(subsets)
  end

end

describe 'can_win?' do

  it "should return false if can't win" do
    array = [1, 2, 3, 4, 5, 0]
    expect(can_win?(array, 1)).to eq(false)
  end

  it 'should return true if can win' do
    array = [3, 1, 5, 7, 9, 2, 9, 0]
    expect(can_win?(array, 1)).to eq(true)
  end

end

describe 'sort1' do

  it "should 'sort' the array" do
    array = [4, 2, 1, 3, 5]
    expect(sort1(array)).to match_array(array.sort)
  end

  it "should 'sort' the array" do
    array = [4, 3, 8, 5, 1, 2, 7, 6, 10, 9]
    expect(sort1(array)).to match_array(array.sort)
  end

end

describe 'sort2' do

  it "should 'sort' the array with known max value" do
    array = [4, 2, 1, 3, 5]
    expect(sort2(array, array.max)).to match_array(array.sort)
  end

  it "should 'sort' the array with known max value" do
    array = [4, 3, 8, 5, 1, 2, 7, 6, 10, 9]
    expect(sort2(array, array.max)).to match_array(array.sort)
  end

end

describe 'sort3' do

  it "should 'sort' an array of strings with known length" do
    array = %w(bbb ccc aaa)
    expect(sort3(array, array.first.length)).to match_array(array.sort)
  end

  it "should 'sort' an array of strings with known length" do
    array = %w(zz yy xx aa bb cc)
    expect(sort3(array, array.first.length)).to match_array(array.sort)
  end

end

describe 'move_zeros' do

  it 'should return an array with the same elements' do
    array = [1, 2, 0, 3, 4, 0, 5, 6, 0]
    expect(move_zeros(array).sort).to match_array(array.sort)
  end

  it 'should move all the zeros to the end of the array' do
    array = [1, 2, 0, 3, 4, 0, 5, 6, 0]
    expect(move_zeros(array).drop(6)).to match_array([0, 0, 0])
  end

end

describe 'look_and_say' do

  it 'describe the count of the elements in the array as they appear' do
    expect(look_and_say([1])).to match_array([[1, 1]])
  end

  it 'describe the count of the elements in the array as they appear' do
    expect(look_and_say([1, 2, 1, 1])).to match_array([[1, 1], [1, 2], [2, 1]])
  end

end

describe 'MaxStack#max' do

  it 'should return the largest number added to the stack' do
    stack = MaxStack.new
    stack.push(10)
    stack.push(21)
    stack.push(32)
    expect(stack.max).to eq(32)
  end

  it 'should return the largest number added to the stack' do
    stack = MaxStack.new
    stack.push(99)
    stack.pop
    stack.push(33)
    expect(stack.max).to eq(33)
  end

end
