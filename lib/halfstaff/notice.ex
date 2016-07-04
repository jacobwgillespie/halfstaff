defmodule Halfstaff.Notice do
  @derive [Poison.Encoder]

  defstruct title: nil,
    date: nil,
    body: nil,
    url: nil,
    id: nil,
    nlp: nil,
    tags: %Halfstaff.Tags{},
    html: nil,
    firstLine: nil,
    cleanTitle: nil
end
