Rails.configuration.stripe = {
  key: Rails.application.credentials.stripe_key,
  secret: Rails.application.credentials.stripe_secret,
}

Stripe.api_key = Rails.configuration.stripe[:secret]
