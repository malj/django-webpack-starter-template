from django.apps import AppConfig

from commons.settings import APP_NAMESPACE, APP_NAME


class CommonsConfig(AppConfig):
    name = APP_NAMESPACE
    verbose_name = APP_NAME
