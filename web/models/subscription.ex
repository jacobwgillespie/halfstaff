defmodule Halfstaff.Subscription do
  use Halfstaff.Web, :model

  schema "subscriptions" do
    field :number, :string
    field :login_token, :string
    field :token_generated_at, Timex.Ecto.DateTime
    field :active, :boolean, default: false
    field :stripe_id, :string
    field :stripe_last4, :string
    field :expires_at, Timex.Ecto.DateTime

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:number, :login_token, :token_generated_at, :active, :stripe_id, :stripe_last4, :expires_at])
    |> validate_required([:number, :login_token, :token_generated_at, :active, :stripe_id, :stripe_last4, :expires_at])
  end
end
