from django.urls import path
from rest_framework.authtoken import views
from .views import RegisterUser,DeleteUserToken


urlpatterns = [
    path('token', views.obtain_auth_token),
    path('register',RegisterUser.as_view()),
    path('logout',DeleteUserToken.as_view())

]
