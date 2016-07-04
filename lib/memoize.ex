defmodule Memoize do
  alias Memoize.ResultTable

  defmacro defmemo(head = {:when, _, [{f_name, _, f_vars} | _]}, do: body) do
    quote do
      def unquote(head) do
        sig = {__MODULE__, unquote(f_name)}
        args = unquote(f_vars)

        case ResultTable.get(sig, args) do
          {:hit, value}   -> value
          {:miss, nil}    -> ResultTable.put(sig, args, unquote(body))
        end
      end
    end
  end

  defmacro defmemo(head = {name, _, vars}, do: body) do
    quote do
      def unquote(head) do
        sig = {__MODULE__, unquote(name)}

        case ResultTable.get(sig, unquote(vars)) do
          {:hit, value} -> value
          {:miss, nil}  -> ResultTable.put(sig, unquote(vars), unquote(body))
        end
      end
    end
  end

  defmacro defmemo(head = {:when, _, [{f_name, _, f_vars} | _]}, normalizer, do: body) do
    quote do
      def unquote(head) do
        sig = {__MODULE__, unquote(f_name)}
        args = unquote(f_vars) |> unquote(normalizer)

        case ResultTable.get(sig, args) do
          {:hit, value}   -> value
          {:miss, nil}    -> ResultTable.put(sig, args, unquote(body))
        end
      end
    end
  end

  defmacro defmemo(head = {name, _, vars}, normalizer, do: body) do
    quote do
      def unquote(head) do
        sig = {__MODULE__, unquote(name)}

        args = unquote(vars) |> unquote(normalizer)

        case ResultTable.get(sig, args) do
          {:hit, value} -> value
          {:miss, nil}  -> ResultTable.put(sig, args, unquote(body))
        end
      end
    end
  end

  defmodule ResultTableBehaviour do
    use Behaviour

    @callback start_link :: any | nil
    @callback get(fun :: Fun, args :: List) :: any
    @callback put(fun :: Fun, args :: List, result :: any) :: any
  end

  defmodule ResultTable do
    @behaviour ResultTableBehaviour

    use GenServer

    def start_link do
      GenServer.start_link(__MODULE__, Map.new, name: :result_table)
    end

    def get(fun, args) do
      GenServer.call(:result_table, {:get, fun, args})
    end

    def put(fun, args, result) do
      GenServer.cast(:result_table, {:put, fun, args, result})
      result
    end

    def handle_call({:get, fun, args}, _sender, map) do
      reply(Map.fetch(map, {fun, args}), map)
    end

    def handle_cast({:put, fun, args, result}, map) do
      {:noreply, Map.put(map, {fun, args}, result)}
    end

    defp reply(:error, map) do
      {:reply, {:miss, nil}, map}
    end

    defp reply({:ok, val}, map) do
     {:reply, {:hit, val}, map}
    end
  end
end
