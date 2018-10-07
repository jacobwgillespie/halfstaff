class ExtendNotifications
  attr_reader :user, :email, :token, :years

  def initialize(user:, email:, token:, years:)
    @user = user
    @email = email
    @token = token
    @years = years
  end

  def extend_subscription
    return false unless years.positive?

    charge = Stripe::Charge.create(
      customer: customer.id,
      amount: amount,
      description: "#{years} #{'year'.pluralize(years)} of notifications",
      currency: 'usd',
    )

    # Extend the user's notifications, optimistically assuming that the charge
    # succeeded - this is a small side project, fraud is not a major issue
    user.extend_user(years)

    user.payments.create(
      customer_id: customer.id,
      charge_id: charge.id,
      email: email,
      years: years,
      amount: amount,
    )

    true
  end

  protected

  def amount
    years * 200
  end

  def customer
    @customer ||= Stripe::Customer.create(
      email: email,
      source: token,
      metadata: { user_id: user.id },
    )
  end
end
