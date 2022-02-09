require "is_palindrome"

describe "is_palindrome?" do
  specify { expect(is_palindrome?("ricercar")).to be_falsy }
  specify { expect(is_palindrome?("racecar")).to be_truthy }
end
