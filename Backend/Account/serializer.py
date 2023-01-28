from rest_framework import serializers
from django.contrib.auth import get_user_model


UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = UserModel
        fields = ['username', 'password', 'password2']
        validators = []

    def validate_username(self,value):
        existing_result = UserModel.objects.only('username').filter(username=value)
        if existing_result.exists():
            raise serializers.ValidationError(
                {"error": "This username has been taken !"},400)
        if value.count(' ') >=1:
            raise serializers.ValidationError(
                {"error": "Username cannot contain spaces"})
        return value



    def validate(self, attrs):
        password = attrs['password']
        password2 = attrs['password2']

        if password != password2:
            raise serializers.ValidationError(
                {"error": "Password fields didn't match."})
        elif len(password) < 9:
            raise serializers.ValidationError(
                {"error": "Password must be at least 8 characters."})
                
        return attrs

    def create(self, validated_data):
        user = UserModel.objects.create(username=validated_data['username'])
        user.set_password(validated_data['password'])
        user.save()
        return user
