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
from django.core.validators import EmailValidator 
from django.contrib.auth.password_validation import CommonPasswordValidator
from .models import Profile


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
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user is None: 
            raise AuthenticationFailed('invalid credentials') 
        
        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token
        user_obj = User.objects.get(id=user.id)
        user_data = UserSerializer(user_obj) 

        profile_image_url = ''
        try: 
            profile_image_url = user_obj.profile.profile_image.url
        except: 
            pass
        
        response_data = {
            'refresh_token': str(refresh), 
            'access_token': str(access_token), 
            'user': user_data.data,
            'profile_image_url': profile_image_url
        }
        return Response(response_data)


class SignUpUser(APIView): 
    def post(self, request): 
        username = request.data.get('username')
        email = request.data.get('email')
        pass1 = request.data.get('pass1')
        pass2 = request.data.get('pass2')

        if not pass1 == pass2: 
            raise AuthenticationFailed('passwords do not match!') 
        
        if User.objects.filter(username=username): 
            raise AuthenticationFailed('username already exists') 
        
        if User.objects.filter(email=email):
            raise AuthenticationFailed('email already exists') 
        
        if len(username.strip()) < 4:  
            raise AuthenticationFailed('username is short')
        
        if str(username).isdigit(): 
            raise AuthenticationFailed('invalid username') 
        
        try: 
            EmailValidator()(email)
        except: 
            raise AuthenticationFailed('Enter a valid Email') 
        
        if len(pass1.strip()) < 5: 
            raise AuthenticationFailed('short password') 
        
        User.objects.create_user(username=username, email=email, password=pass1)
        
        return Response({'message': 'user Created'})


class AddUserView(APIView): 
    def post(self, request): 
        username = request.data.get('userData').get('username')
        email = request.data.get('userData').get('email')
        pass1 = request.data.get('userData').get('pass1')
        pass2 = request.data.get('userData').get('pass2')
        decoded_token = AccessToken(request.data.get('access'))
        user_id = decoded_token.get('user_id') 
        user_obj = User.objects.get(id=user_id)

        if not pass1 == pass2: 
            raise AuthenticationFailed('passwords do not match!') 
        
        if User.objects.filter(username=username): 
            raise AuthenticationFailed('username already exists') 
        
        if User.objects.filter(email=email):
            raise AuthenticationFailed('email already exists') 
        
        if len(username.strip()) < 4:  
            raise AuthenticationFailed('username is short')
        
        if str(username).isdigit(): 
            raise AuthenticationFailed('invalid username') 
        
        try: 
            EmailValidator()(email)
        except: 
            raise AuthenticationFailed('Enter a valid Email') 
        
        if len(pass1.strip()) < 5: 
            raise AuthenticationFailed('short password') 
        
        created_user_id = ''
        if user_obj.is_superuser:
            user = User.objects.create_user(username=username, email=email, password=pass1)
            created_user_id = user.id
        else: 
            return Response({}, status=status.HTTP_403_FORBIDDEN) 
        
        
        return Response({'created_id': created_user_id})


class UploadProfileImage(APIView): 
    def post(self, request): 
        decoded_token = AccessToken(request.data.get('access'))
        user_id = decoded_token.get('user_id')
        user = None
        try: 
            user = User.objects.get(id=user_id)
        except: 
            pass 
        image_file = request.FILES['image']
        try: 
            profile = user.profile
            profile.profile_image = image_file
            profile.save()
        except: 
            profile = Profile.objects.create(user=user, profile_image=image_file)
            
        return Response({'new_image_url': user.profile.profile_image.url})