import sys
from os import environ
from pathlib import Path
from sys import path as sys_path

from django.core.wsgi import get_wsgi_application

# Django apps live in a subfolder that needs to be added to sys.path
ROOT_DIR = Path(__file__).resolve(strict=True).parent.parent
sys.path.append(str(ROOT_DIR / "backend"))

# Django apps live in a subfolder that needs to be added to sys.path
backend_dir = Path.cwd().joinpath("backend")
sys_path.append(str(backend_dir))


# This will set production as default, but we must still set it with an
# ENV to ensure that the migrate command runs agains the correct DB
environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings.prod")

application = get_wsgi_application()
