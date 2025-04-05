from django.contrib import admin

from .models import Signalement


@admin.register(Signalement)
class SignalementAdmin(admin.ModelAdmin):
    list_display = ["commune_nom", "date_constat", "volume_dechets"]
    list_filter = ["commune_nom", "date_constat", "nature_terrain"]
    search_fields = ["commune_nom", "adresse_depot"]
