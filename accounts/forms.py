import re
from django import forms
from django.contrib.auth import authenticate,password_validation
from django.core.exceptions import ValidationError
from .models import User
def normalize_identifier(value):
 value=value.strip()
 if "@" in value:
  from django.core.validators import validate_email
  validate_email(value); return value.lower()
 compact=re.sub(r"[\s().-]","",value)
 if not re.fullmatch(r"\+?\d{7,15}",compact): raise ValidationError("Enter a valid email or phone number with country code.")
 return compact
class SignUpForm(forms.Form):
 first_name=forms.CharField(max_length=150)
 last_name=forms.CharField(max_length=150)
 identifier=forms.CharField(max_length=254,label="Email address or phone number")
 password1=forms.CharField(widget=forms.PasswordInput,strip=False)
 password2=forms.CharField(widget=forms.PasswordInput,strip=False)
 def clean_identifier(self):
  ident=normalize_identifier(self.cleaned_data["identifier"])
  if User.objects.filter(identifier__iexact=ident).exists(): raise ValidationError("This email or phone is already registered.")
  return ident
 def clean(self):
  c=super().clean()
  if c.get("password1") and c.get("password2") and c["password1"]!=c["password2"]: self.add_error("password2","Passwords do not match.")
  if c.get("password1"):
   try: password_validation.validate_password(c["password1"],User(first_name=c.get("first_name",""),last_name=c.get("last_name",""),identifier=c.get("identifier","")))
   except ValidationError as e: self.add_error("password1",e)
  return c
 def save(self):
  return User.objects.create_user(self.cleaned_data["identifier"],self.cleaned_data["first_name"],self.cleaned_data["last_name"],self.cleaned_data["password1"])
class LoginForm(forms.Form):
 identifier=forms.CharField(max_length=254,label="Email address or phone number")
 password=forms.CharField(widget=forms.PasswordInput,strip=False)
 def __init__(self,request=None,*a,**kw): self.request=request; self.user=None; super().__init__(*a,**kw)
 def clean(self):
  c=super().clean()
  if c.get("identifier") and c.get("password"):
   try: ident=normalize_identifier(c["identifier"])
   except ValidationError: raise ValidationError("Enter a valid email/phone and password.")
   self.user=authenticate(self.request,username=ident,password=c["password"])
   if self.user is None: raise ValidationError("Email/phone or password is incorrect.")
  return c
 def get_user(self): return self.user
