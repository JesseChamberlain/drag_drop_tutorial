class Api::V1::BlocksController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authorize_user

  def index
    song = Song.find(params[:song_id])
    blocks = song.blocks
    render json: blocks
  end

  def create
    data = JSON.parse(request.body.read)
    block = Block.new(data)
    block.save
    render json: { message: "Created Block" }
  end

  def update
    data = JSON.parse(request.body.read)
    block = Block.find(params[:id])
    block.name = data["name"]
    block.repetitions = data["repetitions"]
    block.measures = data["measures"]
    block.time_signature_over = data["time_signature_over"]
    block.time_signature_under = data["time_signature_under"]
    block.musical_key = data["musical_key"]
    block.color = data["color"]
    block.tempo = data["tempo"]
    block.save
    render json: { message: "Updated Block" }
  end

  def destroy
    block = Block.find(params[:id])
    block.delete
    render json: { message: "Deleted Block" }
  end

  def authorize_user
    if !current_user
      return render json: { errors: ['Please sign in/up'] }, status: 403
    end
  end
end
