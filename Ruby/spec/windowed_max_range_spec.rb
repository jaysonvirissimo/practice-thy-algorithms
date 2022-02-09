require "min_max_stack_queue"
require "windowed_max_range"

describe "windowed_max_range" do
  let(:queue) { MinMaxStackQueue.new }

  specify { expect(windowed_max_range([1, 0, 2, 5, 4, 8], 2)).to eq(4) }
  specify { expect(windowed_max_range([1, 0, 2, 5, 4, 8], 3)).to eq(5) }
  specify { expect(windowed_max_range([1, 0, 2, 5, 4, 8], 4)).to eq(6) }
  specify { expect(windowed_max_range([1, 3, 2, 5, 4, 8], 5)).to eq(6) }

  it "makes use of MinMaxStackQueue in the solution" do
    allow(MinMaxStackQueue).to receive(:new).and_return(queue)
    windowed_max_range([1, 0, 2, 5, 4, 8], 2)

    expect(MinMaxStackQueue).to have_received(:new)
  end
end
