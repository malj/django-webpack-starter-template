from commons.models import Settings
from commons.settings import CMS_ALIGNEMENT_LEFT, CMS_ALIGNEMENT_RIGHT


def commons_data(request):
    app_data = Settings.objects.all().first()
    if app_data:
        return {
            'app_data': app_data,
            'CMS_ALIGNEMENT_LEFT': CMS_ALIGNEMENT_LEFT,
            'CMS_ALIGNEMENT_RIGHT': CMS_ALIGNEMENT_RIGHT,
        }
    else:
        return {
            'CMS_ALIGNEMENT_LEFT': CMS_ALIGNEMENT_LEFT,
            'CMS_ALIGNEMENT_RIGHT': CMS_ALIGNEMENT_RIGHT,
        }
