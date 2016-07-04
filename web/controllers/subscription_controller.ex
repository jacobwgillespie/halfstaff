defmodule Halfstaff.SubscriptionController do
  use Halfstaff.Web, :controller

  alias Halfstaff.Subscription

  def index(conn, _params) do
    subscriptions = Repo.all(Subscription)
    render(conn, "index.json", subscriptions: subscriptions)
  end

  def create(conn, %{"subscription" => subscription_params}) do
    changeset = Subscription.changeset(%Subscription{}, subscription_params)

    case Repo.insert(changeset) do
      {:ok, subscription} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", subscription_path(conn, :show, subscription))
        |> render("show.json", subscription: subscription)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Halfstaff.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    subscription = Repo.get!(Subscription, id)
    render(conn, "show.json", subscription: subscription)
  end

  def update(conn, %{"id" => id, "subscription" => subscription_params}) do
    subscription = Repo.get!(Subscription, id)
    changeset = Subscription.changeset(subscription, subscription_params)

    case Repo.update(changeset) do
      {:ok, subscription} ->
        render(conn, "show.json", subscription: subscription)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Halfstaff.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    subscription = Repo.get!(Subscription, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(subscription)

    send_resp(conn, :no_content, "")
  end
end
