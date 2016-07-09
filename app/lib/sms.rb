class Sms
  class << self
    def twilio
      @twilio ||= Twilio::REST::Client.new(
        Rails.application.secrets.twilio_account_sid,
        Rails.application.secrets.twilio_auth_token,
      )
    end

    def send(to, body)
      twilio.messages.create(
        from: Rails.application.secrets.twilio_from,
        to: "+1#{to}",
        body: body,
      )
    end
  end
end
