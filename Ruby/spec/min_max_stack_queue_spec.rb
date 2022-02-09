require "min_max_stack_queue"

describe MinMaxStackQueue do
  it { should respond_to(:enqueue) }
  it { should respond_to(:dequeue) }
  it { should respond_to(:length) }
  it { should respond_to(:max) }
  it { should respond_to(:min) }
end
