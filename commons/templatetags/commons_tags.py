from django import template
from django.core.files.images import get_image_dimensions
from django.core.paginator import Page
from easy_thumbnails.files import get_thumbnailer
from django.utils.safestring import mark_safe

register = template.Library()


def get_protocol(request):
    return "https://" if request.is_secure() else "http://"


@register.filter
def get_host_url(request):
    protocol = get_protocol(request)
    domain = request.get_host()
    return protocol + domain


@register.filter
def add(value, arg):
    return value + arg


@register.filter
def subtract(value, arg):
    return value - arg


@register.filter
def get_item(dictionary, key):
    return dictionary.get(key)


@register.filter
def get_image_size(image, thumbnail_alias=None):
    """
    Get image size filter receives a image object and an optional thumbnail_alias argument.
     If thumbnail_alias is provided, this method returns image dimensions of generated thumbnail.
     Else returns image dimensions of original image object.
    :param image: Original Image object
    :param thumbnail_alias: optional alias for thumbnail generation
    :return: dict - {'height': height, 'width': width}
    """

    if thumbnail_alias:
        width, height = get_image_dimensions(
            get_thumbnailer(image)[thumbnail_alias])
    else:
        width, height = get_image_dimensions(image)

    return {'height': height, 'width': width}


@register.filter
def get_ratio(image, thumbnail_alias=None):

    if thumbnail_alias:
        width, height = get_image_dimensions(
            get_thumbnailer(image)[thumbnail_alias])
    else:
        width, height = get_image_dimensions(image)

    ratio = height / width

    return int(ratio * 100) if ratio else 100


@register.filter
def nbsp(s):
    return mark_safe("&nbsp;".join(s.split(' ')))
