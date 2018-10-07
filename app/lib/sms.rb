class Sms
  class << self
    def twilio
      @twilio ||= Twilio::REST::Client.new(
        Rails.application.credentials.twilio_account_sid,
        Rails.application.credentials.twilio_auth_token,
      )
    end

    def send(to, body)
      twilio.messages.create(
        from: Rails.application.credentials.twilio_from,
        to: "+1#{to}",
        body: body,
      )
    end
  end
end
