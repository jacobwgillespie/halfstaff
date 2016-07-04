defmodule Halfstaff.Notices do
  require Memoize
  use Timex

  Memoize.defmemo getPath(id) do
    "./data/notices/#{id}.json"
  end

  Memoize.defmemo get(id) do
    path = getPath(id)
    lines = File.read!(path)
    notice = Poison.decode!(lines, as: %Halfstaff.Notice{})
    convert_notice(notice)
  end

  Memoize.defmemo recent do
    lines = File.read!("./data/recent.json")
    recent = Poison.decode!(lines, as: [%Halfstaff.Notice{}])
    recent |> Enum.map(fn(n) -> convert_notice(n) end)
  end

  Memoize.defmemo current do
    lines = File.read!("./data/recent.json")
    recent = Poison.decode!(lines, as: [%Halfstaff.Notice{}])

    now = DateTime.now
    one_day = 1000 * 60 * 60 * 24

    recent
      |> Enum.filter(fn(n) ->
        n.tags.startDate <= now
        && (
          (n.tags.endDate && n.tags.endDate >= now)
          || (!n.tags.endDate && (n.tags.startDate + one_day) >= now)
        )
      end)
      |> Enum.map(fn(n) -> convert_notice(n) end)
  end

  Memoize.defmemo currentHalfStaff do
    case current do
      [] -> false
      _ -> true
    end
  end

  def convert_notice(notice) do
    %Halfstaff.Notice{
      notice |
        date: notice.date
          |> DateTime.from_milliseconds
          |> Timezone.convert("America/New_York")
          |> Timex.format("{Mfull} {D}, {YYYY}")
          |> Tuple.to_list
          |> List.last,
        firstLine: notice.firstLine
          |> String.replace(~r/&[^;]{1,5};/, "")
          |> String.split(" ")
          |> Enum.slice(0..100)
          |> Enum.join(" "),
        tags: %Halfstaff.Tags{
          notice.tags |
            startDate: notice.tags.startDate
              |> DateTime.from_milliseconds
              |> Timezone.convert("America/New_York")
              |> Timex.format("{Mfull} {D}, {YYYY}")
              |> Tuple.to_list
              |> List.last,
            endDate: case notice.tags.endDate do
              nil -> nil

              val -> val
                |> DateTime.from_milliseconds
                |> Timezone.convert("America/Los_Angeles")
                |> Timex.format("{Mfull} {D}, {YYYY}")
                |> Tuple.to_list
                |> List.last
            end,

            endTime: case notice.tags.endTime do
              "noon" ->
                "until noon"
              "sunset" ->
                "until sunset"
              _ ->
                ""
            end
        }
      }
  end
end
