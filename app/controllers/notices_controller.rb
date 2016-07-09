class NoticesController < ApplicationController
  before_action :lower_page_flag, only: [:show]

  def index
    @current_notices = Notice.current
    @recent_notices = Notice.recent
  end

  def show
    @notice = Notice.where(slug: params[:id]).first!
  rescue ActiveRecord::RecordNotFound
    redirect_to :root
  end

  def jump
    @notice = Notice.where(hashid: params[:id]).first
    redirect_to @notice || :root
  end
end
