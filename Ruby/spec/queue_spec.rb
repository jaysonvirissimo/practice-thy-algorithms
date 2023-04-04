require "queue"

describe Queue do
  subject { described_class.new }

  describe "#clear" do
    it "empties out the collection" do
      subject.enqueue(1);
      subject.enqueue(2);
      subject.enqueue(3);
      subject.clear
      expect(subject.to_s).to eq("[]")
    end
  end

  describe "#empty?" do
    specify do
      expect(subject).to be_empty
      subject.enqueue(1)
      expect(subject).not_to be_empty
    end
  end

  describe "#peek" do
    it "exposes the front of the queue" do
      subject.enqueue(1)
      subject.enqueue(2)
      expect(subject.peek).to eq(1)
    end
  end

  describe "#dequeue" do
    it "removes the item at the front of the queue" do
      subject.enqueue(1)
      subject.enqueue(2)
      subject.enqueue(3)
      expect(subject.dequeue).to eq(1)
      expect(subject.to_s).to eq("[2, 3]")
    end
  end

  describe "#enqueue" do
    it "adds the item to the front of the queue" do
      subject.enqueue(1)
      subject.enqueue(2)
      expect(subject.to_s).to eq("[1, 2]")
    end
  end

  describe "#size" do
    it "tracks the number of items in the queue" do
      subject.enqueue(1)
      subject.enqueue(2)
      expect(subject.size).to eq(2)
    end
  end
end
