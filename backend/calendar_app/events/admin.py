from django.contrib import admin
# Register your models here.
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser ,Event

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['email', 'username', 'is_staff', 'is_active']
    list_filter = ['email', 'username', 'is_staff', 'is_active']
    ordering = ['email']

admin.site.register(CustomUser, CustomUserAdmin)


class EventAdmin(admin.ModelAdmin):
    list_display = ('title','date','description', 'start_time', 'end_time', 'user')
    search_fields = ('title', 'description')
    list_filter = ('start_time', 'end_time', 'user')

admin.site.register(Event, EventAdmin)




