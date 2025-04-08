import io

from django.http import FileResponse, Http404
from django.views.generic import View
from rest_framework import viewsets

from backend.signalements.models import Signalement
from backend.signalements.serializers import SignalementSerializer


class SignalementViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Signalement model.
    """

    queryset = Signalement.objects.all()
    serializer_class = SignalementSerializer


class SignalementDocumentDownloadView(View):
    """
    Custom view to download the generated document for a signalement.
    """

    def get_object(self, pk):
        """Get the signalement object."""
        try:
            obj = Signalement.objects.get(pk=pk)
            if not obj.document:
                raise Http404("Document not found or not yet generated")
            return obj
        except Signalement.DoesNotExist:
            raise Http404("Signalement not found")

    def get(self, request, pk):
        """Handle GET request to download the document."""
        obj = self.get_object(pk)

        # Convert bytes to a file-like object
        document_file = io.BytesIO(obj.document)

        # Create a filename
        filename = f"signalement-{obj.id}-{obj.commune}.odt"

        response = FileResponse(
            document_file,
            content_type="application/vnd.oasis.opendocument.text",
            as_attachment=True,
            filename=filename,
        )

        return response
