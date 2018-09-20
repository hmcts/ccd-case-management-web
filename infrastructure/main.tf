locals {
  env_ase_url = "${var.env}.service.${data.terraform_remote_state.core_apps_compute.ase_name[0]}.internal"

  default_ccd_gateway_url = "https://ccd-api-gateway-web-${local.env_ase_url}"
  ccd_gateway_url = "${var.ccd_gateway_url != "" ? var.ccd_gateway_url : local.default_ccd_gateway_url}"

  default_ccd_print_service_url = "https://ccd-case-print-service-${local.env_ase_url}"
  ccd_print_service_url = "${var.ccd_print_service_url != "" ? var.ccd_print_service_url : local.default_ccd_print_service_url}"

  default_document_management_url = "^https?://(?:api-gateway\\.test\\.dm\\.reform\\.hmcts\\.net|dm-store-${var.env}\\.service\\.core-compute-${var.env}\\.internal(?::\\d+)?)"
  document_management_url = "${var.document_management_url != "" ? var.document_management_url : local.default_document_management_url}"

  // Vault name
  previewVaultName = "${var.raw_product}-aat"
  nonPreviewVaultName = "${var.raw_product}-${var.env}"
  vaultName = "${(var.env == "preview" || var.env == "spreview") ? local.previewVaultName : local.nonPreviewVaultName}"

  // Shared Resource Group
  previewResourceGroup = "${var.raw_product}-shared-aat"
  nonPreviewResourceGroup = "${var.raw_product}-shared-${var.env}"
  sharedResourceGroup = "${(var.env == "preview" || var.env == "spreview") ? local.previewResourceGroup : local.nonPreviewResourceGroup}"

  sharedAppServicePlan = "${var.raw_product}-${var.env}"

  is_frontend = "${var.external_host_name != "" ? "1" : "0"}"
  external_host_name = "${var.external_host_name != "" ? var.external_host_name : "null"}"

  ccd_activity_url = "${local.ccd_gateway_url}/activity"
}

data "azurerm_key_vault" "ccd_shared_key_vault" {
  name = "${local.vaultName}"
  resource_group_name = "${local.sharedResourceGroup}"
}

module "case-management-web" {
  source   = "git@github.com:hmcts/cnp-module-webapp?ref=master"
  product  = "${var.product}-case-management-web"
  location = "${var.location}"
  env      = "${var.env}"
  ilbIp    = "${var.ilbIp}"
  subscription = "${var.subscription}"
  is_frontend = "${local.is_frontend}"
  additional_host_name = "${local.external_host_name}"
  https_only = "${var.https_only}"
  common_tags  = "${var.common_tags}"
  asp_name = "${(var.asp_name == "use_shared") ? local.sharedAppServicePlan : var.asp_name}"
  asp_rg = "${(var.asp_rg == "use_shared") ? local.sharedResourceGroup : var.asp_rg}"

  app_settings = {
    IDAM_LOGIN_URL = "${var.idam_authentication_web_url}/login"
    CCD_GW_LOGOUT_URL = "${local.ccd_gateway_url}/logout"
    CCD_API_URL = "${local.ccd_gateway_url}/aggregated"
    CCD_DATA_URL = "${local.ccd_gateway_url}/data"
    CCD_GW_OAUTH2_URL = "${local.ccd_gateway_url}/oauth2"
    CCD_GW_OAUTH2_CLIENT_ID = "ccd_gateway"
    DM_URL = "${local.ccd_gateway_url}/documents"
    DM_URL_REMOTE = "${local.document_management_url}/documents"
    CCD_PAGE_SIZE = 25
    POSTCODE_LOOKUP_URL = "${local.ccd_gateway_url}/addresses?postcode=$${postcode}"
    PRINT_SERVICE_URL = "${local.ccd_gateway_url}/print"
    PRINT_SERVICE_URL_REMOTE = "${local.ccd_print_service_url}"
    WEBSITE_NODE_DEFAULT_VERSION = "8.9.4"
    CCD_ACTIVITY_URL = "${var.activity_enabled == "true" ? local.ccd_activity_url : ""}"
    CCD_ACTIVITY_NEXT_POLL_REQUEST_MS = 5000
    CCD_ACTIVITY_RETRY = 5
    CCD_ACTIVITY_BATCH_COLLECTION_DELAY_MS = 1
    CCD_ACTIVITY_MAX_REQUEST_PER_BATCH = 25 // Better have this same as CCD_PAGE_SIZE
    PAYMENTS_URL = "${local.ccd_gateway_url}/payments"
  }
}
