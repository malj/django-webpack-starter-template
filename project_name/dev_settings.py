"""
Shared development settings for {{ project_name }} project.

1. Create a local settings module in this folder:  local_settings.py
2. Include this module at the top:  from .dev_settings import *
"""
from .settings import *


DEBUG = True

INSTALLED_APPS += [
    'debug_toolbar',
]


# Django debug toolbar
# https://django-debug-toolbar.readthedocs.io/en/stable/installation.html

MIDDLEWARE = [
    'debug_toolbar.middleware.DebugToolbarMiddleware',
] + MIDDLEWARE

INTERNAL_IPS = [
    '127.0.0.1',
]


# Cache
# https://docs.djangoproject.com/en/1.11/topics/cache/#dummy-caching-for-development

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.dummy.DummyCache',
    }
}

# Mail
# https://docs.djangoproject.com/en/1.11/topics/email/#console-backend

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
