class Api::V1::ListsController < ApplicationController

  def index
    render json List.all
  end

  # Assigns a variable an array of all the blocks in the database
  # It then sorts the blocks based on the location column and returns as a JSON.
  def show
    list = List.find(params[:id])
    blocks = list.blocks
    blocks = blocks.order(location: :asc)
    render json: {list: list, blocks: blocks}
  end
end
