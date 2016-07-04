defmodule Halfstaff.Tags do
  @derive [Poison.Encoder]

  defstruct [
    :type,
    :person,
    :newestDate,
    :startDate,
    :endDate,
    :endTime,
  ]
end
