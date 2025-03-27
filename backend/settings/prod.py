import environ

from backend.settings.base import *  # noqa

env = environ.Env()


ENV_NAME = env("ENV_NAME")

SECRET_KEY = env("SECRET_KEY")

ALLOWED_HOSTS = env.list("ALLOWED_HOSTS")


DATABASES = {
    "default": env.db("DATABASE_URL", default=f"file:///{PROJECT_ROOT / 'db.sqlite3'}"),
}
