require_relative "../lib/valid_parentheses"

describe "valid_parentheses" do
  it "should return true for simple parentheses pair" do
    expect(valid_parentheses("()")).to eq(true)
  end
  
  it "should return true for multiple bracket types in sequence" do
    expect(valid_parentheses("()[]{}")).to eq(true)
  end
  
  it "should return false for mismatched bracket types" do
    expect(valid_parentheses("(]")).to eq(false)
  end
  
  it "should return true for properly nested brackets" do
    expect(valid_parentheses("([])")).to eq(true)
  end
  
  it "should return false for improperly nested brackets" do
    expect(valid_parentheses("([)]")).to eq(false)
  end
end
