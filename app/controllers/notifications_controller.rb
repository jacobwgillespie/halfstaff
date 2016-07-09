class NotificationsController < ApplicationController
  def dashboard
    if signed_in?
      render :manage
    else
      render :signin
    end
  end

  def charge
    years = params[:years].to_i
    if years > 0
      amount = years * 200
      customer = Stripe::Customer.create(
        email: params[:email],
        source: params[:token],
        metadata: { user_id: current_user.id },
      )

      charge = Stripe::Charge.create(
        customer: customer.id,
        amount: amount,
        description: "#{years} #{'year'.pluralize(years)} of notifications",
        currency: 'usd',
      )

      current_user.extend_user(years)

      current_user.payments.create(
        customer_id: customer.id,
        charge_id: charge.id,
        email: params[:email],
        years: years,
        amount: amount,
      )

      flash[:notice] = "Successfully extended notifications by #{years} #{'years'.pluralize(years)}"
    end

    redirect_to notifications_path
  rescue Stripe::StripeError => e
    flash[:error] = e.message
    redirect_to notifications_path
  end

  def pause
    if current_user.active
      current_user.active = false
      current_user.save
      flash[:notice] = 'Successfully paused notifications'
    else
      current_user.active = true
      current_user.save
      flash[:notice] = 'Successfully resumed notifications'
    end

    redirect_to notifications_path
  end

  protected

  def notification_params
    params.permit(:active)
  end
end
