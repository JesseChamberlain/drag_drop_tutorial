class Api::V1::BlocksController < ApplicationController

  # Assigns a variable an array of all the blocks in the database
  # It then sorts the blocks based on the location column and returns as a JSON.
  def index
    blocks = Block.all
    blocks = blocks.order(location: :asc)
    render json: blocks
  end
end
