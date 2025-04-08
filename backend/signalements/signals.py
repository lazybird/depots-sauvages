import io
import logging
from pathlib import Path

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.forms.models import model_to_dict
from django.utils import timezone

from backend.doc_maker import settings as doc_maker_settings
from backend.doc_maker.odt import ODTProcessor
from backend.signalements.models import Signalement

logger = logging.getLogger(__name__)


@receiver(post_save, sender=Signalement)
def generate_document(sender, instance, created, **kwargs):
    """
    Generate document when generate_doc flag is True
    """
    if instance.generate_doc:
        try:
            # Get all model fields as a dictionary
            context = model_to_dict(instance)
            logger.info(f"Generating document for signalement {instance.id}")
            # Generate document
            processor = ODTProcessor()
            output_path = processor.process_template(
                "template.odt",
                context,
                f"signalement_{instance.id}.odt",
            )
            # Store in DB
            with open(output_path, "rb") as f:
                document_data = f.read()
                # Prevent infinite loop
                post_save.disconnect(generate_document, sender=Signalement)
                try:
                    instance.document = document_data
                    instance.document_generated_at = timezone.now()
                    instance.save()
                    logger.info("Document saved for signalement " f"{instance.id}")
                finally:
                    post_save.connect(generate_document, sender=Signalement)
        except Exception as e:
            logger.error(f"Error generating document: {e}", exc_info=True)
