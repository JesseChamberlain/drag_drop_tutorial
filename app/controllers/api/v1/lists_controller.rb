class Api::V1::ListsController < ApplicationController
  skip_before_action :verify_authenticity_token
  
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

  def update
    binding.pry
    data = JSON.parse(request.body.read)

    # blocks = Song.find(params[:id]).blocks
    # blocks.each do |block|
    #   data["blocks"].each_with_index do |d, i|
    #     if d["id"] == block.id
    #       new_location = (i + 1)
    #       unless new_location == block.location
    #         block.location = new_location
    #         block.save
    #       end
    #     end
    #   end
    # end
    # song = Song.find(params[:id])
    # sorted_blocks = blocks.sort_by{|b| b["location"]}
    # render json: {song: song, blocks: sorted_blocks}

  end
end
