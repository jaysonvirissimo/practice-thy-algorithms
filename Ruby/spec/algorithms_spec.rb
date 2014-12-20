require 'algorithms'

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
