class BlockSerializer < ActiveModel::Serializer
  attributes :id, :name, :color, :location, :list_id
end
