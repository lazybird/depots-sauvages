"""Serializers for signalements app."""

from rest_framework import serializers

from backend.signalements.models import Signalement


class SignalementSerializer(serializers.ModelSerializer):
    """Serializer for Signalement model."""

    class Meta:
        model = Signalement
        fields = [
            "id",
            "commune_nom",
            "date_constat",
            "heure_constat",
            "adresse_depot",
        ]
