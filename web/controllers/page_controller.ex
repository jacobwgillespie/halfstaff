defmodule Halfstaff.PageController do
  use Halfstaff.Web, :controller

  def index(conn, _params) do
    render conn, "index.html",
      recent: Halfstaff.Notices.recent,
      current: Halfstaff.Notices.current,
      currentHalfStaff: Halfstaff.Notices.currentHalfStaff,
      pageHalfStaff: Halfstaff.Notices.currentHalfStaff
  end

  def about(conn, _params) do
    render conn, "about.html",
      currentHalfStaff: Halfstaff.Notices.currentHalfStaff,
      pageHalfStaff: Halfstaff.Notices.currentHalfStaff
  end

  def notice(conn, %{"id" => id}) do
    notice = Halfstaff.Notices.get(id)
    case notice do
      nil ->
        redirect conn, to: "/"

      _ ->
        render conn, "notice.html",
          notice: notice,
          currentHalfStaff: Halfstaff.Notices.currentHalfStaff,
          pageHalfStaff: true
    end
  end
end
