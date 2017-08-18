Rails.application.routes.draw do
  root 'static_pages#index'
  
  namespace :api do
    namespace :v1 do
      resources :blocks, only: [:index, :create, :update]
    end
  end
end
