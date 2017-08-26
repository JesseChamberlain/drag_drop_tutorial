class Block < ApplicationRecord
  validates :name, presence: true
  validates :color, presence: true
  validates_numericality_of :location,
    only_integer: true,
    greater_than_or_equal_to: 1,
    less_than_or_equal_to: 250
    
  belongs_to :list
end
