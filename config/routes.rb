Rails.application.routes.draw do
  root to: 'home#index'

  devise_for :users, only: %i[sessions registrations],
    controllers: {
      registrations: 'api/v1/devise_custom/registrations',
      sessions: 'api/v1/devise_custom/sessions'
    },
    path_names: { sign_in: 'sign_in', sign_up: 'sign_up', sign_out: 'sign_out' }

  namespace :api do
    namespace :v1 do
      resources :geo_points, except: %i[new edit]
      resources :map, only: :index

      get '/auth/signed_in', to: 'auth#signed_in'
    end
  end

  # should be always the LAST
  get '/*path' => 'home#index'
end
