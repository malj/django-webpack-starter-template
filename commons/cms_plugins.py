from django.utils.translation import ugettext_lazy as _

from cms.plugin_base import CMSPluginBase
from cms.plugin_pool import plugin_pool

from commons.models import WidgetPlugin
from commons.settings import CMS_PLUGIN_MODULE


@plugin_pool.register_plugin
class CMSHeaderPlugin(CMSPluginBase):
    model = WidgetPlugin
    module = CMS_PLUGIN_MODULE
    name = _("Header (title, subtitle, content, image)")
    render_template = 'commons/cms/widget/header.html'
    fields = ['title', 'subtitle', 'content', 'image',]
    cache = False


@plugin_pool.register_plugin
class CMSHeaderPagePlugin(CMSPluginBase):
    model = WidgetPlugin
    module = CMS_PLUGIN_MODULE
    name = _("Header page (title, subtitle, image)")
    render_template = 'commons/cms/widget/header_page.html'
    fields = ['title', 'subtitle', 'image',]
    cache = False


@plugin_pool.register_plugin
class CMSHtmlEditorPlugin(CMSPluginBase):
    model = WidgetPlugin
    module = CMS_PLUGIN_MODULE
    name = _("Html Content")
    render_template = 'commons/cms/widget/content_html.html'
    fields = ['content_html',]
    cache = False


@plugin_pool.register_plugin
class CMSImagePlugin(CMSPluginBase):
    model = WidgetPlugin
    module = CMS_PLUGIN_MODULE
    name = _("Image")
    render_template = 'commons/cms/widget/image.html'
    fields = ['title', 'image',]
    cache = False


@plugin_pool.register_plugin
class CMSBgImagePlugin(CMSPluginBase):
    model = WidgetPlugin
    module = CMS_PLUGIN_MODULE
    name = _("Background image")
    render_template = 'commons/cms/widget/bg_image.html'
    fields = ['image',]
    cache = False


@plugin_pool.register_plugin
class CMSSloganPlugin(CMSPluginBase):
    model = WidgetPlugin
    module = CMS_PLUGIN_MODULE
    name = _("Slogan")
    render_template = 'commons/cms/widget/slogan.html'
    fields = ['title', 'subtitle']
    cache = False


@plugin_pool.register_plugin
class CMSSloganBgImagePlugin(CMSPluginBase):
    model = WidgetPlugin
    module = CMS_PLUGIN_MODULE
    name = _("Slogan with image")
    render_template = 'commons/cms/widget/slogan_bg_image.html'
    fields = ['title', 'subtitle', 'image',]
    cache = False


@plugin_pool.register_plugin
class CMSSloganTextBgImagePlugin(CMSPluginBase):
    model = WidgetPlugin
    module = CMS_PLUGIN_MODULE
    name = _("Slogan with text and image")
    render_template = 'commons/cms/widget/slogan_text_image.html'
    fields = ['title', 'subtitle', 'content', 'image',]
    cache = False


@plugin_pool.register_plugin
class CMSSloganTextImageIconPlugin(CMSPluginBase):
    model = WidgetPlugin
    module = CMS_PLUGIN_MODULE
    name = _("Slogan with text, image and icon")
    render_template = 'commons/cms/widget/slogan_text_image_icon.html'
    fields = ['title', 'subtitle', 'content', 'icon', 'image',]
    cache = False


@plugin_pool.register_plugin
class CMSTextPlugin(CMSPluginBase):
    model = WidgetPlugin
    module = CMS_PLUGIN_MODULE
    name = _("Text")
    render_template = 'commons/cms/widget/text.html'
    fields = ['content',]
    cache = False


@plugin_pool.register_plugin
class CMSTextTitleImagePlugin(CMSPluginBase):
    model = WidgetPlugin
    module = CMS_PLUGIN_MODULE
    name = _("Text title image")
    render_template = 'commons/cms/widget/text_image.html'
    fields = ['title', 'subtitle', 'content', 'image', 'alignment',]
    cache = False

@plugin_pool.register_plugin
class CMSTitleSubtitleContentPlugin(CMSPluginBase):
    model = WidgetPlugin
    module = CMS_PLUGIN_MODULE
    name = _("Customer")
    render_template = 'commons/cms/widget/title_subtitle_content.html'
    fields = ['title', 'subtitle', 'content',]
    cache = False
