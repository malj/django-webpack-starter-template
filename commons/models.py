from django.utils.translation import ugettext_lazy as _
from django.db import models

from cms.models import CMSPlugin
from djangocms_text_ckeditor.fields import HTMLField
from filer.fields.image import FilerImageField

from commons.settings import cms_plugin_text_image_alignement, cms_plugin_icons


class WidgetPlugin(CMSPlugin):
    title = models.CharField(_("Title"), max_length=255, blank=True, null=True)
    subtitle = models.CharField(_("Subtitle"), max_length=255, blank=True, null=True)
    image = FilerImageField(verbose_name=_("Image"), blank=True, null=True)
    content = models.TextField(_("Content"), blank=True, null=True)
    content_html = HTMLField(_("Content"), blank=True, null=True)
    alignment = models.CharField(_("Alignement"), blank=True, null=True, choices=cms_plugin_text_image_alignement, max_length=255)

    created = models.DateTimeField(_("Created"), auto_now_add=True)
    updated = models.DateTimeField(_("Updated"), auto_now=True)

    def __str__(self):
        return "%s" % _("CMS Widget")

    class Meta:
        verbose_name = _("Widget plugin")
        verbose_name_plural = _("Widget plugins")


class Settings(models.Model):
    address = models.CharField(_('Address'), max_length=255, blank=True, null=True)
    phone = models.CharField(_('Phone'), max_length=255, blank=True, null=True)
    mobile = models.CharField(_('Mobile'), max_length=255, blank=True, null=True)
    email = models.EmailField(_('Email'), max_length=255, blank=True, null=True)
    share_image = FilerImageField(verbose_name=_("Share image"), blank=True, null=True)
    newsletter_active = models.BooleanField(_("Newsletter active"), default=False)

    def __str__(self):
        return '%s' % _('Settings')

    class Meta:
        verbose_name = _('Settings')
        verbose_name_plural = _('Settings')

