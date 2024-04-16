from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.Home.as_view()), 
    path('login_user/', views.LoginUser.as_view()),
]
