require "reverse"

describe "reverse" do
  specify do
    expect(reverse("abcde")).to eq("edcba")
  end
end
