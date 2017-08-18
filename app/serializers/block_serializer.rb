class BlockSerializer < ActiveModel::Serializer
  attributes :id, :name, :color, :location
end
