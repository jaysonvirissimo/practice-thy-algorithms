require "matrix_region_sum"

describe "matrix_region_sum" do
  it "should return the sum of the elements within the coordinates" do
    matrix = [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
    top_left_coords = [0, 0]
    bottom_right_coords = [1, 1]
    actual = matrix_region_sum(matrix, top_left_coords, bottom_right_coords)

    expect(actual).to eq(8)
  end

  it "should return the sum of the elements within the coordinates" do
    matrix = [[2, 3, 4], [3, 4, 5], [4, 5, 6]]
    top_left_coords = [0, 0]
    bottom_right_coords = [2, 2]
    actual = matrix_region_sum(matrix, top_left_coords, bottom_right_coords)

    expect(actual).to eq(36)
  end
end
