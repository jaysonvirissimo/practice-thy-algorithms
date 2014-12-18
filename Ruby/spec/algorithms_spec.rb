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

  it "'Hello' should return 'Lipps'" do
    expect(caesar_cipher('Hello', 4)).to eq('Lipps')
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
