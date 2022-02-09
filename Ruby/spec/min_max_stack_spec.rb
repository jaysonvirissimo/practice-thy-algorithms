require "min_max_stack"

describe MinMaxStack do
  it { should respond_to(:length) }
  it { should respond_to(:push) }
  it { should respond_to(:pop) }
  it { should respond_to(:max) }
  it { should respond_to(:min) }
end
