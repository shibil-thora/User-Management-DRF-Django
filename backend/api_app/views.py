from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework import views
from rest_framework.permissions import IsAuthenticated, BasePermission, AllowAny 
from rest_framework_simplejwt.authentication import JWTAuthentication 
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, login, logout
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import AccessToken


class Home(APIView):
    def post(self, request): 
        decoded_token = AccessToken(request.data['access'])
        user_id = str(decoded_token['user_id'])
        user = User.objects.get(id=user_id) 
        if user.is_active:
            return Response({'message': 'OK!'}) 
        return Response({}, status=status.HTTP_403_FORBIDDEN) 
    

class UserSetView(APIView):
    def post(self, request): 
        decoded_token = AccessToken(request.data['access'])
        user_id = decoded_token['user_id']
        user = User.objects.get(id=user_id) 

        users_obj = User.objects.all().filter(is_superuser=False)
        user_set = UserSerializer(users_obj, many=True)

        if user.is_superuser:
            response_data = {
                'users': user_set.data
            }
            return Response(response_data) 
        return Response({}, status=status.HTTP_403_FORBIDDEN)
    

class DeleteUserview(APIView): 
    def post(self, request): 
        decoded_token = AccessToken(request.data['access'])
        delete_id = request.data['delete_id']
        user_id = decoded_token['user_id']
        user = User.objects.get(id=user_id) 

        if user.is_superuser: 
            User.objects.filter(id=delete_id).delete() 
            return Response({'action': 'deleted'}) 
        return Response({}, status=status.HTTP_403_FORBIDDEN)
    

class EditUserview(APIView): 
    def post(self, request): 
        decoded_token = AccessToken(request.data['access'])
        edit_user_dict = request.data['user']
        user_id = decoded_token['user_id']
        user = User.objects.get(id=user_id) 

        if user.is_superuser: 
            edit_user = User.objects.get(id=edit_user_dict['id']) 
            edit_user.username = edit_user_dict.get('username')
            edit_user.email = edit_user_dict.get('email')
            edit_user.save()
            return Response({'action': 'edited'}) 
        return Response({}, status=status.HTTP_403_FORBIDDEN)
        

class LoginUser(APIView): 
    def post(self, request): 
        print(request.data)
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



