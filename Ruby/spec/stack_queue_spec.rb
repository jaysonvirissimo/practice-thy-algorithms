require "stack_queue"

describe StackQueue do
  let(:stack) { StackQueue.new }

  it { should respond_to(:enqueue) }
  it { should respond_to(:dequeue) }

  describe "#dequeue" do
    it "should dequeue elements from the stack" do
      stack.enqueue(10)
      stack.enqueue(15)
      stack.enqueue(20)
      expect(stack.dequeue).to eq(10)
      expect(stack.dequeue).to eq(15)
      expect(stack.dequeue).to eq(20)
    end
  end
end
