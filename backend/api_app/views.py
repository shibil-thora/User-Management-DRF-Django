from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework import views
from rest_framework.permissions import IsAuthenticated, BasePermission, AllowAny 
from rest_framework_simplejwt.authentication import JWTAuthentication 
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, login, logout
from rest_framework.exceptions import AuthenticationFailed


class Home(APIView): 
    def get(self, request): 
        print(request.META)
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        print(auth_header)
        return Response({'message': 'Hellow World!'}) 
    

class LoginUser(APIView): 
    def post(self, request): 
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user is None: 
            raise AuthenticationFailed('invalid credentials') 
        
        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token
        user_obj = User.objects.get(id=user.id)
        user_data = UserSerializer(user_obj) 
        
        response_data = {
            'refresh_token': str(refresh), 
            'access_token': str(access_token), 
            'user': user_data.data,
        }
        return Response(response_data)



