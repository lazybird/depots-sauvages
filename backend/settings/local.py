import environ

from backend.settings.base import *  # noqa

env = environ.Env()
environ.Env.read_env(PROJECT_ROOT / ".env")

ENV_NAME = "dev"

SECRET_KEY = env.str("SECRET_KEY", default="ignore-this-BLKAeaEaZ3KS2RDYPHAcciBBSyRGDR8=")

INSTALLED_APPS = ["whitenoise.runserver_nostatic"] + INSTALLED_APPS

DEBUG = True

# Database
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": PROJECT_ROOT / "db.sqlite3",
    }
}

ALLOWED_HOSTS = ["*"]
