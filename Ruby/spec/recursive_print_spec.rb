require "recursive_print"

describe "#recursive_print" do
  specify do
    input = [1, [2, 3], [4, 5]]

    expect { recursive_print(input) }.to output(/1 2 3 4 5/).to_stdout
  end
end
