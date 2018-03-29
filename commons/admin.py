from django.contrib import admin
from django.shortcuts import redirect
from django.urls import reverse

from commons.models import Settings


@admin.register(Settings)
class SettingsAdmin(admin.ModelAdmin):

    def has_add_permission(self, request):
        return not Settings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

    def changelist_view(self, request, extra_context=None):
        if Settings.objects.exists():
            settings = Settings.objects.first()
            url = reverse('admin:commons_settings_change', args=[settings.id])
            return redirect(url)
        else:
            return super().changelist_view(request, extra_context)
