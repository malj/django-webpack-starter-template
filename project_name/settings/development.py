from .base import *

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
# https://docs.djangoproject.com/en/1.10/topics/cache/#dummy-caching-for-development

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.dummy.DummyCache',
    }
}


# Local settings

try:
    from .local import *
except ImportError:
    pass
