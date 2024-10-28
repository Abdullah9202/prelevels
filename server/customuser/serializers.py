from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
# My Files
from .models import User, TopicalProgress, YearlyProgress

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'first_name', 'last_name', 'email', 'username', 
            'phone_number', 'taking_questionBanks', 'taking_courses', 'taking_bundles', 'daysStreak',
            'questionSolved', 'questionRemained', 'createdAt', 'updatedAt', 'last_login',
        ]


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'username', 'phone_number', 'password', 'password2']
        
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"message": "Password fields do not match."})
        return attrs
        
    def create(self, validated_data):
        user = User.objects.create(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            username=validated_data['username'],
            phone_number=validated_data['phone_number'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class TopicalProgressSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = TopicalProgress
        fields = ['id', 'user', 'progress']


class YearlyProgressSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = YearlyProgress
        fields = ['id', 'user', 'progress']
