variable "product" {
  type                  = "string"
  default               = "ccd"
  description           = "The name of your application"
}

variable "raw_product" {
  default               = "ccd" // jenkins-library overrides product for PRs and adds e.g. pr-118-ccd
}

variable "env" {
  type                  = "string"
  description           = "(Required) The environment in which to deploy the application infrastructure."
}
