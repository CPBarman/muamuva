from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,BaseUserManager
from django.db import models
from django.utils import timezone
class UserManager(BaseUserManager):
 def create_user(self,identifier,first_name,last_name,password=None,**extra):
  if not identifier: raise ValueError("Email or phone is required")
  identifier=identifier.strip()
  if "@" in identifier: identifier=self.normalize_email(identifier).lower()
  u=self.model(identifier=identifier,first_name=first_name.strip(),last_name=last_name.strip(),**extra)
  u.set_password(password); u.save(using=self._db); return u
 def create_superuser(self,identifier,first_name="Admin",last_name="Muamuva",password=None,**extra):
  extra.setdefault("is_staff",True); extra.setdefault("is_superuser",True); extra.setdefault("is_active",True)
  return self.create_user(identifier,first_name,last_name,password,**extra)
class User(AbstractBaseUser,PermissionsMixin):
 identifier=models.CharField(max_length=254,unique=True)
 first_name=models.CharField(max_length=150); last_name=models.CharField(max_length=150)
 date_joined=models.DateTimeField(default=timezone.now)
 is_active=models.BooleanField(default=True); is_staff=models.BooleanField(default=False)
 objects=UserManager()
 USERNAME_FIELD="identifier"; REQUIRED_FIELDS=["first_name","last_name"]
 def __str__(self): return f"{self.first_name} {self.last_name} ({self.identifier})"
 @property
 def display_name(self): return f"{self.first_name} {self.last_name}".strip()
