require "longest_palindrome"

describe "longest_palindrome" do
  specify { expect(longest_palindrome("asdfdsaqwerqwer")).to eq([0, 6]) }
  specify { expect(longest_palindrome("asdfghjklzxcxz")).to eq([9, 13]) }
end
