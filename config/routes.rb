Rails.application.routes.draw do
  # Homepage
  root "notices#index"

  # About page
  get "about" => "static#about"

  # Notifications
  get "notifications" => "notifications#dashboard"
  post "notifications" => "notifications#charge"
  put "notifications/pause" => "notifications#pause"

  # Authentication
  post "authentication" => "authentication#phone", as: :authentication_phone
  get "authentication/:phone" => "authentication#token", as: :authentication_token
  post "authentication/:phone" => "authentication#create"
  delete "authentication" => "authentication#destroy", as: :logout

  # Jump link for SMS
  get "n/:id" => "notices#jump"

  # SEO redirects from old site version
  get "yA399zrmM0" => redirect("n/p0k3b")
  get "yA39EAzJlK" => redirect("n/7lArW")
  get "yA39gkMeqB" => redirect("n/6l2Qb")
  get "yA39ARkX4O" => redirect("n/M5d0a")
  get "yA3z7evlWr" => redirect("n/xxDEg")
  get "yA3z44y3Wx" => redirect("n/5lzWN")
  get "yA3BPgvrKQ" => redirect("n/3lgkn")
  get "yA3BWdJY8D" => redirect("n/nyoXr")
  get "yA3BWbol9g" => redirect("n/yBp2W")
  get "yA3ymA8GmB" => redirect("n/GAObW")

  # Fallback for all notices
  get ":id" => "notices#show", as: :notice

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
