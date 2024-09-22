from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, LoginView ,EventViewSet
from .views import  EventSearchByDate



router=DefaultRouter()
router.register(r'events',EventViewSet)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('events/date/', EventSearchByDate.as_view(), name='event-search-by-date'),
    path('login/', LoginView.as_view(), name='login'),
    path('',include(router.urls))
]
