defmodule Halfstaff.SubscriptionView do
  use Halfstaff.Web, :view

  def render("index.json", %{subscriptions: subscriptions}) do
    %{data: render_many(subscriptions, Halfstaff.SubscriptionView, "subscription.json")}
  end

  def render("show.json", %{subscription: subscription}) do
    %{data: render_one(subscription, Halfstaff.SubscriptionView, "subscription.json")}
  end

  def render("subscription.json", %{subscription: subscription}) do
    %{id: subscription.id,
      number: subscription.number,
      login_token: subscription.login_token,
      token_generated_at: subscription.token_generated_at,
      active: subscription.active,
      stripe_id: subscription.stripe_id,
      stripe_last4: subscription.stripe_last4,
      expires_at: subscription.expires_at}
  end
end
