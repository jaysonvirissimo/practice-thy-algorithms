# Implement MinimumCoinChange#make_change
# When given an amount, it should return a collection of coins that:
# 1. Add up to that amount 
# 2. Contains no more coins that are absolutely needed to sum to the amount 
class MinimumCoinChange
  def initialize(coins: AMERICAN_COINS)
    @coin = coins
  end

  def make_change(amount)
  end

  private

  AMERICAN_COINS = [1, 5, 10, 25].freeze
end