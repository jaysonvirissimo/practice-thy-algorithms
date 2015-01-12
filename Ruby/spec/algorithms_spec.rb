require 'algorithms'
require 'set'

describe 'digital_root' do

  it "65,536 should return 7" do
    expect(digital_root(65536)).to eq(7)
  end

  it "1,853 should return 8" do
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

  it "[1, 2, 3] should return 6" do
    expect(sum_rec([1, 2, 3])).to eq(6)
  end

  it "[99, 66, 33] should return 198" do
    expect(sum_rec([99,66, 33])).to eq(198)
  end

end

describe 'fibs' do

  it "3 should return [0, 1, 1]" do
    expect(fibs(3)).to eq([0, 1, 1])
  end

  it "5 should return [0, 1, 1, 2, 3]" do
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

  it "should return all the substrings" do
    array = ["a", "b", "c", "d", "ab", "bc", "cd", "abc", "bcd", "abcd"]
    expect(uniq_subs('abcd')).to match_array(array)
  end

  it "shouldn't have repeats" do
    array = ["d", "du", "dud", "dude", "u", "ud", "ude", "de", "e"]
    expect(uniq_subs('dude')).to match_array(array)
  end

end

describe 'lcs' do

  it "should return the largest sum" do
    expect(lcs([4, -1, 5, 6, -13, 2])).to eq(14)
  end

  it "should return the largest sum" do
    expect(lcs([-2, 1, -3, 4, -1, 2, 1, -5, 4])).to eq(6)
  end

end

describe 'silly_years' do

  it "should return the ten subsequent silly years" do
    array = [1978, 2307, 2417, 2527, 2637, 2747, 2857, 2967, 3406, 3516]
    expect(silly_years(1978)).to match_array(array)
  end

  it "should return the ten subsequent silly years" do
    array = [2307, 2417, 2527, 2637, 2747, 2857, 2967, 3406, 3516, 3626]
    expect(silly_years(2307)).to match_array(array)
  end

end

describe 'pair_sum' do

  it "should return all the pairs that sum to 0" do
    set = Set.new
    set.add([-1, 1])
    expect(pair_sum([1, 2, -1], 0)).to eq(set)
  end

  it "should return all the pairs that sum to 1" do
    set = Set.new
    set.add([-1, 2])
    expect(pair_sum([1, 2, -1, -1, -2], 1)).to eq(set)
  end

end

describe 'matrix_region_sum' do

  it "should return the sum of the elements within the coordinates" do
    matrix = [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
    top_left_coords = [0, 0]
    bottom_right_coords = [1, 1]
    expect(matrix_region_sum(matrix, top_left_coords, bottom_right_coords)).to eq(8)
  end

  it "should return the sum of the elements within the coordinates" do
    matrix = [[2, 3, 4], [3, 4, 5], [4, 5, 6]]
    top_left_coords = [0, 0]
    bottom_right_coords = [2, 2]
    expect(matrix_region_sum(matrix, top_left_coords, bottom_right_coords)).to eq(36)
  end

end

describe 'merge_sort' do

  it "should sort the array" do
    array = [5, 4, 3, 2, 1]
    expect(merge_sort(array)).to match_array([1, 2, 3, 4, 5])
  end

  it "sort the array" do
    array = [2345, 443, 2342, 234, 343, 24]
    expect(merge_sort(array)).to match_array([24, 234, 343, 443, 2342, 2345])
  end

end

describe 'binary_search' do

  it "should return the correct " do
    array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    target = 6
    expect(binary_search(array, target)).to eq(5)
  end

  it "sort the array" do
    array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    target = 11
    expect(binary_search(array, target)).to be_nil
  end

end
