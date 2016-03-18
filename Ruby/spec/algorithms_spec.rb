require 'algorithms'
require 'set'

describe 'digital_root' do
  specify { expect(digital_root(65_536)).to eq(7) }
  specify { expect(digital_root(1853)).to eq(8) }
end

describe 'caesar_cipher' do
  specify { expect(caesar_cipher('hello', 4)).to eq('lipps') }
  specify { expect(caesar_cipher('abc', 0)).to eq('abc') }
  specify { expect(caesar_cipher('asdf asdf', 13)).to eq('nfqs nfqs') }
end

describe 'common_substrings' do
  specify { expect(common_substrings('Hello', 'Hello World')).to eq('Hello') }
  specify { expect(common_substrings('ABABC', 'BABCA')).to eq('BABC') }
end

describe 'sum_rec' do
  specify { expect(sum_rec([1, 2, 3])).to eq(6) }
  specify { expect(sum_rec([99, 66, 33])).to eq(198) }

  it 'calls itself' do
    expect(self).to receive(:sum_rec).at_least(:twice).and_call_original
    sum_rec([10, 20, 30])
  end
end

describe 'fibs' do
  specify { expect(fibs(3)).to eq([0, 1, 1]) }
  specify { expect(fibs(5)).to eq([0, 1, 1, 2, 3]) }
end

describe 'is_palindrome?' do
  specify { expect(is_palindrome?('ricercar')).to be_falsy }
  specify { expect(is_palindrome?('racecar')).to be_truthy }
end

describe 'valid_ip?' do
  specify { expect(valid_ip?('1.1.1.1')).to be_truthy }
  specify { expect(valid_ip?('256.2.2.2')).to be_falsy }
end

describe 'folding_cipher' do
  specify { expect(folding_cipher('abcm')).to eq('zyxn') }
  specify { expect(folding_cipher('zyxn')).to eq('abcm') }
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
  specify { expect(lcs([4, -1, 5, 6, -13, 2])).to eq(14) }
  specify { expect(lcs([-2, 1, -3, 4, -1, 2, 1, -5, 4])).to eq(6) }
end

describe 'silly_years' do
  it 'should return the ten subsequent silly years' do
    array = [2307, 2417, 2527, 2637, 2747, 2857, 2967, 3406, 3516, 3626]
    expect(silly_years(1978)).to match_array(array)
  end

  it 'should return the ten subsequent silly years' do
    array = [2417, 2527, 2637, 2747, 2857, 2967, 3406, 3516, 3626, 3736]
    expect(silly_years(2307)).to match_array(array)
  end
end

describe 'pair_sum' do
  let(:set) { Set.new }

  it 'should return all the pairs that sum to 0' do
    set.add([-1, 1])
    expect(pair_sum([1, 2, -1], 0)).to eq(set)
  end

  it 'should return all the pairs that sum to 1' do
    set.add([-1, 2])
    expect(pair_sum([1, 2, -1, -1, -2], 1)).to eq(set)
  end
end

describe 'matrix_region_sum' do
  it 'should return the sum of the elements within the coordinates' do
    matrix = [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
    top_left_coords = [0, 0]
    bottom_right_coords = [1, 1]
    actual = matrix_region_sum(matrix, top_left_coords, bottom_right_coords)

    expect(actual).to eq(8)
  end

  it 'should return the sum of the elements within the coordinates' do
    matrix = [[2, 3, 4], [3, 4, 5], [4, 5, 6]]
    top_left_coords = [0, 0]
    bottom_right_coords = [2, 2]
    actual = matrix_region_sum(matrix, top_left_coords, bottom_right_coords)

    expect(actual).to eq(36)
  end
end

describe 'merge_sort' do
  specify { expect(merge_sort([1452, 23, 1, 5])).to eq([1, 5, 23, 1452]) }
  specify { expect(merge_sort([10, 4, 6, 2])).to eq([2, 4, 6, 10]) }
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
  specify { expect(productify([2, 3, 5])).to match_array([15, 10, 6]) }
  specify { expect(productify([4, 2, 5, 7])).to match_array([70, 140, 56, 40]) }
end

describe 'subsets' do
  it 'should return the subsets of a given array' do
    array = [[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]
    # sort each subset so that differently ordered subsets still pass
    expect(subsets([1, 2, 3]).map(&:sort)).to match_array(array)
  end

  it 'should return a set containing an empty set if given an empty set' do
    array = [[]]
    expect(subsets([])).to match_array(array)
  end
end

describe 'longest_palindrome' do
  specify { expect(longest_palindrome('asdfdsaqwerqwer')).to eq([0, 6]) }
  specify { expect(longest_palindrome('asdfghjklzxcxz')).to eq([9, 13]) }
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
    expect(can_win?(array, 1)).to be_falsy
  end

  it 'should return true if can win' do
    array = [3, 1, 5, 7, 9, 2, 9, 0]
    expect(can_win?(array, 1)).to be_truthy
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

describe 'weighted_random_index' do
  it 'should not return an index out of range' do
    array = [4, 6, 8]
    expect(weighted_random_index(array)).to be_between(0, 2)
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
  it 'should describe the count of the elements in the array as they appear' do
    expect(look_and_say([1])).to match_array([[1, 1]])
  end

  it 'should describe the count of the elements in the array as they appear' do
    expect(look_and_say([1, 2, 1, 1])).to match_array([[1, 1], [1, 2], [2, 1]])
  end
end

describe 'sum_upon_sums' do
  it 'should return the missing number' do
    array = [0, 3, 6, 4, 10, 5, 1, 9, 2, 8]
    expect(sum_upon_sums(array)).to eq(7)
  end

  it 'should return the missing number' do
    array = [5, 1, 10, 3, 0, 4, 2, 7, 6, 8]
    expect(sum_upon_sums(array)).to eq(9)
  end
end

describe MaxStack do
  let(:stack) { MaxStack.new }

  it { should respond_to(:push) }
  it { should respond_to(:pop) }
  it { should respond_to(:max) }

  describe '#max' do
    it 'should return the largest number added to the stack' do
      stack.push(10)
      stack.push(21)
      stack.push(32)
      expect(stack.max).to eq(32)
    end

    it 'should return the largest number added to the stack' do
      stack.push(99)
      stack.pop
      stack.push(33)
      expect(stack.max).to eq(33)
    end
  end
end

describe StackQueue do
  let(:stack) { StackQueue.new }

  it { should respond_to(:enqueue) }
  it { should respond_to(:dequeue) }

  describe '#dequeue' do
    it 'should dequeue elements from the stack' do
      stack.enqueue(10)
      stack.enqueue(15)
      stack.enqueue(20)
      expect(stack.dequeue).to eq(10)
      expect(stack.dequeue).to eq(15)
      expect(stack.dequeue).to eq(20)
    end
  end
end

describe MinMaxStack do
  it { should respond_to(:length) }
  it { should respond_to(:push) }
  it { should respond_to(:pop) }
  it { should respond_to(:max) }
  it { should respond_to(:min) }
end

describe MinMaxStackQueue do
  it { should respond_to(:enqueue) }
  it { should respond_to(:dequeue) }
  it { should respond_to(:length) }
  it { should respond_to(:max) }
  it { should respond_to(:min) }
end

describe 'windowed_max_range' do
  let(:queue) { MinMaxStackQueue.new }

  specify { expect(windowed_max_range([1, 0, 2, 5, 4, 8], 2)).to eq(4) }
  specify { expect(windowed_max_range([1, 0, 2, 5, 4, 8], 3)).to eq(5) }
  specify { expect(windowed_max_range([1, 0, 2, 5, 4, 8], 4)).to eq(6) }
  specify { expect(windowed_max_range([1, 3, 2, 5, 4, 8], 5)).to eq(6) }

  it 'makes use of MinMaxStackQueue in the solution' do
    allow(MinMaxStackQueue).to receive(:new).and_return(queue)
    windowed_max_range([1, 0, 2, 5, 4, 8], 2)

    expect(MinMaxStackQueue).to have_received(:new)
  end
end

describe 'file_list' do
  let(:files) do
    {
      'a' => {
        'b' => {
          'c' => {
            'd' => {
              'e' => true
            },

            'f' => true
          }
        }
      }
    }
  end

  specify { expect(file_list(files)).to match_array(['a/b/c/d/e', 'a/b/c/f']) }
end

describe 'find_missing_number' do
  let(:integers) { [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
  let(:shuffled) { [8, 7, 2, 1, 10, 9, 6, 3, 5] }
  let(:deleted) { 4 }

  specify { expect(find_missing_number(integers, shuffled)).to eq(deleted) }
end

describe 'is_shuffle?' do
  let(:first) { 'abc' }
  let(:second) { 'def' }

  specify { expect(is_shuffle?(first, second, 'abdecf')).to be_truthy }
  specify { expect(is_shuffle?(first, second, 'fcedba')).to be_falsy }
end

describe 'binary' do
  specify { expect(binary(0)).to eq('0') }
  specify { expect(binary(5)).to eq('101') }
  specify { expect(binary(15)).to eq('1111') }
end

describe 'recursive_factorial' do
  specify { expect(recursive_factorial(0)).to eq(1) }
  specify { expect(recursive_factorial(1)).to eq(1) }
  specify { expect(recursive_factorial(3)).to eq(6) }
  specify { expect(recursive_factorial(5)).to eq(120) }

  it 'calls itself' do
    expect(self).to receive(:recursive_factorial)
      .at_least(:twice).and_call_original
    recursive_factorial(10)
  end
end

describe 'iterative_factorial' do
  specify { expect(recursive_factorial(0)).to eq(1) }
  specify { expect(recursive_factorial(1)).to eq(1) }
  specify { expect(recursive_factorial(3)).to eq(6) }
  specify { expect(recursive_factorial(5)).to eq(120) }

  it 'does not call itself' do
    expect(self).to_not receive(:iterative_factorial)
      .at_least(:twice).and_call_original
    recursive_factorial(10)
  end
end

describe 'permutations' do
  specify { expect(permutations([1])).to match_array([[1]]) }
  specify { expect(permutations([1, 2])).to match_array([[1, 2], [2, 1]]) }
end
