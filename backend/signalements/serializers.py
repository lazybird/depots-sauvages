"""Serializers for signalements app."""

from rest_framework import serializers

from backend.signalements.models import Signalement


class SignalementSerializer(serializers.ModelSerializer):
    """Serializer for Signalement model."""

    class Meta:
        model = Signalement
        fields = [
            "id",
            "commune",
            "localisation_depot",
            "date_constat",
            "heure_constat",
            "auteur_signalement",
            "nature_terrain",
            "volume_depot",
            "types_depot",
            "precisions_depot",
            "photo_dispo",
            "auteur_identifie",
            "souhaite_porter_plainte",
            "indices_disponibles",
            "precisions_indices",
            "arrete_municipal_existe",
            "prejudice_montant_connu",
            "prejudice_montant",
            "prejudice_nombre_personnes",
            "prejudice_nombre_heures",
            "prejudice_nombre_vehicules",
            "prejudice_kilometrage",
            "prejudice_autres_couts",
        ]
