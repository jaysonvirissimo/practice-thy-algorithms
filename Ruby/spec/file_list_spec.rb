require "file_list"

describe "file_list" do
  let(:files) do
    {
      "a" => {
        "b" => {
          "c" => {
            "d" => {
              "e" => true
            },

            "f" => true
          }
        }
      }
    }
  end

  specify { expect(file_list(files)).to match_array(["a/b/c/d/e", "a/b/c/f"]) }
end
