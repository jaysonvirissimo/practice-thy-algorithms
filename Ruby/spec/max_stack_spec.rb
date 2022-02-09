require "max_stack"

describe MaxStack do
  let(:stack) { MaxStack.new }

  it { should respond_to(:push) }
  it { should respond_to(:pop) }
  it { should respond_to(:max) }

  describe "#max" do
    it "should return the largest number added to the stack" do
      stack.push(10)
      stack.push(21)
      stack.push(32)
      expect(stack.max).to eq(32)
    end

    it "should return the largest number added to the stack" do
      stack.push(99)
      stack.pop
      stack.push(33)
      expect(stack.max).to eq(33)
    end
  end
end
