from django.db import models


class Signalement(models.Model):
    """
    Model for waste deposit reports
    """

    commune_nom = models.CharField("commune", max_length=255)
    adresse_depot = models.CharField("adresse", max_length=255, blank=True)
    date_constat = models.DateField("date")
    heure_constat = models.TimeField("heure")
    auteur_signalement = models.CharField("auteur", max_length=255, blank=True)
    nature_terrain = models.CharField("terrain", max_length=255, blank=True)
    volume_dechets = models.CharField("volume", max_length=255, blank=True)
    types_dechets = models.JSONField("types", default=list, blank=True, null=True)
    precisions_dechets = models.TextField("précisions", blank=True)
    has_photos = models.BooleanField("photos", default=False)
    auteur_identifie = models.BooleanField("identifié", default=False)
    souhaite_porter_plainte = models.BooleanField("plainte", default=False)
    indices_disponibles = models.JSONField("indices", default=list, blank=True, null=True)

    class Meta:
        verbose_name = "signalement"
        verbose_name_plural = "signalements"

    def __str__(self):
        return f"Dépôt à {self.commune_nom} le {self.date_constat}"
