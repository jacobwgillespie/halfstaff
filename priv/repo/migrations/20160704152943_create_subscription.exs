defmodule Halfstaff.Repo.Migrations.CreateSubscription do
  use Ecto.Migration

  def change do
    create table(:subscriptions) do
      add :number, :string
      add :login_token, :string
      add :token_generated_at, :datetime
      add :active, :boolean, default: false, null: false
      add :stripe_id, :string
      add :stripe_last4, :string
      add :expires_at, :datetime

      timestamps()
    end

  end
end
