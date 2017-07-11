from .base import *

DEBUG = False

ALLOWED_HOSTS = []

INSTALLED_APPS += [
    'rosetta',
]


# Translations
# http://django-rosetta.readthedocs.io/en/latest/settings.html#settings

LOCALE_PATHS = [
    (os.path.join(BASE_DIR, 'locale')),
]

ROSETTA_STORAGE_CLASS = 'rosetta.storage.CacheRosettaStorage'

ROSETTA_UWSGI_AUTO_RELOAD = True

ROSETTA_SHOW_AT_ADMIN_PANEL = True


# Cache
# https://docs.djangoproject.com/en/1.11/ref/settings/#caches

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
        'LOCATION': '127.0.0.1:11211',
        'KEY_PREFIX': '{{ project_name }}',
    }
}


# Google Tag Manager
# https://github.com/Lacrymology/django-google-tag-manager

GOOGLE_TAG_ID = None


# Local settings

try:
    from .local import *
except ImportError:
    pass
