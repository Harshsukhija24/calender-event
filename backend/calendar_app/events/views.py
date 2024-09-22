from django.contrib.auth import authenticate
from rest_framework import status, viewsets, generics 
from rest_framework.response import Response 
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserSerializer, EventSerializer
from rest_framework.views import APIView 
from django.utils import timezone
from rest_framework.authtoken.models import Token


from .models import Event

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"id": user.id, "username": user.username, "email": user.email}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "message": "Login successful",
                "token": token.key,
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email
                }
            }, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated  # Import IsAuthenticated
from .models import Event
from .serializers import EventSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [AllowAny]  # Require authentication

    def perform_create(self, serializer):
        # Save the event with the authenticated user
        serializer.save(user=self.request.user)

class EventSearchByDate(generics.ListAPIView):
    serializer_class = EventSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        date_str = self.request.query_params.get('date', None)

        if date_str:
            try:
                event_date = timezone.datetime.strptime(date_str, '%Y-%m-%d').date()
                # Return all events for the specified date
                queryset = Event.objects.filter(date=event_date)
            except ValueError:
                return Event.objects.none()  # Return empty queryset if date is invalid
        else:
            # Return all events if no date is provided
            queryset = Event.objects.all()

        return queryset
