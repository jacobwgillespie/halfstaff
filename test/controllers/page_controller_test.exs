defmodule Halfstaff.PageControllerTest do
  use Halfstaff.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "currently at"
  end
end
