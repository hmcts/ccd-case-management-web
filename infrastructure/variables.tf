variable "product" {
  type                  = "string"
  default               = "ccd"
  description           = "The name of your application"
}

variable "location" {
  type                  = "string"
  default               = "UK South"

}

variable "env" {
  type                  = "string"
  description           = "(Required) The environment in which to deploy the application infrastructure."
}

variable "ilbIp" {}

variable "subscription" {}

variable "idam_authentication_web_url" {
  default = "https://idam-test.dev.ccidam.reform.hmcts.net"
}

variable "ccd_gateway_url" {
  default = "https://gateway-ccd.nonprod.platform.hmcts.net"
}

variable "document_management_url" {
  default = "https://api-gateway.test.dm.reform.hmcts.net"
}

variable "ccd_print_service_url" {
  default = "https://return-case-doc-ccd.nonprod.platform.hmcts.net"
}
