Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :geo_points, except: %[new edit]
    end
  end
end
