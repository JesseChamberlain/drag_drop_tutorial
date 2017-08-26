# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).


LISTS = [
  { name: "First" }
].freeze

LISTS.each do |s|
  list = List.find_or_initialize_by(name: s[:name])
  list.assign_attributes(s)
  list.save!
end

BLOCKS = [
  {
    name: "I",
    color: "green",
    location: "1",
    list_id: List.find_by(name: "First").id
  },
  {
    name: "A1",
    color: "red",
    location: "2",
    list_id: List.find_by(name: "First").id
  },
  {
    name: "A2",
    color: "red",
    location: "3",
    list_id: List.find_by(name: "First").id
  },
  {
    name: "A3",
    color: "red",
    location: "4",
    list_id: List.find_by(name: "First").id
  },
  {
    name: "B1",
    color: "pink",
    location: "5",
    list_id: List.find_by(name: "First").id
  },
  {
    name: "B2",
    color: "pink",
    location: "6",
    list_id: List.find_by(name: "First").id
  },
  {
    name: "BB",
    color: "pink",
    location: "7",
    list_id: List.find_by(name: "First").id
  },
  {
    name: "C",
    color: "green",
    location: "8",
    list_id: List.find_by(name: "First").id
  },
  {
    name: "A4",
    color: "red",
    location: "9",
    list_id: List.find_by(name: "First").id
  }
].freeze

BLOCKS.each do |b|
  block = Block.new(
    name: b[:name],
    color: b[:color],
    location: b[:location],
    list_id: b[:list_id]
  )
  block.assign_attributes(b)
  block.save!
end
