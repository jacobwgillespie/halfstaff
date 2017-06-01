class PauseNotifications
  attr_reader :user

  def initialize(user:)
    @user = user
  end

  def pause
    user.active = user.active ? false : true
    user.save
  end
end
