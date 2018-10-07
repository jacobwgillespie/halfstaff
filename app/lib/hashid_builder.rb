class HashidBuilder
  class << self
    def hashids
      @hashids ||= Hashids.new("halfstaff")
    end

    def encode(*args)
      hashids.encode(*args)
    end

    def decode(*args)
      hashids.decode(*args)
    end
  end
end
