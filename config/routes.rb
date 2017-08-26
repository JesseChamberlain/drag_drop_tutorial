Rails.application.routes.draw do
  root 'lists#show'

  namespace :api do
    namespace :v1 do
      resources :lists, only: [:index, :show, :update]
    end
  end
  resources :lists, only: [:show]
end
