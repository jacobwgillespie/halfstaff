defmodule Halfstaff.Router do
  use Halfstaff.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Halfstaff do
    pipe_through :browser # Use the default browser stack

    resources "/subscriptions", SubscriptionController, except: [:new, :edit]

    get "/", PageController, :index
    get "/about", PageController, :about
    get "/:id", PageController, :notice
  end

  # Other scopes may use custom stacks.
  # scope "/api", Halfstaff do
  #   pipe_through :api
  # end
end
