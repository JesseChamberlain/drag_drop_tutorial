# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

BLOCKS = [
  {
    name: "I",
    color: "green",
    location: "1"
  },
  {
    name: "A1",
    color: "red",
    location: "2"
  },
  {
    name: "A2",
    color: "red",
    location: "3"
  },
  {
    name: "A3",
    color: "red",
    location: "4"
  },
  {
    name: "B1",
    color: "pink",
    location: "5"
  },
  {
    name: "B2",
    color: "pink",
    location: "6"
  },
  {
    name: "BB",
    color: "pink",
    location: "7"
  },
  {
    name: "C",
    color: "green",
    location: "8"
  },
  {
    name: "A4",
    color: "red",
    location: "9"
  }
].freeze

BLOCKS.each do |b|
  block = Block.new(
    name: b[:name],
    color: b[:color],
    location: b[:location]
  )
  block.assign_attributes(b)
  block.save!
end
