import logging
from pathlib import Path

from django.db.models.signals import post_save
from django.dispatch import receiver
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
    if instance.generate_doc and not instance.document:
        try:
            # Log paths to debug
            template_path = Path(doc_maker_settings.TEMPLATE_DIR) / "template.odt"
            logger.info(f"Looking for template at: {template_path}")
            if not template_path.exists():
                raise FileNotFoundError(f"Template not found at {template_path}")

            # Create simple context
            context = {"commune": instance.commune}
            logger.info(f"Generating document with context: {context}")

            # Generate document
            processor = ODTProcessor()
            output_path = processor.process_template(
                "template.odt",
                context,
                f"signalement_{instance.id}.odt",
            )
            logger.info(f"Document generated at: {output_path}")

            # Read generated file and store in DB
            with open(output_path, "rb") as f:
                instance.document = f.read()
                instance.document_generated_at = timezone.now()
                # Prevent infinite loop by turning off signal
                post_save.disconnect(generate_document, sender=Signalement)
                try:
                    instance.save()
                finally:
                    # Ensure signal is reconnected even if save fails
                    post_save.connect(generate_document, sender=Signalement)

        except Exception as e:
            logger.error(f"Document generation failed: {str(e)}", exc_info=True)
