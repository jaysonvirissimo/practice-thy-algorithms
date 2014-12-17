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
