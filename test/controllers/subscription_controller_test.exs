defmodule Halfstaff.SubscriptionControllerTest do
  use Halfstaff.ConnCase

  alias Halfstaff.Subscription
  @valid_attrs %{active: true, expires_at: %{day: 17, hour: 14, min: 0, month: 4, sec: 0, year: 2010}, login_token: "some content", number: "some content", stripe_last4: "some content", stripe_id: "some content", token_generated_at: %{day: 17, hour: 14, min: 0, month: 4, sec: 0, year: 2010}}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, subscription_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    subscription = Repo.insert! %Subscription{}
    conn = get conn, subscription_path(conn, :show, subscription)
    assert json_response(conn, 200)["data"] == %{"id" => subscription.id,
      "number" => subscription.number,
      "login_token" => subscription.login_token,
      "token_generated_at" => subscription.token_generated_at,
      "active" => subscription.active,
      "stripe_id" => subscription.stripe_id,
      "stripe_last4" => subscription.stripe_last4,
      "expires_at" => subscription.expires_at}
  end

  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, subscription_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, subscription_path(conn, :create), subscription: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Subscription, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, subscription_path(conn, :create), subscription: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    subscription = Repo.insert! %Subscription{}
    conn = put conn, subscription_path(conn, :update, subscription), subscription: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Subscription, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    subscription = Repo.insert! %Subscription{}
    conn = put conn, subscription_path(conn, :update, subscription), subscription: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    subscription = Repo.insert! %Subscription{}
    conn = delete conn, subscription_path(conn, :delete, subscription)
    assert response(conn, 204)
    refute Repo.get(Subscription, subscription.id)
  end
end
