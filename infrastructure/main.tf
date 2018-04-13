provider "vault" {
  address = "https://vault.reform.hmcts.net:6200"
}

locals {
  env_ase_url = "${var.env}.service.${data.terraform_remote_state.core_apps_compute.ase_name[0]}.internal"
}

module "case-management-web" {
  source   = "git@github.com:hmcts/moj-module-webapp?ref=master"
  product  = "${var.product}-case-management-web"
  location = "${var.location}"
  env      = "${var.env}"
  ilbIp    = "${var.ilbIp}"
  is_frontend  = true
  subscription = "${var.subscription}"
  additional_host_name = "${var.external_host_name}"

  app_settings = {
    IDAM_LOGIN_URL = "${var.idam_authentication_web_url}/login"
    CCD_GW_LOGOUT_URL = "${var.ccd_gateway_url}/logout"
    CCD_API_URL = "${var.ccd_gateway_url}/aggregated"
    CCD_DATA_URL = "${var.ccd_gateway_url}/data"
    CCD_ACTIVITY_URL = "" // Activity disabled until it's deployed on CNP
    CCD_GW_OAUTH2_URL = "${var.ccd_gateway_url}/oauth2"
    CCD_GW_OAUTH2_CLIENT_ID = "ccd_gateway"
    DM_URL = "${var.ccd_gateway_url}/documents"
    DM_URL_REMOTE = "${var.document_management_url}/documents"
    CCD_PAGE_SIZE = 25
    POSTCODE_LOOKUP_URL = "${var.ccd_gateway_url}/addresses?postcode=$${postcode}"
    PRINT_SERVICE_URL = "${var.ccd_gateway_url}/print"
    PRINT_SERVICE_URL_REMOTE = "${var.ccd_print_service_url}"
    WEBSITE_NODE_DEFAULT_VERSION = "8.9.4"
  }

  module "ccd-case-management-web-vault" {
    source              = "git@github.com:hmcts/moj-module-key-vault?ref=master"
    name                = "ccd-case-web-${var.env}" // Max 24 characters
    product             = "${var.product}"
    env                 = "${var.env}"
    tenant_id           = "${var.tenant_id}"
    object_id           = "${var.jenkins_AAD_objectId}"
    resource_group_name = "${module.case-management-web.resource_group_name}"
    product_group_object_id = "be8b3850-998a-4a66-8578-da268b8abd6b"
  }

}
