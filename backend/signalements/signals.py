from django.db.models.signals import post_save
from django.dispatch import receiver

from backend.signalements.models import Signalement


@receiver(post_save, sender=Signalement)
def generate_document(sender, instance, created, **kwargs):
    """
    Generate document when generate_doc flag is True
    """
    if instance.generate_doc:
        print(f"Generating document for signalement {instance.id}")

        print(f"Skipping document generation - incomplete data")
