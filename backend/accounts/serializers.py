
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    re_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id','username','full_name','email','password','re_password','dob','profile_pic')

    def validate(self, data):
        if data['password'] != data.pop('re_password'):
            raise serializers.ValidationError("Passwords do not match")
        validate_password(data['password'])
        return data

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        if not user.username:
            if user.email:
                user.username = user.email.split('@')[0]
        user.set_password(password)
        user.save()
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','full_name','email','dob','profile_pic')
        read_only_fields = ('email','username')
