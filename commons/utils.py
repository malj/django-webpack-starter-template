from django.utils.translation import ugettext_lazy as _


def duplicate_records(modeladmin, request, queryset):
    for obj in queryset:
        obj.pk = None
        obj.save()


duplicate_records.short_description = _("Duplicate records")
