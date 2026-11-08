from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User
@admin.register(User)
class MuamuvaUserAdmin(UserAdmin):
 ordering=("identifier",); list_display=("identifier","first_name","last_name","is_staff","is_active"); search_fields=("identifier","first_name","last_name")
 fieldsets=((None,{"fields":("identifier","password")}),("Personal info",{"fields":("first_name","last_name")}),("Permissions",{"fields":("is_active","is_staff","is_superuser","groups","user_permissions")}),("Dates",{"fields":("last_login","date_joined")}))
 add_fieldsets=((None,{"classes":("wide",),"fields":("identifier","first_name","last_name","password1","password2","is_staff","is_superuser")}),)
 filter_horizontal=("groups","user_permissions")
