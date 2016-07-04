# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :halfstaff,
  ecto_repos: [Halfstaff.Repo]

# Configures the endpoint
config :halfstaff, Halfstaff.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "KllhufMx4qCY344zwZ4+iG6SxpfAKGyEww3x9lfJe9Tgm0rVAimYsZCqo66gNzLt",
  render_errors: [view: Halfstaff.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Halfstaff.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
