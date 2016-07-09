Rails.configuration.stripe = {
  key: ENV['STRIPE_KEY'],
  secret: ENV['STRIPE_SECRET'],
}

Stripe.api_key = Rails.configuration.stripe[:secret]
