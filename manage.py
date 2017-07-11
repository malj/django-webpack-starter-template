#!/usr/bin/env python
import os
from argparse import ArgumentParser, REMAINDER

if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument(
        '-p', '--production',
        action='store_true',
        help='use production settings'
    )
    parser.add_argument(
        'subcommand',
        nargs=REMAINDER,
        help='pass subcommand to %s' % __file__
    )
    env = parser.parse_args()

    if env.production:
        settings_module = '{{ project_name }}.settings.production'
    else:
        settings_module = '{{ project_name }}.settings.development'

    os.environ.setdefault('DJANGO_SETTINGS_MODULE', settings_module)

    try:
        from django.core.management import execute_from_command_line
    except ImportError:
        # The above import may fail for some other reason. Ensure that the
        # issue is really that Django is missing to avoid masking other
        # exceptions on Python 2.
        try:
            import django
        except ImportError:
            raise ImportError(
                "Couldn't import Django. Are you sure it's installed and "
                "available on your PYTHONPATH environment variable? Did you "
                "forget to activate a virtual environment?"
            )
        raise
    execute_from_command_line([__file__, *env.subcommand])
