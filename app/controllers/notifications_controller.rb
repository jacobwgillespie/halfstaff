class NotificationsController < ApplicationController
  def dashboard
    if signed_in?
      render :manage
    else
      render :signin
    end
  end

  def charge
    action = ExtendNotifications.new(
      user: current_user,
      email: params[:email],
      token: params[:token],
      years: params[:years].to_i,
    )

    if action.extend_subscription
      flash[:notice] = "Successfully extended notifications by #{years} #{'years'.pluralize(years)}"
    end

    redirect_to notifications_path
  rescue Stripe::StripeError => e
    flash[:error] = e.message
    redirect_to notifications_path
  end

  def pause
    action = PauseNotifications.new(
      user: current_user,
    )

    flash[:notice] = if action.pause
      'Successfully paused notifications'
    else
      'Successfully resumed notifications'
    end

    redirect_to notifications_path
  end

  protected

  def notification_params
    params.permit(:active)
  end
end
