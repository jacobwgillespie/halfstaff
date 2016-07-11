module Phone
  def self.valid?(number)
    Phonelib.valid?(number)
  end

  def self.sanitize(number)
    Phonelib.parse(number).sanitized
  end

  def self.format(number)
    Phonelib.parse(number).national
  end
end
