# MUAMUVA Phase 2 — Django Authentication

Includes signup (first name, last name, email OR phone, password + confirmation), login, logout, hashed passwords, protected dashboard and Django admin.

## Run on Windows
```powershell
py -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py makemigrations accounts
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```
Open http://127.0.0.1:8000/

## Deploy
GitHub Pages cannot run Django. Upload this source to GitHub and deploy it on a Python/Django-capable host. Configure `DJANGO_SECRET_KEY`, `DJANGO_DEBUG=False`, `DJANGO_ALLOWED_HOSTS` and `DJANGO_CSRF_TRUSTED_ORIGINS`. Run `python manage.py migrate` and `python manage.py collectstatic --noinput`. WSGI: `muamuva_project.wsgi:application`.

SQLite is for local development. Use PostgreSQL for production. Phone numbers are not OTP-verified in this phase. This is authentication only; real-time messaging/WebSockets are Phase 3/4. Never commit secrets or real user data.
