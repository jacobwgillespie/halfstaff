require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Halfstaff
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    if ENV['REDIS_URL']
      config.cache_store = :redis_store, "#{ENV['REDIS_URL']}/0/cache", { expires_in: 90.minutes }
    end
  end
end
