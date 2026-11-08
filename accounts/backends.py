from django.contrib.auth.backends import ModelBackend
from .models import User
class IdentifierBackend(ModelBackend):
 def authenticate(self,request,username=None,password=None,**kwargs):
  ident=(username or kwargs.get("identifier") or "").strip()
  if not ident or password is None: return None
  if "@" in ident: ident=ident.lower()
  try: user=User.objects.get(identifier__iexact=ident)
  except User.DoesNotExist:
   User().set_password(password); return None
  return user if user.check_password(password) and self.user_can_authenticate(user) else None
