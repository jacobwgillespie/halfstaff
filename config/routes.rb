Rails.application.routes.draw do
  # Homepage
  root 'notices#index'

  # About page
  get 'about' => 'static#about'

  # Notifications
  get 'notifications' => 'notifications#dashboard'
  post 'notifications' => 'notifications#charge'
  put 'notifications/pause' => 'notifications#pause'

  # Authentication
  post 'authentication' => 'authentication#phone', as: :authentication_phone
  get 'authentication/:phone' => 'authentication#token', as: :authentication_token
  post 'authentication/:phone' => 'authentication#create'
  delete 'authentication' => 'authentication#destroy', as: :logout

  # Jump link for SMS
  get 'n/:id' => 'notices#jump'

  # Fallback for all notices
  get ':id' => 'notices#show', as: :notice

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
