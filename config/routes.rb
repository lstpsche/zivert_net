Rails.application.routes.draw do
  root to: 'home#index'

  devise_for :users, only: %i[sessions registrations],
    controllers: {
      registrations: 'api/v1/devise_custom/registrations',
      sessions: 'api/v1/devise_custom/sessions'
    },
    path: '',
    path_names: { sign_in: 'sign_in', sign_out: 'sign_out' },
    defaults: { format: :json }

  namespace :api do
    namespace :v1 do
      resources :geo_points, except: %[new edit]
    end
  end

  # should be always the LAST
  get '/*path' => 'home#index'
end
