provider "vault" {
  address = "https://vault.reform.hmcts.net:6200"
}

locals {
  env_ase_url = "${var.env}.service.${data.terraform_remote_state.core_apps_compute.ase_name[0]}.internal"

  default_ccd_gateway_url = "https://ccd-api-gateway-web-${local.env_ase_url}"
  non_preview_ccd_gateway_url = "${var.ccd_gateway_url != "" ? var.ccd_gateway_url : local.default_ccd_gateway_url}"
  ccd_gateway_url = "${var.env == "preview" ? var.aat_gateway : local.non_preview_ccd_gateway_url}"

  default_ccd_print_service_url = "https://ccd-case-print-service-${local.env_ase_url}"
  ccd_print_service_url = "${var.ccd_print_service_url != "" ? var.ccd_print_service_url : local.default_ccd_print_service_url}"

  default_document_management_url = "^https?://(?:api-gateway\\.test\\.dm\\.reform\\.hmcts\\.net|dm-store-${var.env}\\.service\\.core-compute-${var.env}\\.internal(?::\\d+)?)"
  document_management_url = "${var.document_management_url != "" ? var.document_management_url : local.default_document_management_url}"

  // Vault name
  previewVaultName = "${var.product}-mgmt-web"
  nonPreviewVaultName = "ccd-case-web-${var.env}"
  vaultName = "${(var.env == "preview" || var.env == "spreview") ? local.previewVaultName : local.nonPreviewVaultName}"

  // Vault URI
  previewVaultUri = "https://ccd-case-web-aat.vault.azure.net/"
  nonPreviewVaultUri = "${module.ccd-case-management-web-vault.key_vault_uri}"
  vaultUri = "${(var.env == "preview" || var.env == "spreview") ? local.previewVaultUri : local.nonPreviewVaultUri}"

  is_frontend = "${var.external_host_name != "" ? "1" : "0"}"
  external_host_name = "${var.external_host_name != "" ? var.external_host_name : "null"}"
}

module "case-management-web" {
  source   = "git@github.com:hmcts/moj-module-webapp?ref=master"
  product  = "${var.product}-case-management-web"
  location = "${var.location}"
  env      = "${var.env}"
  ilbIp    = "${var.ilbIp}"
  subscription = "${var.subscription}"
  is_frontend = "${local.is_frontend}"
  additional_host_name = "${local.external_host_name}"

  app_settings = {
    IDAM_LOGIN_URL = "${var.idam_authentication_web_url}/login"
    CCD_GW_LOGOUT_URL = "${local.ccd_gateway_url}/logout"
    CCD_API_URL = "${local.ccd_gateway_url}/aggregated"
    CCD_DATA_URL = "${local.ccd_gateway_url}/data"
    CCD_ACTIVITY_URL = "" // Activity disabled until it's deployed on CNP
    CCD_GW_OAUTH2_URL = "${local.ccd_gateway_url}/oauth2"
    CCD_GW_OAUTH2_CLIENT_ID = "ccd_gateway"
    DM_URL = "${local.ccd_gateway_url}/documents"
    DM_URL_REMOTE = "${local.document_management_url}/documents"
    CCD_PAGE_SIZE = 25
    POSTCODE_LOOKUP_URL = "${local.ccd_gateway_url}/addresses?postcode=$${postcode}"
    PRINT_SERVICE_URL = "${local.ccd_gateway_url}/print"
    PRINT_SERVICE_URL_REMOTE = "${local.ccd_print_service_url}"
    WEBSITE_NODE_DEFAULT_VERSION = "8.9.4"
  }
}

module "ccd-case-management-web-vault" {
  source              = "git@github.com:hmcts/moj-module-key-vault?ref=master"
  name                = "${local.vaultName}" // Max 24 characters
  product             = "${var.product}"
  env                 = "${var.env}"
  tenant_id           = "${var.tenant_id}"
  object_id           = "${var.jenkins_AAD_objectId}"
  resource_group_name = "${module.case-management-web.resource_group_name}"
  product_group_object_id = "be8b3850-998a-4a66-8578-da268b8abd6b"
}
