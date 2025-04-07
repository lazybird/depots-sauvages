import environ

from backend.settings.base import *  # noqa

env = environ.Env()


ENV_NAME = env("ENV_NAME")

DJANGO_SETTINGS_MODULE = env("DJANGO_SETTINGS_MODULE", default="backend.settings.prod")


SECRET_KEY = env("SECRET_KEY")

DEBUG = env.bool("DEBUG", default=False)

# Security settings for production
ALLOWED_HOSTS = env.list("ALLOWED_HOSTS", default=[])

DATABASES = {
    "default": env.db("DATABASE_URL", default=f"file:///{PROJECT_ROOT / 'db.sqlite3'}"),
}

# CORS/CSRF Settings
CORS_ALLOWED_ORIGINS = env.list("CORS_ALLOWED_ORIGINS", default=[])
CORS_ALLOW_CREDENTIALS = True
CSRF_TRUSTED_ORIGINS = env.list("CSRF_TRUSTED_ORIGINS", default=[])

# Cookie Settings
CSRF_COOKIE_SAMESITE = "Lax"
CSRF_COOKIE_HTTPONLY = False  # Needed to access the token in JavaScript
SESSION_COOKIE_SAMESITE = "Lax"
