# Generated by Django 5.2 on 2025-04-06 16:49

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Signalement",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
                    ),
                ),
                ("commune", models.CharField(max_length=255, verbose_name="commune")),
                (
                    "localisation_depot",
                    models.CharField(blank=True, max_length=255, verbose_name="localisation"),
                ),
                ("date_constat", models.DateField(verbose_name="date")),
                ("heure_constat", models.TimeField(verbose_name="heure")),
                (
                    "auteur_signalement",
                    models.CharField(blank=True, max_length=255, verbose_name="auteur"),
                ),
                (
                    "nature_terrain",
                    models.CharField(blank=True, max_length=255, verbose_name="terrain"),
                ),
                (
                    "volume_depot",
                    models.CharField(blank=True, max_length=255, verbose_name="volume"),
                ),
                (
                    "types_depot",
                    models.JSONField(blank=True, default=list, null=True, verbose_name="types"),
                ),
                ("precisions_depot", models.TextField(blank=True, verbose_name="précisions")),
                ("photo_dispo", models.BooleanField(default=False, verbose_name="photos")),
                ("auteur_identifie", models.BooleanField(default=False, verbose_name="identifié")),
                (
                    "souhaite_porter_plainte",
                    models.BooleanField(default=False, verbose_name="plainte"),
                ),
                (
                    "indices_disponibles",
                    models.JSONField(blank=True, default=list, null=True, verbose_name="indices"),
                ),
                (
                    "precisions_indices",
                    models.TextField(blank=True, verbose_name="précisions indices"),
                ),
                (
                    "arrete_municipal_existe",
                    models.BooleanField(default=False, verbose_name="arrêté"),
                ),
                (
                    "prejudice_montant_connu",
                    models.BooleanField(default=False, verbose_name="montant connu"),
                ),
                (
                    "prejudice_montant",
                    models.IntegerField(blank=True, null=True, verbose_name="montant"),
                ),
                (
                    "prejudice_nombre_personnes",
                    models.IntegerField(blank=True, null=True, verbose_name="personnes"),
                ),
                (
                    "prejudice_nombre_heures",
                    models.IntegerField(blank=True, null=True, verbose_name="heures"),
                ),
                (
                    "prejudice_nombre_vehicules",
                    models.IntegerField(blank=True, null=True, verbose_name="véhicules"),
                ),
                (
                    "prejudice_kilometrage",
                    models.IntegerField(blank=True, null=True, verbose_name="kilométrage"),
                ),
                (
                    "prejudice_autres_couts",
                    models.IntegerField(blank=True, null=True, verbose_name="autres coûts"),
                ),
            ],
            options={
                "verbose_name": "signalement",
                "verbose_name_plural": "signalements",
            },
        ),
    ]
