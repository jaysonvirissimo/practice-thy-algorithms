require "silly_years"

describe "silly_years" do
  it "should return the ten subsequent silly years" do
    array = [2307, 2417, 2527, 2637, 2747, 2857, 2967, 3406, 3516, 3626]
    expect(silly_years(1978)).to match_array(array)
  end

  it "should return the ten subsequent silly years" do
    array = [2417, 2527, 2637, 2747, 2857, 2967, 3406, 3516, 3626, 3736]
    expect(silly_years(2307)).to match_array(array)
  end
end
