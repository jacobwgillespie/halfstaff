defmodule Halfstaff.SubscriptionTest do
  use Halfstaff.ModelCase

  alias Halfstaff.Subscription

  @valid_attrs %{active: true, expires_at: %{day: 17, hour: 14, min: 0, month: 4, sec: 0, year: 2010}, login_token: "some content", number: "some content", stripe_last4: "some content", stripe_id: "some content", token_generated_at: %{day: 17, hour: 14, min: 0, month: 4, sec: 0, year: 2010}}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Subscription.changeset(%Subscription{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Subscription.changeset(%Subscription{}, @invalid_attrs)
    refute changeset.valid?
  end
end
