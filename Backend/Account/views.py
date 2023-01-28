from rest_framework import response,status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.generics import CreateAPIView,GenericAPIView
from django.contrib.auth import get_user_model
from .serializer import UserRegisterSerializer



UserModel = get_user_model()

class RegisterUser(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserRegisterSerializer

    def create(self, request, *args, **kwargs):
        super().create(request, *args, **kwargs)
        return response.Response(status=status.HTTP_201_CREATED)


class DeleteUserToken(GenericAPIView):
    def delete(self, request, *args, **kwargs):
        Token.objects.get(user_id=request.user.id).delete()
        return response.Response(status=status.HTTP_204_NO_CONTENT)
    
