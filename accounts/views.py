from django.contrib import messages
from django.contrib.auth import login,logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render,redirect
from django.views.decorators.http import require_POST
from .forms import SignUpForm,LoginForm
def home(request):
 return redirect("dashboard") if request.user.is_authenticated else render(request,"accounts/home.html")
def signup_view(request):
 if request.user.is_authenticated: return redirect("dashboard")
 form=SignUpForm(request.POST or None)
 if request.method=="POST" and form.is_valid():
  user=form.save(); login(request,user,backend="accounts.backends.IdentifierBackend")
  messages.success(request,"Your Muamuva account has been created."); return redirect("dashboard")
 return render(request,"accounts/auth.html",{"form":form,"mode":"signup"})
def login_view(request):
 if request.user.is_authenticated: return redirect("dashboard")
 form=LoginForm(request,request.POST or None)
 if request.method=="POST" and form.is_valid():
  login(request,form.get_user()); return redirect("dashboard")
 return render(request,"accounts/auth.html",{"form":form,"mode":"login"})
@login_required
def dashboard(request): return render(request,"accounts/dashboard.html")
@login_required
@require_POST
def logout_view(request):
 logout(request); return redirect("home")
