require "stack"

describe Stack do
  subject { Stack.new }

  describe "#clear" do
    it "empties out the collection" do
      subject.push(1);
      subject.push(2);
      subject.push(3);
      subject.clear
      expect(subject.to_s).to eq("[]");
    end
  end

  describe "#empty?" do
    specify do
      expect(subject).to be_empty
      subject.push(1)
      expect(subject).not_to be_empty
    end
  end

  describe "#peek" do
    it "exposes the top of the stack" do
      subject.push(1)
      subject.push(2)
      expect(subject.peek).to eq(2)
    end
  end

  describe "#pop" do
    it "removes the item at the top of the stack" do
      subject.push(1)
      subject.push(2)
      subject.push(3)
      expect(subject.pop).to eq(3)
      expect(subject.to_s).to eq("[1, 2]")
    end
  end

  describe "#push" do
    it "adds the item to the top of the stack" do
      subject.push(1)
      subject.push(2)
      expect(subject.to_s).to eq("[1, 2]")
    end
  end

  describe "#size" do
    it "tracks the number of items in the stack" do
    end
  end
end
