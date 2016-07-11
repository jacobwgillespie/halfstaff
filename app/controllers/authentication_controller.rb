class AuthenticationController < ApplicationController
  # Receive a phone number, send a token, redirect to token page
  def phone
    unless Phone.valid?(params[:phone])
      flash[:error] = 'Invalid phone number'
      return redirect_to(notifications_path)
    end

    number = Phone.sanitize(params[:phone])
    User.where(phone: number).first_or_create.issue_token
    redirect_to authentication_token_path(number)
  end

  # Display token entry page
  def token
    @phone = params[:phone]
    @formatted_phone = Phone.format(@phone)
  end

  # Receive a token, perform authentication, redirect to notifications
  def create
    @user = User.authenticate(
      params[:phone],
      params[:token],
    )

    if @user
      session[:user] = @user.id
      flash[:notice] = 'Successfully verified your phone number'
      redirect_to :notifications
    else
      flash[:error] = 'Invalid token, please try again'
      redirect_to authentication_token_path(params[:phone])
    end
  end

  # Log out
  def destroy
    session[:user] = nil
    redirect_to notifications_path
  end
end
