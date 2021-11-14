require("../src/binary_search")

describe("#binary_search", function()
  it("should return nil if the target isn't found", function()
    local array = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
    local result = binary_search(array, 11)

    assert.is_nil(result)
  end)
end)