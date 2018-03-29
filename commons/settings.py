from django.utils.translation import ugettext_lazy as _


############### CONFIGURATION ##################

APP_NAME = _('Commons')
APP_NAMESPACE = 'commons'

CMS_PLUGIN_MODULE = _("Commons")


CMS_ALIGNEMENT_LEFT = '1'
CMS_ALIGNEMENT_LEFT_LABEL = _("Text left, image right")
CMS_ALIGNEMENT_RIGHT = '2'
CMS_ALIGNEMENT_RIGHT_LABEL = _("Text right, image left")


cms_plugin_text_image_alignement = (
    (CMS_ALIGNEMENT_LEFT, CMS_ALIGNEMENT_LEFT_LABEL),
    (CMS_ALIGNEMENT_RIGHT, CMS_ALIGNEMENT_RIGHT_LABEL),
)

#################### URLS ######################

GENERIC_FULL_URL = APP_NAMESPACE + ':'
