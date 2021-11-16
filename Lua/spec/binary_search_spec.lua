require("../src/binary_search")

describe("#binary_search", function()
  it("should return the index of the found element", function()
    local array = {1, 5, 13, 23, 305, 333, 402, 454, 500}

    assert.is_equal(binary_search(array, 13), 3)
  end)

  it("should return nil if the target isn't found", function()
    local array = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
    local result = binary_search(array, 11)

    assert.is_nil(result)
  end)
end)