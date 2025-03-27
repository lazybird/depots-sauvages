#!/usr/bin/env python
from os import environ
from pathlib import Path
from sys import argv as sys_argv
from sys import path as sys_path


def main():
    environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings.local")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc

    # Django apps live in a subfolder that needs to be added to sys.path
    backend_dir = Path.cwd().joinpath("backend")
    sys_path.append(str(backend_dir))

    execute_from_command_line(sys_argv)


if __name__ == "__main__":
    main()
