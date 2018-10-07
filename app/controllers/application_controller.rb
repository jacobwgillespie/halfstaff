class ApplicationController < ActionController::Base
  before_action :set_flag_status

  helper_method :signed_in?, :current_user

  layout :set_layout

  def set_flag_status
    @currently_half_staff = !Notice.current.empty?
    @page_half_staff = @currently_half_staff
  end

  def lower_page_flag
    @page_half_staff = true
  end

  def current_user
    @current_user ||= User.where(id: session[:user]).first
  end

  def signed_in?
    !current_user.nil?
  end

  protected

  def set_layout
    "flag"
  end
end
