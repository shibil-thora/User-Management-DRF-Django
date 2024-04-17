from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.Home.as_view()), 
    path('login_user/', views.LoginUser.as_view()),
    path('user_set/', views.UserSetView.as_view()),
    path('delete_user/', views.DeleteUserview.as_view()),
    path('edit_user/', views.EditUserview.as_view()),
]
