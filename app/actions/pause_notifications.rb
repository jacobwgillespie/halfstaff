class PauseNotifications
  attr_reader :user

  def initialize(user:)
    @user = user
  end

  def pause
    if user.active
      user.active = false
    else
      user.active = true
    end

    user.save
  end
end
