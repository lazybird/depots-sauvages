"""Views for signalements app."""

from rest_framework import viewsets

from backend.signalements.models import Signalement
from backend.signalements.serializers import SignalementSerializer


class SignalementViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Signalement model.
    """

    queryset = Signalement.objects.all()
    serializer_class = SignalementSerializer
