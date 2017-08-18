class Api::V1::BlocksController < ApplicationController
  
  def index
    render json: Block.all
  end
end
