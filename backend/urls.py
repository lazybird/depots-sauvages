from django.contrib import admin
from django.urls import path, re_path

from backend.home.views import index_view

urlpatterns = [
    path("admin/", admin.site.urls),
    re_path(r"^$", index_view, name="index"),
]
