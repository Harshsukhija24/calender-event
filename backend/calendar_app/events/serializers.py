from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Event
  
User = get_user_model()
  
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'title', 'date', 'description', 'start_time', 'end_time', 'user']
        read_only_fields = ['user']
