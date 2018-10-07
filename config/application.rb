require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Halfstaff
  class Application < Rails::Application
    config.load_defaults 5.2

    if ENV["REDIS_URL"]
      config.cache_store = :redis_store, "#{ENV["REDIS_URL"]}/0/cache", {expires_in: 90.minutes}
    end
  end
end
