class User < ApplicationRecord
  has_many :payments

  scope :active, -> { where(active: true).where('expires_at > ?', Time.now) }

  validates(
    :phone,
    presence: true,
    phone: true,
  )

  def self.authenticate(phone, token)
    user = where(
      phone: Phone.sanitize(phone),
      token: token,
    ).where('token_generated_at > ?', 1.hour.ago).first

    user&.reset_login

    user
  end

  def active?
    stripe_id && expires_at > Time.now
  end

  def extend_user(years)
    self.expires_at = Time.now if expires_at.nil? || expires_at < Time.now
    self.expires_at += years.years
    self.active = true
    save

    Sms.send(
      phone,
      "Your flag notifications are now extended until #{expires_at.strftime('%B %-d, %Y')}",
    )
  end

  def formatted_phone
    Phone.format(phone)
  end

  def issue_token
    return if last_texted_about_login_at && last_texted_about_login_at > 10.minutes.ago

    if token_generated_at.nil? || token_generated_at < 1.hour.ago
      self.token = rand(9999).to_s.center(4, rand(9).to_s)
      self.token_generated_at = Time.now
      save
    end
    Sms.send(phone, "Your HalfStaff.co verification code is: #{token}")
    self.last_texted_about_login_at = Time.now
    save
  end

  def reset_login
    self.last_texted_about_login_at = nil
    self.token_generated_at = nil
    self.token = nil
    save
  end
end
