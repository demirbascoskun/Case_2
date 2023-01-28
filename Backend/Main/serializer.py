from rest_framework.serializers import ModelSerializer
from .models import StoragePerUser

class StoragePerUserSerializer(ModelSerializer):
    class Meta:
        model = StoragePerUser
        fields = ["id",'file']